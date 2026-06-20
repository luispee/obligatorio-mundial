from flask import Blueprint, jsonify, request
from src.services.entrada_service import EntradaService
from src.decorators.roles import cliente_required
from src.validators.transferencia_validator import TransferenciaValidator
from src.decorators.roles import funcionario_required

entrada_routes = Blueprint('entrada_routes', __name__)

@entrada_routes.route('', methods=['GET'])
@cliente_required
def get_entradas():
    try:
        entradas = EntradaService.get_entradas()
        return jsonify(entradas), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@entrada_routes.route('<int:entrada_id>', methods=['GET'])
@cliente_required
def get_entrada(entrada_id):
    try:
        entrada = EntradaService.get_entrada(entrada_id)
        if entrada is None:
            return jsonify({'error': 'Entrada no encontrada'}), 404
        return jsonify(entrada), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@entrada_routes.route('/validar', methods=['POST'])
@funcionario_required
def validar_entrada():
    try:
        data = request.get_json()
        entrada = EntradaService.validar_entrada(data)
        return jsonify(entrada), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500