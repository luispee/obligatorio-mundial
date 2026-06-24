from src.database.get_connection import get_connection

class FuncionarioRepository:
    @staticmethod
    def get_funcionarios_dispositivos(id_evento, id_sector):
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")

        cursor = conn.cursor(dictionary=True)
        query = """
                       SELECT sefd.mail_funcionario, sefd.id_dispositivo, d.modelo, d.numero_serie 
                       
                       FROM sector_evento_funcionario_dispositivo sefd

                       JOIN dispositivo d ON sefd.id_dispositivo = d.id

                       WHERE d.operativo = 1
                        AND sefd.id_evento = %s 
                        AND sefd.id_sector = %s
                       """
        
        cursor.execute(query, (id_evento, id_sector))
        rows = cursor.fetchall()
        cursor.close()
        conn.close()

        return [
            {
                "mail_funcionario": row["mail_funcionario"],
			    "id_dispositivo": row["id_dispositivo"],
			    "modelo_dispositivo": row["modelo"],
			    "numero_serie": row["numero_serie"]
            }
            for row in rows
        ]
    
    @staticmethod
    def get_funcionarios():
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")
        
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT mail from funcionario")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()

        return rows