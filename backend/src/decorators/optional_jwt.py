from functools import wraps
from flask import g, request, jsonify

from src.utils.jwt import JwtUtils

def optional_jwt(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):

        g.user_mail = None
        g.user_role = None

        auth_header = request.headers.get("Authorization")

        if auth_header and auth_header.startswith("Bearer "):
            try:
                token = auth_header.split(" ")[1]

                payload = JwtUtils.decode_token(token)

                g.user_mail = payload["mail"]
                g.user_role = payload["role"]

            except Exception as e:
                return jsonify({'error': str(e)}), 401

        return fn(*args, **kwargs)

    return wrapper