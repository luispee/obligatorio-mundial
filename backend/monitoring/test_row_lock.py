import threading
import time

from connect_to_db import connect_to_db

lock_test_running = False


def row_lock_worker(
    row_id=1,
    hold_seconds=60
):
    global lock_test_running

    conn = connect_to_db()

    try:
        cursor = conn.cursor()

        conn.start_transaction()

        cursor.execute(
            """
            SELECT *
            FROM logs
            WHERE id = %s
            FOR UPDATE
            """,
            (row_id,)
        )

        print(
            f"Fila {row_id} bloqueada "
            f"durante {hold_seconds} segundos"
        )

        time.sleep(hold_seconds)

        conn.rollback()

        print(f"Lock liberado para fila {row_id}")

    except Exception as e:
        print(f"Error bloqueando fila: {e}")

    finally:
        cursor.close()
        conn.close()

        lock_test_running = False


def start_row_lock_test(
    row_id=1,
    hold_seconds=120
):
    global lock_test_running

    if lock_test_running:
        return "Ya existe un bloqueo activo"

    lock_test_running = True

    thread = threading.Thread(
        target=row_lock_worker,
        args=(row_id, hold_seconds),
        daemon=True
    )

    thread.start()

    return (
        f"Bloqueo iniciado sobre registro con id={row_id} "
        f"por {hold_seconds} segundos"
    )


import threading

from connect_to_db import connect_to_db

update_test_running = False


def waiting_update_worker(thread_id, row_id):

    conn = connect_to_db()

    try:

        cursor = conn.cursor()

        print(
            f"Thread {thread_id} intentando actualizar "
            f"fila {row_id}"
        )

        cursor.execute(
            """
            UPDATE logs
            SET mensaje = CONCAT(mensaje, %s)
            WHERE id = %s
            """,
            (f" [{thread_id}]", row_id)
        )

        conn.commit()

        print(
            f"Thread {thread_id} completó el update"
        )

    except Exception as e:

        print(
            f"Thread {thread_id} error: {e}"
        )

    finally:

        cursor.close()
        conn.close()


def start_waiting_updates_test(
    row_id=1,
    thread_count=20
):

    threads = []

    for i in range(thread_count):

        t = threading.Thread(
            target=waiting_update_worker,
            args=(i, row_id),
            daemon=True
        )

        t.start()
        threads.append(t)

    return (
        f"{thread_count} updates iniciados "
        f"sobre el registro {row_id}"
    )