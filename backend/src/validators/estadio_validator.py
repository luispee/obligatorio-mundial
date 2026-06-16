class EstadioValidator:

  @staticmethod
  def validate_estadio(data):

    required_fields = ['nombre', 'ciudad']

    for field in required_fields:
        if field not in data:
            raise ValueError(f'Missing field: {field}')

    if 'nombre' in data:
      if not isinstance(data['nombre'], str) or not data['nombre'].strip():
        raise ValueError('El campo nombre no puede estar vacío')

    if 'ciudad' in data:
      if not isinstance(data['ciudad'], str) or not data['ciudad'].strip():
        raise ValueError('El campo ciudad no puede estar vacío')
