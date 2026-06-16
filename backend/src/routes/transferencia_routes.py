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