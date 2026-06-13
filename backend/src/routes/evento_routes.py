from flask import Blueprint, jsonify, request
from src.services.evento_service import EventoService
from src.decorators.roles import admin_required
from src.validators.evento_validator import EventoValidator

evento_routes = Blueprint('evento_routes', __name__)

@evento_routes.route('/', methods=['GET'])
def get_eventos():
  return jsonify(EventoService.get_eventos()), 200

@evento_routes.route('/form-data', methods=['GET'])
@admin_required
def get_eventos_form_data():
  return jsonify(EventoService.get_eventos_form_data()), 200

@evento_routes.route('', methods=['POST'])
@admin_required
def create_evento():
  data = request.get_json()
  try:
    EventoValidator.validate_create_evento(data)
    evento = EventoService.create_evento(data)
    return jsonify({"message": "Evento creado exitosamente", "evento": evento}), 201
  except ValueError as e:
    return jsonify({"error": str(e)}), 400
  except Exception as e:
    return jsonify({"error": str(e)}), 500

@evento_routes.route('/<int:id>', methods=['PUT'])
@admin_required
def update_evento(id):
  data = request.get_json()
  try:
    EventoValidator.validate_create_evento(data)
    evento = EventoService.update_evento(id, data)
    return jsonify({"message": "Evento actualizado exitosamente", "evento": evento}), 200
  except ValueError as e:
    return jsonify({"error": str(e)}), 400
  except Exception as e:
    return jsonify({"error": str(e)}), 500