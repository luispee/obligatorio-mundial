import time

from connect_to_db import connect_to_db

def massive_inserts():
  conn = connect_to_db()
  contador = 0
  cursor = conn.cursor()

  while contador < 1000: 
    cursor.execute(
      "INSERT INTO logs (mensaje) VALUES (%s)",
      (f"Mensaje {contador}",)
    )

    conn.commit()

    contador += 1
    print(f"Insert #{contador}")


  cursor.close()