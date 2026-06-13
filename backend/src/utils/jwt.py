import jwt
import os

from datetime import datetime
from datetime import timedelta

SECRET_KEY = os.getenv("JWT_SECRET_KEY")

class JwtUtils:

  @staticmethod
  def generate_token(mail, role):

    payload = {
      "mail": mail,
      "role": role,
      "exp": datetime.utcnow() + timedelta(hours=0.00277778) # Token válido por 10 segundos
    }

    return jwt.encode(
      payload,
      SECRET_KEY,
      algorithm="HS256"
    )

  @staticmethod
  def decode_token(token):
    return jwt.decode(
      token,
      SECRET_KEY,
      algorithms=["HS256"]
    )