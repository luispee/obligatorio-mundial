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

export type GetTransferenciasResponse = {
  enviadas: {
    id: number;
    mail_destinatario: string;
    estado: 'Pendiente' | 'Completada' | 'Rechazada';
    evento: EventoSummaryWithNombreSector;
  }[];
  recibidas: {
    id: number;
    mail_remitente: string;
    estado: 'Pendiente' | 'Completada' | 'Rechazada';
    evento: EventoSummaryWithNombreSector;
  }[];
};
