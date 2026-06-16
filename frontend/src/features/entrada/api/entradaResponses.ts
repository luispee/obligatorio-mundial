import { EventoSummaryWithNombreSector } from '../../../types/evento';

export type GetEntradasResponse = {
  id: number;
  limite_transferencias_alcanzado: boolean;
  usada: boolean;
  transferencia_pendiente: boolean;
  evento: EventoSummaryWithNombreSector;
}[];

export type TransferirEntradaResponse = {
  success: boolean;
  message: string;
};
