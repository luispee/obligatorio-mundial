from functools import wraps

from flask import jsonify, g

from src.decorators.jwt_required import jwt_required

def admin_required(func):
  
  @jwt_required
  @wraps(func)
  def wrapper(*args, **kwargs):
    if g.user_role != "ADMINISTRADOR":
      return jsonify({'error': 'Acceso denegado: se requieren privilegios de administrador'}), 403

    return func(*args, **kwargs)

  return wrapper

def funcionario_required(func):
  
  @jwt_required
  @wraps(func)
  def wrapper(*args, **kwargs):
    if g.user_role != "FUNCIONARIO":
      return jsonify({'error': 'Acceso denegado: se requieren privilegios de funcionario'}), 403

    return func(*args, **kwargs)

  return wrapper

def cliente_required(func):
  
  @jwt_required
  @wraps(func)
  def wrapper(*args, **kwargs):
    if g.user_role != "CLIENTE":
      return jsonify({'error': 'Acceso denegado: se requieren privilegios de cliente'}), 403

    return func(*args, **kwargs)

  return wrapper