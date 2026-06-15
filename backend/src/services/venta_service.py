from src.repositories.venta_repository import VentaRepository
from flask import g

class VentaService:

    @staticmethod
    def crear_venta(data):

        id_evento = data["id_evento"]
        sectores_lista = data["sectores"]

        mail_cliente = g.user_mail

        if len(sectores_lista) > 5:
            raise ValueError("Maximo 5 sectores por venta")

        sectores = {}
        for e in sectores_lista:
            id_sector = e["id"]
            sectores[id_sector] = sectores.get(id_sector, 0) + 1

        return VentaRepository.crear_venta_transaction(mail_cliente, id_evento, sectores)

    @staticmethod
    def pagar_venta(id):
        mail_cliente = g.user_mail
        return VentaRepository.pagar_venta_transaction(id, mail_cliente)

    @staticmethod
    def cancelar_venta(id):
        mail_cliente = g.user_mail
        return VentaRepository.cancelar_venta_transaction(id, mail_cliente)