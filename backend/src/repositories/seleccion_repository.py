from src.database.get_connection import get_connection

class SeleccionRepository:
  @staticmethod
  def get_selecciones():
    conn = get_connection()
    if not conn:
      raise RuntimeError("No se pudo conectar a la base de datos")
    
    try:
      cursor = conn.cursor(dictionary=True)
      cursor.execute("SELECT codigo, nombre FROM pais p JOIN seleccion s ON s.codigo_pais = p.codigo ORDER BY nombre ASC")
      selecciones = cursor.fetchall()
      return selecciones

    finally:
      cursor.close()
      conn.close()