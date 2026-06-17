import { EventoSummary } from '../../../types/evento';

export type CreateVentaResponse = {
  message: string;
  id_venta: number;
  porcentaje_comision: number;
};

export type PagarVentaResponse = {
  message: string;
};

export type GetVentasResponse = {
  id: number;
  fecha_hora: string;
  monto_total: number;
  porcentaje_comision: number;
  evento: EventoSummary;
  sectores: string[];
}[];
