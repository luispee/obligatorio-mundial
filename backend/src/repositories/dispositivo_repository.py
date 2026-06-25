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
