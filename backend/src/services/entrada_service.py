from src.repositories.entrada_repository import EntradaRepository
from flask import g
from src.repositories.usuario_repository import UsuarioRepository
from src.utils.jwt import JwtUtils

class EntradaService:

    @staticmethod
    def get_entradas():
        mail_cliente = g.user_mail
        entradas = EntradaRepository.get_entradas(mail_cliente)
        return entradas

    @staticmethod
    def get_entrada(id_entrada):
        mail_cliente = g.user_mail
        entrada = EntradaRepository.get_entrada(id_entrada, mail_cliente)
        token = JwtUtils.generate_entrada_token(id_entrada, entrada["id_sector"], entrada["id_evento"])
        return {"token_entrada": token}

    @staticmethod
    def validar_entrada(data):
        token_entrada = data.get('token_entrada')
        if not token_entrada:
            raise ValueError("Token de entrada es requerido")

        payload = JwtUtils.decode_token(token_entrada)
        id_entrada = payload.get('id_entrada')
        id_sector = payload.get('id_sector')
        id_evento = payload.get('id_evento')

        if not id_entrada or not id_sector or not id_evento:
            raise ValueError("Token de entrada inválido")

        mail_funcionario = g.user_mail

        entrada_info = EntradaRepository.validar_entrada(id_entrada, id_sector, id_evento, mail_funcionario, token_entrada)
        return entrada_info