from src.repositories.estadio_repository import EstadioRepository
from src.repositories.administrador_repositroy import AdministradorRepository

class EstadioService:

    @staticmethod
    def get_estadios():
        pais_sede = AdministradorRepository.get_pais_sede_administrador()
        return EstadioRepository.get_estadios_by_pais_sede(pais_sede)

    @staticmethod
    def get_estadio(id_estadio):
        estadio = EstadioRepository.get_estadio_by_id(id_estadio)

        if not estadio:
            raise ValueError("Estadio no encontrado")

        return estadio

    @staticmethod
    def update_estadio(id_estadio, data):
        # actualiza estadio + sectores
        actualizado = EstadioRepository.update_estadio(id_estadio, data)

        if not actualizado:
            raise ValueError("Estadio no encontrado")

        return EstadioRepository.get_estadio_by_id(id_estadio)

    @staticmethod
    def baja_estadio(id_estadio):
        actualizado = EstadioRepository.baja_estadio(id_estadio)

        if not actualizado:
            raise ValueError("Estadio no encontrado")

        return {
            "message": f"El estadio {id_estadio} fue dado de baja con exito"
        }
