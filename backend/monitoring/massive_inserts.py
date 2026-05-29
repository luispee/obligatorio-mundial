import time

def massive_inserts(conn):
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

    time.sleep(0.01)

  cursor.close()