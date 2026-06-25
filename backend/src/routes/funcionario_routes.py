from flask import Blueprint, jsonify, request
from src.decorators.roles import admin_required
from src.validators.funcionario_validator import FuncionarioValidator
from src.services.funcionario_service import FuncionarioService

funcionario_routes = Blueprint('funcionario_routes', __name__)

@funcionario_routes.route('', methods=['POST'])
@admin_required
def create_funcionario():
    data = request.get_json()
    try:
        FuncionarioValidator.validate_funcionario(data)
        funcionario = FuncionarioService.create_funcionario(data)
        return jsonify({"message": "Funcionario creado exitosamente", "funcionario": funcionario}), 201
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@funcionario_routes.route('', methods=['GET'])
@admin_required
def get_funcionarios():
    funcionarios = FuncionarioService.get_funcionarios()
    return jsonify(funcionarios), 200