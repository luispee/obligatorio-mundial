from src.repositories.estadio_repository import EstadioRepository
from src.repositories.seleccion_repository import SeleccionRepository
from src.repositories.administrador_repositroy import AdministradorRepository
from src.repositories.administrador_repositroy import AdministradorRepository
from src.repositories.evento_repository import EventoRepository
from src.repositories.sector_repository import SectorRepository

from datetime import datetime

class EventoService:

  @staticmethod
  def get_eventos():
    return EventoRepository.get_eventos()

  @staticmethod
  def get_evento(id):
    evento = EventoRepository.get_evento_by_id(id)
    if not evento:
      raise ValueError("Evento no encontrado")
    return evento

  @staticmethod
  def get_eventos_form_data():
    pais_sede = AdministradorRepository.get_pais_sede_administrador()
    selecciones = SeleccionRepository.get_selecciones()
    estadios = EstadioRepository.get_estadios(pais_sede)
    return {
      "selecciones": selecciones,
      "estadios": estadios
    }

  @staticmethod
  def create_evento(data):
    if data['codigo_seleccion_local'] == data['codigo_seleccion_visitante']:
      raise ValueError("La selección local y visitante no pueden ser la misma")

    if data['fecha_hora'] < datetime.now().isoformat():
      raise ValueError("La fecha y hora del evento no pueden ser en el pasado")

    if len(data['estadio']['sectores']) == 0:
      raise ValueError("Debe seleccionar al menos un sector para el evento")

    pais_sede = AdministradorRepository.get_pais_sede_administrador()
    estadios = EstadioRepository.get_estadios(pais_sede)

    if not any(e['id'] == data['estadio']['id'] for e in estadios):
      raise ValueError("El estadio ingresado no pertenece al país sede del administrador")

    try:
      id_evento = EventoRepository.create_evento(data)
      evento = EventoRepository.get_evento_summary(id_evento)
      return evento
    except ValueError as ve:
      raise ve
    except Exception as e:
      raise RuntimeError(f'Error al crear el evento: {str(e)}')

  @staticmethod
  def update_evento(id, data):
    if data['codigo_seleccion_local'] == data['codigo_seleccion_visitante']:
      raise ValueError("La selección local y visitante no pueden ser la misma")

    if data['fecha_hora'] < datetime.now().isoformat():
      raise ValueError("La fecha y hora del evento no pueden ser en el pasado")

    if len(data['estadio']['sectores']) == 0:
      raise ValueError("Debe seleccionar al menos un sector para el evento")

    pais_sede = AdministradorRepository.get_pais_sede_administrador()
    estadios = EstadioRepository.get_estadios(pais_sede)

    if not any(e['id'] == data['estadio']['id'] for e in estadios):
      raise ValueError("El estadio ingresado no pertenece al país sede del administrador")

    try:
      EventoRepository.update_evento(id, data)
      evento = EventoRepository.get_evento_summary(id)
      return evento
    except ValueError as ve:
      raise ve
    except Exception as e:
      raise RuntimeError(f'Error al actualizar el evento: {str(e)}')

  @staticmethod
  def baja_evento(id_evento):
    actualizado = EventoRepository.baja_evento(id_evento)

    if not actualizado:
        raise ValueError("Evento no encontrado")

    return {
        "message": f"El evento {id_evento} fue dado de baja con exito"
    }
