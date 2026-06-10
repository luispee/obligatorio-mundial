from src.database.get_connection import get_connection

class AuthRepository:

    @staticmethod
    def get_form_data():
      conn = get_connection()
      if not conn:
        raise RuntimeError("No se pudo conectar a la base de datos")

      try:
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT codigo, nombre FROM pais ORDER BY nombre ASC")
        paises = cursor.fetchall()
        
        cursor.execute("SELECT id, tipo FROM tipo_documento ORDER BY tipo ASC")
        tipos_documento = cursor.fetchall()
        
        return {
          "paises": paises,
          "tipos_documento": tipos_documento
        }
      finally:
        cursor.close()
        conn.close()
