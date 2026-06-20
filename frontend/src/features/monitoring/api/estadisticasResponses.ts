import { EventoSummary } from '../../../types/evento';

export type GetEstadisticasResponse = {
  total_entradas_vendidas: number;
  eventos_con_mas_entradas_vendidas: (EventoSummary & {
    total_entradas: number;
  })[];
  top_compradores: {
    mail: string;
    total_entradas: number;
  }[];
};
