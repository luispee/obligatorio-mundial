from functools import wraps

from flask import request, jsonify, g

from src.utils.jwt import JwtUtils

def jwt_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
      auth_header = request.headers.get('Authorization')

      if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'error': 'Token de autenticación requerido'}), 401

      try:
        token = auth_header.split(' ')[1]
        payload = JwtUtils.decode_token(token)

        g.user_mail = payload['mail']
        g.user_role = payload['role']

      except Exception as e:
        return jsonify({'error': str(e)}), 401

      return func(*args, **kwargs)

    return wrapper