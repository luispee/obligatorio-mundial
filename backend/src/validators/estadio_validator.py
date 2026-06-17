class EstadioValidator:

  @staticmethod
  def validate_estadio(data):

    required_fields = ['nombre', 'ciudad', 'sectores']

    for field in required_fields:
        if field not in data:
            raise ValueError(f'Missing field: {field}')

    if 'nombre' in data:
      if not isinstance(data['nombre'], str) or not data['nombre'].strip():
        raise ValueError('El campo nombre no puede estar vacío')

    if 'ciudad' in data:
      if not isinstance(data['ciudad'], str) or not data['ciudad'].strip():
        raise ValueError('El campo ciudad no puede estar vacío')
      
    if not isinstance(data['sectores'], list) or len(data['sectores']) < 4:
            raise ValueError("Debe registrar todos los sectores para el estadio")

    for index, sector in enumerate(data['sectores']):
      if 'nombre' not in sector or not isinstance(sector['nombre'], str) or not sector['nombre'].strip():
        raise ValueError(f"El campo nombre del sector en la posición {index + 1} no puede estar vacío")
      if 'capacidad' not in sector:
        raise ValueError(f"Falta el campo capacidad en el sector '{sector.get('nombre', index + 1)}'")  
      try:
        capacidad = int(sector['capacidad'])
        if capacidad <= 0:
          raise ValueError()
      except (ValueError, TypeError):
          nombre_sector = sector.get('nombre', f"en la posición {index + 1}")
          raise ValueError(f"La capacidad del sector '{nombre_sector}' debe ser un número entero mayor a 0")