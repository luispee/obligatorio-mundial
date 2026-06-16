from flask import Blueprint, jsonify, request
from src.services.estadio_service import EstadioService
from src.decorators.roles import admin_required

estadio_routes = Blueprint("estadios", __name__)

@estadio_routes.route("", methods=["GET"])
@admin_required
def get_estadios():
    estadios = EstadioService.get_estadios()
    return jsonify(estadios), 200

@estadio_routes.route("/<int:id>", methods=["GET"])
@admin_required
def get_estadio(id):
    try:
        estadio = EstadioService.get_estadio(id)
        return jsonify(estadio), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@estadio_routes.route('/<int:id>', methods=['PUT'])
#@admin_required
def update_estadio(id):
    data = request.get_json()

    try:
        estadio = EstadioService.update_estadio(id, data)
        return jsonify(estadio), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500
