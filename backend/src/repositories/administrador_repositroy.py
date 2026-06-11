from src.database.get_connection import get_connection
from flask import g

class AdministradorRepository:
  
  @staticmethod
  def get_pais_sede_administrador():
    conn = get_connection()
    if not conn: 
      raise RuntimeError("No se pudo conectar a la base de datos")
    
    try:
      cursor = conn.cursor(dictionary=True)
      cursor.execute("""
        SELECT p.codigo
        FROM pais p
        JOIN pais_sede s ON s.codigo_pais = p.codigo
        JOIN administrador a ON a.codigo_pais_sede = s.codigo_pais
        WHERE a.mail = %s
      """, (g.user_mail,))
      pais = cursor.fetchone()
      
      return pais['codigo'] if pais else None
    
    finally:
      cursor.close()
      conn.close()

    
    