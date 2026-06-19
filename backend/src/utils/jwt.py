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
      "exp": datetime.utcnow() + timedelta(hours=8)
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

  @staticmethod
  def generate_entrada_token(entrada_id, sector_id, evento_id):

    payload = {
      "id_entrada": entrada_id,
      "id_sector": sector_id,
      "id_evento": evento_id,
      "iat": datetime.utcnow(),
      "nbf": datetime.utcnow(),
      "exp": datetime.utcnow() + timedelta(seconds=35)
    }

    return jwt.encode(
      payload,
      SECRET_KEY,
      algorithm="HS256"
    )