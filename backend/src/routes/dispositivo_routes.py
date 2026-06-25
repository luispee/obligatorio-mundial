from flask import Blueprint, jsonify, request
from src.decorators.roles import admin_required
from src.validators.dispositivo_validator import DispositivoValidator
from src.services.dispositivo_service import DispositivoService

dispositivo_routes = Blueprint('dispositivo_routes', __name__)

@dispositivo_routes.route('', methods=['POST'])
@admin_required
def create_dispositivo():
    data = request.get_json()
    try:
        DispositivoValidator.validate_dispositivo(data)
        dispositivo = DispositivoService.create_dispositivo(data)
        return jsonify({"message": "Dispositivo creado exitosamente", "dispositivo": dispositivo}), 201
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@dispositivo_routes.route('', methods=['GET'])
@admin_required
def get_dispositivos():
    dispositivos = DispositivoService.get_dispositivos()
    return jsonify(dispositivos), 200