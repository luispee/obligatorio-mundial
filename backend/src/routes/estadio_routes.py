from flask import Blueprint, jsonify
from src.services.estadio_service import EstadioService

estadio_bp = Blueprint("estadios", __name__)

@estadio_bp.route("/api/estadios", methods=["GET"])
def get_estadios():
    estadios = EstadioService.get_estadios()
    return jsonify(estadios), 200

@estadio_bp.route("/api/estadios/<int:id>", methods=["GET"])
def get_estadio(id):
    try:
        estadio = EstadioService.get_estadio(id)
        return jsonify(estadio), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

