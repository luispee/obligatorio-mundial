import threading
import time

from src.database.get_connection import get_connection

connections = []
threads = []
running = False
rollback_test_running = False
lock_test_running = False


def connection_worker(i):
    global running

    conn = get_connection()
    connections.append(conn)

    print(f"Conexion {i} abierta")

    while running:
        time.sleep(0.001)

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


def massive_inserts(amount):
    conn = get_connection()

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


def rollback_cycles_worker(
    cycles=20,
    inserts_per_cycle=500,
    delay_between_cycles=0.5
):
    global rollback_test_running

    conn = get_connection()

    try:
        cursor = conn.cursor()

        print(
            f"Iniciando prueba: {cycles} ciclos, "
            f"{inserts_per_cycle} inserts por ciclo"
        )

        for cycle in range(cycles):
            conn.start_transaction()

            for i in range(inserts_per_cycle):
                cursor.execute(
                    "INSERT INTO logs (mensaje) VALUES (%s)",
                    (f"Rollback cycle {cycle} - insert {i}",)
                )

            conn.rollback()

            print(
                f"Ciclo {cycle + 1}/{cycles} completado "
                f"(rollback ejecutado)"
            )

            time.sleep(delay_between_cycles)

        print("Prueba de rollbacks finalizada")

    except Exception as e:
        print(f"Error en prueba de rollback: {e}")

    finally:
        cursor.close()
        conn.close()
        rollback_test_running = False


def start_rollback_test(
    cycles=20,
    inserts_per_cycle=500,
    delay_between_cycles=0.5
):
    global rollback_test_running

    if rollback_test_running:
        return "Ya hay una prueba de rollback en ejecución"

    rollback_test_running = True

    thread = threading.Thread(
        target=rollback_cycles_worker,
        args=(cycles, inserts_per_cycle, delay_between_cycles),
        daemon=True
    )

    thread.start()

    return (
        f"Prueba iniciada: "
        f"{cycles} ciclos x {inserts_per_cycle} inserts"
    )


def row_lock_worker(
    row_id=1,
    hold_seconds=60
):
    global lock_test_running

    conn = get_connection()

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


def waiting_update_worker(thread_id, row_id):
    conn = get_connection()

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