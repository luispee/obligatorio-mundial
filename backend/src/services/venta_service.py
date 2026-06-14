from src.repositories.venta_repository import VentaRepository

class VentaService:

    @staticmethod
    def crear_venta(data):

        if not data:
            raise ValueError("Body vacío")

        if "id_evento" not in data:
            raise ValueError("id_evento obligatorio")

        if "entradas" not in data:
            raise ValueError("entradas obligatorias")

        id_evento = data["id_evento"]
        entradas = data["entradas"]

        # agrupar sectores
        sectores = {}

        for e in entradas:
            sector = e["id_sector"]
            sectores[sector] = sectores.get(sector, 0) + 1

        # regla: max 5 sectores
        if len(sectores) > 5:
            raise ValueError("Maximo 5 sectores por venta")

        return VentaRepository.crear_venta_transaction(id_evento, sectores, data)
