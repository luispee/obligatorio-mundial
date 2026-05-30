import threading
import time

from connect_to_db import connect_to_db

connections = []
threads = []
running = False


def connection_worker(i):

    global running

    conn = connect_to_db()

    connections.append(conn)

    print(f"Conexion {i} abierta")

    while running:
        time.sleep(0.01)

    conn.close()

    print(f"Conexion {i} cerrada")


def start_connections(amount=50, interval=1):

    global running
    global threads

    if running:
        return "Las conexiones ya estan activas"

    running = True

    threads = []

    for i in range(amount):

        t = threading.Thread(
            target=connection_worker,
            args=(i,)
        )

        t.start()

        threads.append(t)

        time.sleep(interval)

    return f"{amount} conexiones abiertas"


def stop_connections():

    global running

    if not running:
        return "No hay conexiones activas"

    running = False

    for t in threads:
        t.join()

    connections.clear()

    return "Todas las conexiones fueron cerradas"