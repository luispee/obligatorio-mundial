from flask import Flask, request, jsonify
import mysql.connector
import os
from prometheus_client import Counter, generate_latest
from flask import Response

from monitoring.test_massive_inserts import massive_inserts
from monitoring.test_connections import start_connections, stop_connections
from monitoring.test_rollback import start_rollback_test

REQUEST_COUNT = Counter('app_requests_total', 'Total requests')

app = Flask(__name__)

@app.route('/')
def home():
    REQUEST_COUNT.inc()
    return "Hola desde Flask con MySQL conectado!"

@app.route('/dbcheck')
def dbcheck():
    try:
        conn = mysql.connector.connect(
            host=os.getenv("DATABASE_HOST"),
            user=os.getenv("DATABASE_USER"),
            password=os.getenv("DATABASE_PASSWORD"),
            database=os.getenv("DATABASE_NAME"),
            port=os.getenv("DATABASE_PORT", 3306)
        )
        return "Conexión a MySQL exitosa!"
    except Exception as e:
        return f"Error de conexión: {str(e)}"

@app.route("/metrics")
def metrics():
    return Response(generate_latest(), mimetype="text/plain")

@app.route('/massive_inserts', methods=['POST'])
def massive_inserts_handler():
    data = request.get_json(silent=True) or {}
    amount = data.get("amount")

    if amount is None:
        return jsonify({"error": "'amount' es requerido en el body"}), 400

    try:
        amount = int(amount)
    except (TypeError, ValueError):
        return jsonify({"error": "'amount' debe ser un numero entero"}), 400

    if amount <= 0:
        return jsonify({"error": "'amount' debe ser mayor a 0"}), 400

    massive_inserts(amount)
    return jsonify({"message": "Inserts masivos completados", "amount": amount}), 200

@app.route('/start_connections')
def start_connections_handler():
    message = start_connections()
    return message

@app.route('/stop_connections')
def stop_connections_handler():
    message = stop_connections()
    return message

@app.route('/test_rollback')
def test_rollback_handler():
    message = start_rollback_test()
    return message

@app.route('/test_table_lock')
def test_table_lock_handler():
    from monitoring.table_lock import start_table_lock_test
    message = start_table_lock_test()
    return message