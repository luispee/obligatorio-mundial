from src.database.get_connection import get_connection

TIEMPO_LIMITE_PENDIENTE_MINUTOS = 5

class VentaRepository:
    @staticmethod
    def crear_venta_transaction(mail_cliente, id_evento, sectores):
        porcentaje_comision = 5

        conn = get_connection()
        cursor = conn.cursor()

        try:
            conn.start_transaction()

            VentaRepository.liberar_ventas_vencidas()

            # lock de stock
            total = 0

            for id_sector, cantidad in sectores.items():

                cursor.execute("""
                    SELECT capacidad_disponible, precio
                    FROM sector_evento
                    WHERE id_evento = %s AND id_sector = %s
                    FOR UPDATE
                """, (id_evento, id_sector))

                row = cursor.fetchone()

                if not row:
                    raise Exception("Sector no existe para ese evento")

                capacidad, precio = row

                if capacidad < cantidad:
                    raise Exception(f"No hay entradas disponibles para uno de los sectores seleccionados")

                total += precio * cantidad

            # crear venta
            cursor.execute("""
                INSERT INTO venta
                (fecha_hora, id_estado_venta, monto_total, porcentaje_comision, mail_cliente)
                VALUES (NOW(), %s, %s, %s, %s)
            """, (
                1,
                total,
                porcentaje_comision,
                mail_cliente
            ))

            id_venta = cursor.lastrowid

            for id_sector, cantidad in sectores.items():

                for _ in range(cantidad):

                    cursor.execute("""
                        INSERT INTO entrada
                        (cantidad_transferencias, usada, mail_cliente_propietario, id_venta, id_sector, id_evento)
                        VALUES (0, 0, %s, %s, %s, %s)
                    """, (
                        mail_cliente,
                        id_venta,
                        id_sector,
                        id_evento
                    ))

                cursor.execute("""
                    UPDATE sector_evento
                    SET capacidad_disponible = capacidad_disponible - %s
                    WHERE id_evento = %s AND id_sector = %s
                """, (
                    cantidad,
                    id_evento,
                    id_sector
                ))

            conn.commit()

            return {"id_venta": id_venta, "porcentaje_comision": porcentaje_comision}

        except Exception as e:
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def pagar_venta_transaction(id_venta, mail_cliente):
        
        conn = get_connection()
        cursor = conn.cursor()

        try:
            conn.start_transaction()

            cursor.execute("""
                SELECT id_estado_venta
                FROM venta
                WHERE id = %s AND mail_cliente = %s
                FOR UPDATE
            """, (id_venta, mail_cliente))

            row = cursor.fetchone()

            if not row:
                raise ValueError("Venta no existe")

            estado_venta = row[0]

            if estado_venta != 1:
                raise ValueError("Venta no en estado pendiente de pago")

            cursor.execute("""
                UPDATE venta
                SET id_estado_venta = %s
                WHERE id = %s AND mail_cliente = %s
            """, (
                2,
                id_venta,
                mail_cliente
            ))

            conn.commit()

        except Exception as e:
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def _liberar_entradas_de_venta(cursor, id_venta):
        cursor.execute("""
            SELECT id_sector, id_evento, COUNT(*)
            FROM entrada
            WHERE id_venta = %s
            GROUP BY id_sector, id_evento
        """, (id_venta,))

        entradas = cursor.fetchall()

        cursor.execute("""
            DELETE FROM entrada
            WHERE id_venta = %s
        """, (id_venta,))

        for id_sector, id_evento, cantidad in entradas:
            cursor.execute("""
                UPDATE sector_evento
                SET capacidad_disponible = capacidad_disponible + %s
                WHERE id_evento = %s AND id_sector = %s
            """, (
                cantidad,
                id_evento,
                id_sector
            ))
            

    @staticmethod
    def cancelar_venta_transaction(id_venta, mail_cliente):
        
        conn = get_connection()
        cursor = conn.cursor()

        try:
            conn.start_transaction()

            cursor.execute("""
                SELECT id_estado_venta
                FROM venta
                WHERE id = %s AND mail_cliente = %s
                FOR UPDATE
            """, (id_venta, mail_cliente))

            row = cursor.fetchone()

            if not row:
                raise ValueError("Venta no existe")

            estado_venta = row[0]

            if estado_venta != 1:
                raise ValueError("Venta no en estado pendiente de pago")

            cursor.execute("""
                UPDATE venta
                SET id_estado_venta = %s
                WHERE id = %s AND mail_cliente = %s
            """, (
                3,
                id_venta,
                mail_cliente
            ))

            VentaRepository._liberar_entradas_de_venta(cursor, id_venta)

            conn.commit()

        except Exception as e:
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_ventas_by_usuario(mail_cliente):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                ve.id,
                ve.fecha_hora AS fecha_hora_venta,
                ve.monto_total,
                ve.porcentaje_comision,

                ev.fecha_hora AS fecha_hora_evento,
                ev.codigo_seleccion_local,
                ev.codigo_seleccion_visitante,

                pl.nombre AS nombre_seleccion_local,
                pv.nombre AS nombre_seleccion_visitante,

                es.ciudad,
                es.nombre AS nombre_estadio,

                s.nombre AS nombre_sector,

                ps.nombre AS pais_sede
            FROM venta ve
            JOIN entrada en ON en.id_venta = ve.id
            JOIN sector s ON en.id_sector = s.id
            JOIN evento ev ON en.id_evento = ev.id
            JOIN estadio es ON ev.id_estadio = es.id
            JOIN pais pl ON ev.codigo_seleccion_local = pl.codigo
            JOIN pais pv ON ev.codigo_seleccion_visitante = pv.codigo
            JOIN pais ps ON es.codigo_pais_sede = ps.codigo
            WHERE mail_cliente = %s AND 
            ve.id_estado_venta = 2
            ORDER BY fecha_hora_venta DESC
        """, (mail_cliente,))

        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        ventas_por_id = {}

        for r in rows:
            venta_id = r["id"]

            if venta_id not in ventas_por_id:
                ventas_por_id[venta_id] = {
                    "id": venta_id,
                    "fecha_hora": r["fecha_hora_venta"].isoformat() if r["fecha_hora_venta"] else None,
                    "monto_total": float(r["monto_total"]),
                    "porcentaje_comision": float(r["porcentaje_comision"]),
                    "evento": {
                        "seleccion_local": {
                            "codigo": r["codigo_seleccion_local"],
                            "nombre": r["nombre_seleccion_local"],
                        },
                        "seleccion_visitante": {
                            "codigo": r["codigo_seleccion_visitante"],
                            "nombre": r["nombre_seleccion_visitante"],
                        },
                        "estadio": {
                            "nombre": r["nombre_estadio"],
                            "ciudad": r["ciudad"],
                            "pais_sede": r["pais_sede"],
                        },
                        "fecha_hora": r["fecha_hora_evento"].isoformat() if r["fecha_hora_evento"] else None,
                    },
                    "sectores": [],
                }

            ventas_por_id[venta_id]["sectores"].append(r["nombre_sector"])

        return list(ventas_por_id.values())

    @staticmethod
    def liberar_ventas_vencidas():
        conn = get_connection()
        
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")

        cursor = None

        try:
            cursor = conn.cursor()
            conn.start_transaction()

            cursor.execute("""
                SELECT id FROM venta
                WHERE id_estado_venta = 1
                AND fecha_hora < (NOW() - INTERVAL %s MINUTE)
                FOR UPDATE
            """, (TIEMPO_LIMITE_PENDIENTE_MINUTOS,))

            ventas_vencidas = cursor.fetchall()

            for (id_venta,) in ventas_vencidas:
                cursor.execute("""
                    UPDATE venta
                    SET id_estado_venta = 3
                    WHERE id = %s
                """, (id_venta,))

                VentaRepository._liberar_entradas_de_venta(cursor, id_venta)

            conn.commit()

        except Exception as e:
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()