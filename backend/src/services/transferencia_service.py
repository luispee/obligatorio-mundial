from flask import g
from src.repositories.usuario_repository import UsuarioRepository
from src.repositories.transferencia_repository import TransferenciaRepository
class TransferenciaService:
    @staticmethod
    def transferir_entrada(data):
        id_entrada = data['id_entrada']
        mail_destinatario = data['mail_destinatario']

        mail_cliente = g.user_mail

        if mail_cliente == mail_destinatario:
            raise ValueError('No puede transferir una entrada a sí mismo.')

        cliente_destinatario = UsuarioRepository.find_by_mail(mail_destinatario)
        if not cliente_destinatario:
            raise ValueError('El destinatario no existe.')

        TransferenciaRepository.create_transferencia(id_entrada, mail_destinatario, mail_cliente)
        return {
            'message': f'Entrada {id_entrada} transferida a {mail_destinatario} exitosamente.',
            'success': True
        }

    @staticmethod
    def get_transferencias_usuario():
        mail_cliente = g.user_mail
        transferencias = TransferenciaRepository.get_transferencias_by_usuario(mail_cliente)
        return transferencias