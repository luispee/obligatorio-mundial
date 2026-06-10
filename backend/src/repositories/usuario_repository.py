from src.database.get_connection import get_connection
from src.models.usuario import Usuario
from datetime import datetime

class UsuarioRepository:

  @staticmethod
  def find_by_mail(mail):
    conn = get_connection()
    if not conn:
      raise RuntimeError("No se pudo conectar a la base de datos")

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario WHERE mail = %s", (mail,))
    row = cursor.fetchone()
    cursor.close()
    conn.close()

    if row is None:
      return None
    
    row: dict = row
    
    return Usuario(
      mail=row['mail'],
      hash_contrasena=row['hash_contrasena'],
      codigo_pais_documento=row['codigo_pais_documento'],
      id_tipo_documento=row['id_tipo_documento'],
      numero_documento=row['numero_documento'],
      codigo_pais_residencia=row['codigo_pais_residencia'],
      localidad=row['localidad'],
      calle=row['calle'],
      numero_puerta=row['numero_puerta'],
      codigo_postal=row['codigo_postal']
    )
  
  @staticmethod
  def get_role(mail):
    conn = get_connection()
    if not conn:
      raise RuntimeError("No se pudo conectar a la base de datos")

    cursor = conn.cursor()

    cursor.execute("SELECT 1 FROM cliente WHERE mail = %s", (mail,))
    if cursor.fetchone():
      cursor.close()
      conn.close()
      return 'CLIENTE'
    
    cursor.execute("SELECT 1 FROM administrador WHERE mail = %s", (mail,))

    if cursor.fetchone():
      cursor.close()
      conn.close()
      return 'ADMINISTRADOR'
    
    cursor.execute("SELECT 1 FROM funcionario WHERE mail = %s", (mail,))

    if cursor.fetchone():
      cursor.close()
      conn.close()
      return 'FUNCIONARIO'
    
    cursor.close()
    conn.close()
    return None

  @staticmethod
  def create_usuario(data, hash_contrasena):
    conn = get_connection()
    if not conn:
      raise RuntimeError("No se pudo conectar a la base de datos")

    try:
      cursor = conn.cursor()

      conn.start_transaction()
      
      #usuario

      cursor.execute("""
        INSERT INTO usuario (mail, hash_contrasena, codigo_pais_documento, id_tipo_documento, numero_documento,
          codigo_pais_residencia, localidad, calle, numero_puerta, codigo_postal)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
      """, (
        data['mail'], hash_contrasena, data['codigo_pais_documento'], data['id_tipo_documento'], data['numero_documento'],
        data['codigo_pais_residencia'], data['localidad'], data['calle'], data['numero_puerta'], data.get('codigo_postal')
      ))

      # cliente

      cursor.execute("INSERT INTO cliente (mail, fecha_registro, verificado) VALUES (%s, %s, %s)", (data['mail'], datetime.now(), False))

      #telefonos

      for telefono in data['telefonos']:
        cursor.execute("INSERT INTO telefono_usuario (mail, telefono) VALUES (%s, %s)", (data['mail'], telefono))
      
      conn.commit()
    
    except Exception as e:
      conn.rollback()
      raise e

    finally:
      cursor.close()
      conn.close()