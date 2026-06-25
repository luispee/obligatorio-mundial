from src.repositories.evento_repository import EventoRepository
from src.repositories.dispositivo_repository import DispositivoRepository
from src.repositories.funcionario_repository import FuncionarioRepository
from src.repositories.sefd_repository import SefdRepository

#Asignacion de Sector-Evento-Funcionario-Dispositivo (SEFD)
class SefdService:
    @staticmethod
    def register_assignation_sefd(data, id_evento, id_sector):
        id_dispositivo = data.get("id_dispositivo")
        mail_funcionario = data.get("mail_funcionario")

        evento = EventoRepository.get_evento_by_id(id_evento)
        if not evento:
            raise ValueError(f"El evento con ID {id_evento} no existe.")
        
        ids_sectores_del_evento = [s['id'] for s in evento['estadio']['sectores']]
        #No chequea si el sector está inactivo, por defecto lo asigna igual (por si se habilita después)
        if id_sector not in ids_sectores_del_evento:
            raise ValueError(f"El sector {id_sector} no pertenece al evento")
        
        dispositivo = DispositivoRepository.get_dispositivo_by_id(id_dispositivo)
        if not dispositivo:
            raise ValueError(f"El dispositivo con ID {id_dispositivo} no existe.")
        
        funcionario = FuncionarioRepository.get_funcionario_by_mail(mail_funcionario)

        if not funcionario:
            raise ValueError(f"El funcionario con mail {mail_funcionario} no existe.")
        
        if SefdRepository.exists_assignation(id_evento, id_sector, mail_funcionario, id_dispositivo):
            raise ValueError("Asignación ya existente.")
        
        SefdRepository.register_assignation_sefd(id_evento, id_sector, mail_funcionario, id_dispositivo)
