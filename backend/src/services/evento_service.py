from src.repositories.estadio_repository import EstadioRepository
from src.repositories.seleccion_repository import SeleccionRepository
from src.repositories.administrador_repositroy import AdministradorRepository

class EventoService:

  @staticmethod
  def get_eventos_form_data():
    pais_sede = AdministradorRepository.get_pais_sede_administrador()
    selecciones = SeleccionRepository.get_selecciones()
    estadios = EstadioRepository.get_estadios(pais_sede)
    return {
      "selecciones": selecciones,
      "estadios": estadios
    }
