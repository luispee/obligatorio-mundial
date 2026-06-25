from src.services.auth_service import AuthService
from src.repositories.funcionario_repository import FuncionarioRepository


class FuncionarioService:
    @staticmethod
    def get_funcionarios():
        return FuncionarioRepository.get_funcionarios()

    @staticmethod
    def get_funcionario(mail_funcionario):
        funcionario = FuncionarioRepository.get_funcionario_by_mail(mail_funcionario)
        if not funcionario:
            raise ValueError(f"El funcionario con mail {mail_funcionario} no existe.")
        return funcionario
    
    @staticmethod
    def create_funcionario(data):
        mail_funcionario = data.get('mail').strip()
        numero_legajo = data.get('numero_legajo').strip()

        funcionario_existente = FuncionarioRepository.get_funcionario_by_mail(mail_funcionario)
        if funcionario_existente:
            raise ValueError(f"El funcionario con el mail {mail_funcionario} ya existe.")
        
        AuthService.register(data, rol="funcionario")
        
        return FuncionarioRepository.create_funcionario(mail_funcionario, numero_legajo)
