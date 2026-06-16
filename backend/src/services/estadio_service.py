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
    def create_estadio(data):
        pais_sede = AdministradorRepository.get_pais_sede_administrador()
        data['codigo_pais_sede'] = pais_sede
        data['activo'] = True
        
        if 'sectores' in data and len(data['sectores']) < 4:
            raise ValueError("Debe registrar todos los sectores para el estadio")
        
        try:
            id_estadio = EstadioRepository.create_estadio(data)
            return EstadioRepository.get_estadio_by_id(id_estadio)
        except ValueError as ve:
            raise ve
        except Exception as e:
            raise RuntimeError(f'Error al crear el estadio: {str(e)}')