import time

from connect_to_db import connect_to_db

def massive_inserts(amount):
  conn = connect_to_db()
  if not conn:
    raise RuntimeError("No se pudo conectar a la base de datos")

  contador = 0
  cursor = conn.cursor()

  while contador < amount:
    cursor.execute(
      "INSERT INTO logs (mensaje) VALUES (%s)",
      (f"Mensaje {contador}",)
    )

    conn.commit()

    contador += 1
    print(f"Insert #{contador}")


  cursor.close()
  conn.close()