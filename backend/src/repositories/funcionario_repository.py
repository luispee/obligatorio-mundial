from src.database.get_connection import get_connection

class FuncionarioRepository:
    @staticmethod
    def get_funcionarios_dispositivos(id_evento, id_sector):
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")

        cursor = conn.cursor(dictionary=True)
        query = """
                       SELECT sefd.mail_funcionario, sefd.id_dispositivo, d.modelo, d.numero_serie, f.numero_legajo
                       
                       FROM sector_evento_funcionario_dispositivo sefd

                       JOIN dispositivo d ON sefd.id_dispositivo = d.id

                       JOIN funcionario f ON sefd.mail_funcionario = f.mail

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
			    "numero_serie": row["numero_serie"],
                "numero_legajo": row["numero_legajo"]
            }
            for row in rows
        ]
    
    @staticmethod
    def get_funcionarios():
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")
        
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT mail, numero_legajo from funcionario")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()

        return rows
    
    @staticmethod
    def get_funcionario_by_mail(mail_funcionario):
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")
        
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT 1 from funcionario WHERE mail = %s", (mail_funcionario,))
        row = cursor.fetchone()
        cursor.close()
        conn.close()

        return row
    
    @staticmethod
    def get_funcionarios():
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT mail, numero_legajo FROM funcionario")
            rows = cursor.fetchall()

            return rows
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def create_funcionario(mail_funcionario, numero_legajo):
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")
        try:
            cursor = conn.cursor()
            query = """
                INSERT INTO funcionario (mail, numero_legajo) 
                VALUES (%s, %s)
            """
            cursor.execute(query, (mail_funcionario, numero_legajo))
            conn.commit()

            
            return mail_funcionario
            
        except Exception as e:
            conn.rollback()
            raise e  
        finally:
            cursor.close()
            conn.close()