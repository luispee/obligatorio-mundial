from flask import Blueprint, request, jsonify
from src.services.venta_service import VentaService
from src.decorators.roles import cliente_required
from src.validators.venta_validator import VentaValidator

venta_routes = Blueprint("venta_routes", __name__)

@venta_routes.route("", methods=["POST"])
@cliente_required
def crear_venta():

    data = request.get_json()

    try:
        VentaValidator.validar_venta(data)
        
        result = VentaService.crear_venta(data)

        return jsonify({
            "message": "Venta creada con exito."
        }), 201
    except ValueError as e:
        return jsonify({
            "error": str(e)
        }), 400
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500
