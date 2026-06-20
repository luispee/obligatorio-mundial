from src.repositories.entrada_repository import EntradaRepository
from src.repositories.evento_repository import EventoRepository

class EstadisticasService:

  @staticmethod
  def get_estadisticas():
    total_entradas = EntradaRepository.get_total_entradas()
    top_compradores = EntradaRepository.get_top_compradores()
    eventos_con_mas_entradas = EventoRepository.get_eventos_con_mas_entradas()

    return {
      "total_entradas_vendidas": total_entradas,
      "top_compradores": top_compradores,
      "eventos_con_mas_entradas_vendidas": eventos_con_mas_entradas
    }
