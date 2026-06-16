from src.repositories.entrada_repository import EntradaRepository
from flask import g
from src.repositories.usuario_repository import UsuarioRepository

class EntradaService:

    @staticmethod
    def get_entradas():
        mail_cliente = g.user_mail
        entradas = EntradaRepository.get_entradas(mail_cliente)
        return entradas