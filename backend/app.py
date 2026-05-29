from flask import Flask
import mysql.connector
import os
from prometheus_client import Counter, generate_latest
from flask import Response

from connect_to_db import connect_to_db
from monitoring.massive_inserts import massive_inserts

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

@app.route('/massive_inserts')
def inserts():
    conn = connect_to_db()
    if conn:
        massive_inserts(conn)
        return "Inserciones masivas completadas!"
    else:        return "Error al conectar a la base de datos."

