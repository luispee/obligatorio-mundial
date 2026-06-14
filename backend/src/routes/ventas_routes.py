from flask import Blueprint, request, jsonify
from src.services.venta_service import VentaService

ventas_bp = Blueprint("ventas", __name__)

@ventas_bp.route("", methods=["POST"])
def crear_venta():

    data = request.get_json()

    try:
        result = VentaService.crear_venta(data)

        return jsonify({
            "message": "Venta creada con exito."
        }), 201

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400
