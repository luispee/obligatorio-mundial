from flask import Blueprint, jsonify, request, Response
from src.services.auth_service import AuthService
from src.decorators.jwt_required import jwt_required
from src.decorators.roles import admin_required

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/login', methods=['POST'])
def login():

  data = request.get_json()

  mail = data.get('mail')
  contrasena = data.get('contrasena')

  if not mail or not contrasena:
    return jsonify({'error': 'Mail y contraseña son requeridos'}), 400
  
  data = AuthService.login(mail, contrasena)

  if data is None:
    return jsonify({'error': 'Credenciales inválidas'}), 401
  
  return jsonify({'message': 'Login exitoso', 'data': data}), 200

@auth_routes.route('/register', methods=['POST'])
def register():
  data = request.get_json()

  try: 
    AuthService.register(data)
    return jsonify({'message': 'Registro exitoso'}), 201

  except ValueError as e:
    return jsonify({'error': str(e)}), 400

  except Exception as e:
    return jsonify({'error': str(e)}), 500

@auth_routes.route('/logout', methods=['POST'])
def logout():
  return jsonify({'message': 'Logout exitoso'}), 200