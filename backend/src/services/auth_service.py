from src.repositories.usuario_repository import UsuarioRepository
from src.repositories.auth_repository import AuthRepository
from src.utils.jwt import JwtUtils
from src.utils.password_hasher import PasswordHasher

class AuthService:

  @staticmethod
  def login(mail, contrasena):
    user = UsuarioRepository.find_by_mail(mail)

    if user is None:
      return None
    
    valid_contrasena = PasswordHasher.verify_password(contrasena, user.hash_contrasena)
    
    if not valid_contrasena:
      return None

    role = UsuarioRepository.get_role(mail)

    token = JwtUtils.generate_token(mail, role)

    return {"token": token, "mail": user.mail, "role": role}

  @staticmethod
  def register(data):

    required_fields = [
      'mail', 'contrasena', 'codigo_pais_documento', 'id_tipo_documento', 'numero_documento',
      'codigo_pais_residencia', 'localidad', 'calle', 'numero_puerta', 'telefonos'
    ]

    missing_fields = []

    for field in required_fields:
      if field not in data:
        missing_fields.append(field)
    
    if missing_fields:
      raise ValueError(f'Faltan campos requeridos: {", ".join(missing_fields)}')

    if data['mail'] is None or '@' not in data['mail']:
      raise ValueError('Mail inválido')

    if data['contrasena'] is None or len(data['contrasena']) < 6:
      raise ValueError('La contraseña debe tener al menos 6 caracteres')

    if UsuarioRepository.find_by_mail(data['mail']) is not None:
      raise ValueError('Ya existe un usuario con ese mail')

    hash_contrasena = PasswordHasher.hash_password(data['contrasena'])

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
