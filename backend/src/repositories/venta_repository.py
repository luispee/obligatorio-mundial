from src.database.get_connection import get_connection

class VentaRepository:

    @staticmethod
    def crear_venta_transaction(id_evento, sectores, data):

        conn = get_connection()
        cursor = conn.cursor()

        try:
            conn.start_transaction()

            # lock de stock
            total = 0

            for sector_id, cantidad in sectores.items():

                cursor.execute("""
                    SELECT capacidad_disponible, precio
                    FROM sector_evento
                    WHERE id_evento = %s AND id_sector = %s
                    FOR UPDATE
                """, (id_evento, sector_id))

                row = cursor.fetchone()

                if not row:
                    raise Exception("Sector no existe")

                capacidad, precio = row

                if capacidad < cantidad:
                    raise Exception(f"Sin capacidad en sector {sector_id}")

                total += precio * cantidad

            # crear venta
            cursor.execute("""
                INSERT INTO venta
                (fecha_hora, id_estado_venta, monto_total, porcentaje_comision, mail_cliente)
                VALUES (NOW(), %s, %s, %s, %s)
            """, (
                1,
                total,
                0,
                data.get("mail_cliente", "test")
            ))

            venta_id = cursor.lastrowid

            # crear entradas + update capacidad
            for sector_id, cantidad in sectores.items():

                for _ in range(cantidad):

                    cursor.execute("""
                        INSERT INTO entrada
                        (cantidad_transferencias, usada, mail_cliente_propietario, id_venta, id_sector, id_evento)
                        VALUES (0, 0, %s, %s, %s, %s)
                    """, (
                        data.get("mail_cliente", "test"),
                        venta_id,
                        sector_id,
                        id_evento
                    ))

                cursor.execute("""
                    UPDATE sector_evento
                    SET capacidad_disponible = capacidad_disponible - %s
                    WHERE id_evento = %s AND id_sector = %s
                """, (
                    cantidad,
                    id_evento,
                    sector_id
                ))

            conn.commit()

            return {"id": venta_id}

        except Exception as e:
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()
