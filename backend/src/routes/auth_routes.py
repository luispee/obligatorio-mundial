from flask import Blueprint, jsonify, request, Response, g
from src.services.auth_service import AuthService
from src.decorators.jwt_required import jwt_required
from src.decorators.roles import admin_required
from src.validators.auth_validator import AuthValidator

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/login', methods=['POST'])
def login():

  data = request.get_json()

  try:
    AuthValidator.validate_login(data)
  except ValueError as e:
    return jsonify({'error': str(e)}), 400

  data = AuthService.login(data)

  if data is None:
    return jsonify({'error': 'Credenciales inválidas'}), 401

  return jsonify({'message': 'Login exitoso', 'token': data.get('token'), 'usuario': { 'mail': data.get('mail'), 'role': data.get('role') }}), 200

@auth_routes.route('/register', methods=['POST'])
def register():
  data = request.get_json()

  try:
    AuthValidator.validate_register(data)
    AuthService.register(data)
    return jsonify({'message': 'Registro exitoso'}), 201

  except ValueError as e:
    return jsonify({'error': str(e)}), 400

  except Exception as e:
    return jsonify({'error': str(e)}), 500

@auth_routes.route('/verify', methods=['POST'])
def verify():

    data = request.get_json()

    try:
        AuthValidator.validate_verify(data)

        AuthService.verify(data)

        return jsonify({
            'message': 'Usuario verificado con éxito'
        }), 200

    except ValueError as e:
        return jsonify({'error': str(e)}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_routes.route('/register/form-data', methods=['GET'])
def register_form():
  try:

    data = AuthService.get_register_form_data()

    return jsonify(data), 200

  except Exception as e:
    return jsonify({"error": str(e)}), 500

@auth_routes.route('/me', methods=['GET'])
@jwt_required
def me():
  try:
    mail = g.user_mail
    usuario = AuthService.get_user_data(mail)
    if usuario is None:
      return jsonify({'error': 'Usuario no encontrado'}), 404
    return jsonify(usuario), 200
  except Exception as e:
    return jsonify({'error': str(e)}), 500

@auth_routes.route('/me', methods=['PATCH'])
@jwt_required
def update_me():
  try:
    mail = g.user_mail
    data = request.get_json()
    AuthValidator.validate_update_user(data)
    AuthService.update_user(mail, data)
    return jsonify({'message': 'Usuario actualizado exitosamente'}), 200
  except ValueError as e:
    return jsonify({'error': str(e)}), 400
  except Exception as e:
    return jsonify({'error': str(e)}), 500