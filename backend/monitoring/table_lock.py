import threading
import time

from connect_to_db import connect_to_db

table_lock_running = False


def table_lock_worker(lock_time=300):
    global table_lock_running

    conn = connect_to_db()

    try:
        cursor = conn.cursor()

        print(f"Iniciando bloqueo de tabla logs por {lock_time} segundos")

        cursor.execute("LOCK TABLES logs WRITE")

        print("Tabla logs bloqueada (WRITE lock activo)")

        time.sleep(lock_time)

        cursor.execute("UNLOCK TABLES")

        print("Tabla logs desbloqueada")

    except Exception as e:
        print(f"Error en bloqueo de tabla: {e}")

    finally:
        try:
            cursor.close()
            conn.close()
        except:
            pass

        table_lock_running = False


def start_table_lock_test(lock_time=30):
    global table_lock_running

    if table_lock_running:
        return "Ya hay una prueba de bloqueo en ejecución"

    table_lock_running = True

    thread = threading.Thread(
        target=table_lock_worker,
        args=(lock_time,),
        daemon=True
    )

    thread.start()

    return f"Bloqueo de tabla logs iniciado por {lock_time} segundos"