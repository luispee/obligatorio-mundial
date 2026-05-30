import threading
import time

from connect_to_db import connect_to_db

rollback_test_running = False


def rollback_cycles_worker(
    cycles=20,
    inserts_per_cycle=500,
    delay_between_cycles=0.5
):
    global rollback_test_running

    conn = connect_to_db()

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