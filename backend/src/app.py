from flask import Flask
from flask_cors import CORS
import mysql.connector
import os
from prometheus_client import Counter

from src.routes.auth_routes import auth_routes
from src.routes.monitoring_routes import monitoring_routes
from src.routes.evento_routes import evento_routes
from src.routes.venta_routes import venta_routes
from src.routes.estadio_routes import estadio_routes
from src.routes.entrada_routes import entrada_routes
from src.routes.transferencia_routes import transferencia_routes
from src.routes.estadisticas_routes import estadisticas_routes

REQUEST_COUNT = Counter('app_requests_total', 'Total requests')

app = Flask(__name__)
CORS(app)

app.register_blueprint(monitoring_routes, url_prefix="/api/metrics")
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(evento_routes, url_prefix="/api/eventos")
app.register_blueprint(venta_routes, url_prefix="/api/ventas")
app.register_blueprint(estadio_routes, url_prefix="/api/estadios")
app.register_blueprint(entrada_routes, url_prefix="/api/entradas")
app.register_blueprint(transferencia_routes, url_prefix="/api/transferencias")
app.register_blueprint(estadisticas_routes, url_prefix="/api/estadisticas")

@app.route('/api/')
def home():
    REQUEST_COUNT.inc()
    return "Hola desde Flask con MySQL conectado!"

@app.route('/api/dbcheck')
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
