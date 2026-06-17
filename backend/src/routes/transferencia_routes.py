from flask import Blueprint, jsonify, request
from src.services.transferencia_service import TransferenciaService
from src.decorators.roles import cliente_required
from src.validators.transferencia_validator import TransferenciaValidator

transferencia_routes = Blueprint('transferencia_routes', __name__)

@transferencia_routes.route('', methods=['POST'])
@cliente_required
def transferir_entrada():
    try:
        data = request.get_json()
        TransferenciaValidator.validate_transferencia_data(data)
        result = TransferenciaService.transferir_entrada(data)
        return jsonify(result), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@transferencia_routes.route('', methods=['GET'])
@cliente_required
def get_transferencias():
    try:
        result = TransferenciaService.get_transferencias_usuario()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@transferencia_routes.route('/<int:transferencia_id>/aceptar', methods=['PATCH'])
@cliente_required
def aceptar_transferencia(transferencia_id):
    try:
        TransferenciaService.aceptar_transferencia(transferencia_id)
        return jsonify({'message': 'Transferencia aceptada exitosamente.', 'success': True}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@transferencia_routes.route('/<int:transferencia_id>/cancelar', methods=['PATCH'])
@cliente_required
def cancelar_transferencia(transferencia_id):
    try:
        TransferenciaService.cancelar_transferencia(transferencia_id)
        return jsonify({'message': 'Transferencia cancelada exitosamente.', 'success': True}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@transferencia_routes.route('/<int:transferencia_id>/rechazar', methods=['PATCH'])
@cliente_required
def rechazar_transferencia(transferencia_id):
    try:
        TransferenciaService.rechazar_transferencia(transferencia_id)
        return jsonify({'message': 'Transferencia rechazada exitosamente.', 'success': True}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500