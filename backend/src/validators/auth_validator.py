from flask import jsonify

class AuthValidator:

  @staticmethod
  def validate_login(data):
    mail = data.get('mail')
    contrasena = data.get('contrasena')

    if not mail or not contrasena:
      raise ValueError('Mail y contraseña son requeridos')

  @staticmethod
  def validate_verify(data):

      mail = data.get('mail')

      if not mail:
          raise ValueError('Mail requerido')

      if '@' not in mail:
          raise ValueError('Mail inválido')


  @staticmethod
  def validate_register(data):
    required_fields = [
      'mail', 'contrasena', 'codigo_pais_documento', 'id_tipo_documento', 'numero_documento',
      'codigo_pais_residencia', 'localidad', 'calle', 'numero_puerta', 'telefonos'
    ]

    missing_fields = []

    for field in required_fields:
      if field not in data:
        missing_fields.append(field)
        continue

      if isinstance(data[field], str) and not data[field].strip():
        raise ValueError(f'El campo {field} no puede estar vacío')

      if missing_fields:
        raise ValueError(f'Missing fields: {", ".join(missing_fields)}')

    if not data.get('telefonos') or all(not t.strip() for t in data['telefonos']):
      raise ValueError('Debe ingresar al menos un teléfono')

    if data['mail'] is None or '@' not in data['mail']:
      raise ValueError('Mail inválido')

    if data['contrasena'] is None or len(data['contrasena']) < 6:
      raise ValueError('La contraseña debe tener al menos 6 caracteres')

  @staticmethod
  def validate_update_user(data):
    required_fields = [
      'codigo_pais_documento', 'id_tipo_documento', 'numero_documento',
      'codigo_pais_residencia', 'localidad', 'calle', 'numero_puerta', 'telefonos'
    ]

    missing_fields = []

    for field in required_fields:
      if field not in data:
        missing_fields.append(field)
        continue

      if isinstance(data[field], str) and not data[field].strip():
        raise ValueError(f'El campo {field} no puede estar vacío')

      if missing_fields:
        raise ValueError(f'Missing fields: {", ".join(missing_fields)}')

    if not data.get('telefonos') or all(not t.strip() for t in data['telefonos']):
      raise ValueError('Debe ingresar al menos un teléfono')
