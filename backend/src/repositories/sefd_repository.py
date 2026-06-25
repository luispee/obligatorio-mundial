from src.database.get_connection import get_connection

class SefdRepository:
    @staticmethod
    def exists_assignation(id_evento, id_sector, id_funcionario, id_dispositivo):
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")
        
        try:
            cursor = conn.cursor()
            query = """
                SELECT 1
                FROM sector_evento_funcionario_dispositivo
                WHERE id_evento = %s
                  AND id_sector = %s
                  AND mail_funcionario = %s
                  AND id_dispositivo = %s
                LIMIT 1
            """
            cursor.execute(query, (id_evento, id_sector, id_funcionario, id_dispositivo))
            row = cursor.fetchone()

            return row is not None
        
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def register_assignation_sefd(id_evento, id_sector, mail_funcionario, id_dispositivo):
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")
            
        try:
            cursor = conn.cursor()
            query = """
                INSERT INTO sector_evento_funcionario_dispositivo 
                (mail_funcionario, id_dispositivo, id_sector, id_evento) 
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, (mail_funcionario, id_dispositivo, id_sector, id_evento))
            
            conn.commit()

            return {"status": "success", "message": "Asignación registrada correctamente"}
            
            
        except Exception as e:
            conn.rollback()
            raise e
            
        finally:
            cursor.close()
            conn.close()