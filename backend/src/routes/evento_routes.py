from flask import Blueprint, jsonify, request
from src.services.evento_service import EventoService
from src.decorators.roles import admin_required

evento_routes = Blueprint('evento_routes', __name__)

@evento_routes.route('/', methods=['GET'])
def get_eventos():
  return "To be done"

@evento_routes.route('/form-data', methods=['GET'])
@admin_required
def get_eventos_form_data():
  return jsonify(EventoService.get_eventos_form_data()), 200
