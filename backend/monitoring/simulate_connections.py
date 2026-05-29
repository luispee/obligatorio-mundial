import os

import mysql.connector
import threading
import time

def create_connections(i):
  conn = mysql.connector.connect(
    host=os.getenv("DATABASE_HOST"),
    user=os.getenv("DATABASE_USER"),
    password=os.getenv("DATABASE_PASSWORD"),
    database=os.getenv("DATABASE_NAME"),
    port=os.getenv("DATABASE_PORT", 3306)
  )

  print(f"Conexion {i} abierta")

  time.sleep(60)

  conn.close()

  threads = []

  for i in range(50):
      t = threading.Thread(target=create_connections, args=(i,))
      t.start()
      threads.append(t)

  for t in threads:
      t.join()