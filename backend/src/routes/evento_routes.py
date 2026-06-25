from flask import Blueprint, jsonify, request
from src.services.evento_service import EventoService
from src.services.sefd_service import SefdService
from src.decorators.roles import admin_required
from src.validators.evento_validator import EventoValidator
from src.validators.sefd_validator import SefdValidator
from src.decorators.optional_jwt import optional_jwt

evento_routes = Blueprint('evento_routes', __name__)

@evento_routes.route('/', methods=['GET'])
@optional_jwt
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
    EventoValidator.validate_evento(data)
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
    EventoValidator.validate_evento(data)
    evento = EventoService.update_evento(id, data)
    return jsonify({"message": "Evento actualizado exitosamente", "evento": evento}), 200
  except ValueError as e:
    return jsonify({"error": str(e)}), 400
  except Exception as e:
    return jsonify({"error": str(e)}), 500

@evento_routes.route('/<int:id>', methods=['GET'])
def get_evento(id):
  try:
    evento = EventoService.get_evento(id)
    if evento is None:
      return jsonify({"error": "Evento no encontrado"}), 404
    return jsonify(evento), 200
  except ValueError as e:
    return jsonify({"error": str(e)}), 400
  except Exception as e:
    return jsonify({"error": str(e)}), 500

@evento_routes.route('/<int:id>/baja', methods=['PATCH'])
@admin_required
def baja_evento(id):
    try:
        resultado = EventoService.baja_evento(id)
        return jsonify(resultado), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@evento_routes.route('/<int:id_evento>/sectores/<int:id_sector>/funcionarios', methods=['GET'])
@admin_required
def funcionarios_dispositivos_sector(id_evento, id_sector):
  try:
    resultado = EventoService.get_funcionarios_dispositivos_evento(id_evento, id_sector)
    return jsonify(resultado), 200
  
  except ValueError as e:
    return jsonify({"error": str(e)}), 404

  except Exception as e:
    return jsonify({"error": str(e)}), 500
  
@evento_routes.route('/<int:id_evento>/sectores/<int:id_sector>/funcionarios', methods=['POST'])
@admin_required
def asignar_funcionario_dispositivo(id_evento, id_sector):

  try:
    data = request.get_json()
    SefdValidator.validate_data(data)

    SefdService.register_assignation_sefd(data, id_evento, id_sector)

    return jsonify({"message": "Asignación creada exitosamente"}), 201

  except ValueError as e:
    return jsonify({'error': str(e)}), 400
  except Exception as e:
    return jsonify({"error": str(e)}), 500
