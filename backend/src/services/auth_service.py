from src.repositories.usuario_repository import UsuarioRepository
from src.repositories.auth_repository import AuthRepository
from src.utils.jwt import JwtUtils
from src.utils.password_hasher import PasswordHasher

class AuthService:

  @staticmethod
  def login(data):
    mail = data.get('mail')
    contrasena = data.get('contrasena')

    user = UsuarioRepository.find_by_mail(mail)

    if user is None:
      return None

    valid_contrasena = PasswordHasher.verify_password(contrasena, user['hash_contrasena'])

    if not valid_contrasena:
      return None

    role = UsuarioRepository.get_role(mail)

    token = JwtUtils.generate_token(mail, role)

    return {"token": token, "mail": user['mail'], "role": role}

  @staticmethod
  def register(data, rol="cliente"):
    if UsuarioRepository.find_by_mail(data['mail']) is not None:
      raise ValueError('Ya existe un usuario con ese mail')

    hash_contrasena = PasswordHasher.hash_password(data['contrasena'])

    data['telefonos'] = [t.strip() for t in data['telefonos'] if t.strip()]

    try:
      UsuarioRepository.create_usuario(
        data,
        hash_contrasena,
        rol
      )
    except Exception as e:
      raise RuntimeError(f'Error al crear el usuario: {str(e)}')

  @staticmethod
  def get_register_form_data():

    return AuthRepository.get_form_data()

  @staticmethod
  def verify(data):

      mail = data.get('mail')

      user = UsuarioRepository.find_by_mail(mail)

      if user is None:
          raise ValueError('No existe un usuario con ese mail')

      try:
        UsuarioRepository.verify_user(mail)

      except Exception as e:
        raise RuntimeError(f'Error al verificar el usuario: {str(e)}')

      return True

  @staticmethod
  def get_user_data(mail):
    usuario = UsuarioRepository.find_by_mail(mail)
    if usuario is None:
      return None
    role = UsuarioRepository.get_role(mail)
    del usuario['hash_contrasena']
    telefonos = UsuarioRepository.get_telefonos(mail)
    usuario['telefonos'] = telefonos
    if role == 'CLIENTE':
      is_verified = UsuarioRepository.is_verified(mail)
      usuario['verificado'] = is_verified
    else:
      usuario['verificado'] = True
    return usuario

  @staticmethod
  def update_user(mail, data):
    user = UsuarioRepository.find_by_mail(mail)

    if user is None:
      raise ValueError('No existe un usuario con ese mail')

    data['telefonos'] = [t.strip() for t in data['telefonos'] if t.strip()]

    try:
      UsuarioRepository.update_usuario(mail, data)
    except Exception as e:
      raise RuntimeError(f'Error al actualizar el usuario: {str(e)}')
      
    
    
