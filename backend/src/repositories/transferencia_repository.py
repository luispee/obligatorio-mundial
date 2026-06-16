from src.database.get_connection import get_connection

class TransferenciaRepository:
    @staticmethod
    def create_transferencia(id_entrada, mail_destinatario, mail_remitente):
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")
        
        try:
            cursor = conn.cursor()

            cursor.execute("SELECT id FROM entrada WHERE id = %s AND mail_cliente_propietario = %s", (id_entrada, mail_remitente))
            if not cursor.fetchone():
                raise ValueError("La entrada no existe o no le pertenece al cliente")

            cursor.execute("""
                SELECT 1
                FROM transferencia
                WHERE id_entrada = %s AND id_estado_transferencia IN (1, 2)
            """, (id_entrada,))
            if cursor.fetchone():
                raise ValueError("La entrada ya está en proceso de transferencia")

            cursor.execute("""
                INSERT INTO transferencia (id_entrada, mail_cliente_destinatario, mail_cliente_remitente, fecha_hora, id_estado_transferencia)
                VALUES (%s, %s, %s, NOW(), 1)
            """, (id_entrada, mail_destinatario, mail_remitente))

            conn.commit()

        finally:
            cursor.close()
            conn.close()