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
            "message": "Venta creada con exito.", 
            "id_venta": result.get("id_venta"),
            "porcentaje_comision": result.get("porcentaje_comision")
        }), 201
    except ValueError as e:
        return jsonify({
            "error": str(e)
        }), 400
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

@venta_routes.route("<int:id>/pagar", methods=["PATCH"])
@cliente_required
def pagar_venta(id):
    try:
        result = VentaService.pagar_venta(id)
        return jsonify({
            "message": "Compra realizada con exito.", 
        }), 200
    except ValueError as e:
        return jsonify({
            "error": str(e)
        }), 400
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

@venta_routes.route("/<int:id>/cancelar", methods=["PATCH"])
@cliente_required
def cancelar_venta(id):
    try:
        result = VentaService.cancelar_venta(id)
        return jsonify({
            "message": "Venta cancelada con exito."
        }), 200
    except ValueError as e:
        return jsonify({
            "error": str(e)
        }), 400
    # except Exception as e:
    #     return jsonify({
    #         "error": str(e)
    #     }), 500