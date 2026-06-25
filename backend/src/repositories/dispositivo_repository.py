from src.database.get_connection import get_connection

class DispositivoRepository:
    @staticmethod
    def get_dispositivos():
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")

        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, modelo, numero_serie FROM dispositivo WHERE operativo=1")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()

        return rows

    @staticmethod
    def get_dispositivo_by_id(id_dispositivo):
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT 1 FROM dispositivo WHERE operativo=1 AND id = %s", (id_dispositivo,))
            row = cursor.fetchone()

            if not row:
                return None
            return row
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def create_dispositivo(data):
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")
        try:
            cursor = conn.cursor(dictionary=True)
            query = """
                INSERT into dispositivo (
                modelo,
                numero_serie,
                operativo
                ) VALUES (%s, %s, 1)
            """
           
            cursor.execute(query,  (
                data['modelo'],
                data['numero_serie']
            ))

            conn.commit()

            id_dispositivo = cursor.lastrowid
            return id_dispositivo
        finally:
            cursor.close()
            conn.close()
