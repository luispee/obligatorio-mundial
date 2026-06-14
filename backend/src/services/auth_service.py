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
  def register(data):
    if UsuarioRepository.find_by_mail(data['mail']) is not None:
      raise ValueError('Ya existe un usuario con ese mail')

    hash_contrasena = PasswordHasher.hash_password(data['contrasena'])

    data['telefonos'] = [t.strip() for t in data['telefonos'] if t.strip()]

    try:
      UsuarioRepository.create_usuario(
        data,
        hash_contrasena
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

      return True
