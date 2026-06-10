import mysql.connector
import os

def connect_to_db():
  try:
    conn = mysql.connector.connect(
      host=os.getenv("DATABASE_HOST"),
      user=os.getenv("DATABASE_USER"),
      password=os.getenv("DATABASE_PASSWORD"),
      database=os.getenv("DATABASE_NAME"),
      port=os.getenv("DATABASE_PORT", 3306)
    )
    return conn
  except Exception as e:
    print(f"Error de conexión: {str(e)}")
    return None