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
        
        numero_legajo_existente = FuncionarioRepository.get_funcionario_by_numero_legajo(numero_legajo)
        if numero_legajo_existente:
            raise ValueError(f"El funcionario con el legajo {numero_legajo} ya existe.")
        
        AuthService.register(data, rol="funcionario")
        
        return FuncionarioRepository.create_funcionario(mail_funcionario, numero_legajo)

    @staticmethod
    def update_funcionario(mail_funcionario, data):
        funcionario = FuncionarioRepository.get_funcionario_by_mail(mail_funcionario)
        if not funcionario:
            raise ValueError(f"El funcionario con mail {mail_funcionario} no existe.")
        
        nuevo_mail = data.get('mail').strip()
        if nuevo_mail != mail_funcionario:
            funcionario_existente = FuncionarioRepository.get_funcionario_by_mail(nuevo_mail)
            if funcionario_existente:
                raise ValueError(f"El funcionario con el mail {nuevo_mail} ya existe.")
        
        nuevo_numero_legajo = data.get('numero_legajo').strip()
        if nuevo_numero_legajo != funcionario['numero_legajo']:
            numero_legajo_existente = FuncionarioRepository.get_funcionario_by_numero_legajo(nuevo_numero_legajo)
            if numero_legajo_existente:
                raise ValueError(f"El funcionario con el legajo {nuevo_numero_legajo} ya existe.")
        
        AuthService.update_user(mail_funcionario, data)
        
        return FuncionarioRepository.update_funcionario(mail_funcionario, nuevo_numero_legajo)

    @staticmethod
    def deactivate_funcionario(mail_funcionario):
        funcionario = FuncionarioRepository.get_funcionario_by_mail(mail_funcionario)
        if not funcionario:
            raise ValueError(f"El funcionario con mail {mail_funcionario} no existe.")
        
        FuncionarioRepository.deactivate_funcionario(mail_funcionario)

    @staticmethod
    def get_full_funcionario_data(mail_funcionario):
        funcionario = FuncionarioRepository.get_funcionario_by_mail(mail_funcionario)
        if not funcionario:
            raise ValueError(f"El funcionario con mail {mail_funcionario} no existe.")
        
        user_data = AuthService.get_user_data(mail_funcionario)

        
        full_data = {
            **funcionario,
            **user_data
        }
        
        return full_data
