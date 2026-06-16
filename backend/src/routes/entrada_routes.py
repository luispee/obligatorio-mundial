from flask import Blueprint, jsonify, request
from src.services.entrada_service import EntradaService
from src.decorators.roles import cliente_required
from src.validators.transferencia_validator import TransferenciaValidator

entrada_routes = Blueprint('entrada_routes', __name__)

@entrada_routes.route('', methods=['GET'])
@cliente_required
def get_entradas():
    try:
        entradas = EntradaService.get_entradas()
        return jsonify(entradas), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500