from datetime import datetime

class EventoValidator:

  @staticmethod
  def validate_create_evento(data):
    required_fields = [
      'codigo_seleccion_local',
      'codigo_seleccion_visitante',
      'fecha_hora',
      'estadio'
    ]

    for field in required_fields:
      if field not in data:
        raise ValueError(f'Missing field: {field}')
      if isinstance(data[field], str) and not data[field].strip():
        raise ValueError(f'El campo {field} no puede estar vacío')

    estadio = data['estadio']

    if 'id' not in estadio:
      raise ValueError('Missing estadio.id')

    if 'sectores' not in estadio:
      raise ValueError('Missing estadio.sectores')

    for sector in estadio['sectores']:
      if 'id' not in sector:
        raise ValueError('Missing sector.id')

      if 'precio' not in sector:
        raise ValueError('Missing sector.precio')
      if not isinstance(sector['precio'], (int, float)) or sector['precio'] < 0:
        raise ValueError('El precio del sector debe ser un número positivo')

    