from flask import Blueprint, jsonify
from src.services.estadisticas_service import EstadisticasService
from src.decorators.roles import admin_required

estadisticas_routes = Blueprint('estadisticas_routes', __name__)

@estadisticas_routes.route('', methods=['GET'])
@admin_required
def get_estadisticas():
  try:
    estadisticas = EstadisticasService.get_estadisticas()
    return jsonify(estadisticas), 200
  except Exception as e:
    return jsonify({'error': str(e)}), 500