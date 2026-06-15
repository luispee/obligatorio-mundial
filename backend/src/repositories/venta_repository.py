from src.database.get_connection import get_connection

class VentaRepository:

    

    @staticmethod
    def crear_venta_transaction(mail_cliente, id_evento, sectores):
        porcentaje_comision = 5

        conn = get_connection()
        cursor = conn.cursor()

        try:
            conn.start_transaction()

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
                    raise Exception(f"Sin capacidad en sector {id_sector}")

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

            for row in entradas:
                id_sector, id_evento, cantidad = row

                cursor.execute("""
                    UPDATE sector_evento
                    SET capacidad_disponible = capacidad_disponible + %s
                    WHERE id_evento = %s AND id_sector = %s
                """, (
                    cantidad,
                    id_evento,
                    id_sector
                ))

            conn.commit()

        except Exception as e:
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()