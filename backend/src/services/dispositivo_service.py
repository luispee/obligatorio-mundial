from src.repositories.dispositivo_repository import DispositivoRepository
from src.validators.dispositivo_validator import DispositivoValidator

class DispositivoService:
    @staticmethod
    def create_dispositivo(data):
        
        return DispositivoRepository.create_dispositivo(data)
    
    @staticmethod
    def get_dispositivos():
        return DispositivoRepository.get_dispositivos()
