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
        estadio = EstadioRepository.get_estadio_by_id(id_estadio)

        if not estadio:
            raise ValueError("Estadio no encontrado")

        if EstadioRepository.estadio_tiene_eventos(id_estadio):
            raise ValueError(
                "No se puede modificar un estadio que tiene eventos asociados"
            )

        EstadioRepository.update_estadio(id_estadio, data)

        return {
            "message": "Estadio actualizado con exito"
        }
