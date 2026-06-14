from src.repositories.estadio_repository import EstadioRepository

class EstadioService:

    @staticmethod
    def get_estadios():
        return EstadioRepository.get_all_estadios()

    @staticmethod
    def get_estadio(id_estadio):
        estadio = EstadioRepository.get_estadio_by_id(id_estadio)

        if not estadio:
            raise ValueError("Estadio no encontrado")

        return estadio

    