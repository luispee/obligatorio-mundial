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

@dispositivo_routes.route('/<int:id>', methods=['PUT'])
@admin_required
def update_dispositivo(id):
    data = request.get_json()
    try:
        DispositivoValidator.validate_dispositivo(data)
        dispositivo = DispositivoService.update_dispositivo(id, data)
        return jsonify({"message": "Dispositivo actualizado exitosamente", "dispositivo": dispositivo}), 200
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dispositivo_routes.route('/<int:id>/baja', methods=['PATCH'])
@admin_required
def deactivate_dispositivo(id):
    try:
        DispositivoService.deactivate_dispositivo(id)
        return jsonify({"message": "Dispositivo dado de baja exitosamente"}), 200
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500