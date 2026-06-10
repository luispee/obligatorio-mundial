from flask import Blueprint, jsonify, request, Response
from prometheus_client import generate_latest

from src.services.monitornig_service import (
    massive_inserts,
    start_connections,
    start_rollback_test,
    start_row_lock_test,
    start_waiting_updates_test,
    stop_connections, 
)

monitoring_routes = Blueprint('monitoring_routes', __name__)


@monitoring_routes.route('/metrics')
def metrics():
    return Response(generate_latest(), mimetype='text/plain')


@monitoring_routes.route('/massive_inserts', methods=['POST'])
def massive_inserts_handler():
    data = request.get_json(silent=True) or {}
    amount = data.get('amount')

    if amount is None:
        return jsonify({'error': "'amount' es requerido en el body"}), 400

    try:
        amount = int(amount)
    except (TypeError, ValueError):
        return jsonify({'error': "'amount' debe ser un numero entero"}), 400

    if amount <= 0:
        return jsonify({'error': "'amount' debe ser mayor a 0"}), 400

    massive_inserts(amount)
    return jsonify({'message': 'Inserts completados', 'amount': amount}), 200


@monitoring_routes.route('/start_connections')
def start_connections_handler():
    message = start_connections()
    return message


@monitoring_routes.route('/stop_connections')
def stop_connections_handler():
    message = stop_connections()
    return message


@monitoring_routes.route('/test_rollback')
def test_rollback_handler():
    message = start_rollback_test()
    return message


@monitoring_routes.route('/test_row_lock')
def test_row_lock_handler():
    message = start_row_lock_test()
    return message


@monitoring_routes.route('/test_waiting_updates')
def test_waiting_updates_handler():
    message = start_waiting_updates_test()
    return message