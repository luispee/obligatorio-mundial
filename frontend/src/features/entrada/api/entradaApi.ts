import { request } from '../../../utils/httpClient';
import { TransferirEntradaRequest } from './entradaRequests';
import {
  GetEntradaResponse,
  GetEntradasResponse,
  GetTransferenciasResponse,
  TransferirEntradaResponse,
} from './entradaResponses';

export function fetchEntradas(): Promise<GetEntradasResponse> {
  return request('/entradas', {
    method: 'GET',
  });
}

export function transferirEntrada(
  data: TransferirEntradaRequest
): Promise<TransferirEntradaResponse> {
  return request('/transferencias', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function fetchTransferencias(): Promise<GetTransferenciasResponse> {
  return request('/transferencias', {
    method: 'GET',
  });
}

export function aceptarTransferencia(transferenciaId: number): Promise<void> {
  return request(`/transferencias/${transferenciaId}/aceptar`, {
    method: 'PATCH',
  });
}

export function cancelarTransferencia(transferenciaId: number): Promise<void> {
  return request(`/transferencias/${transferenciaId}/cancelar`, {
    method: 'PATCH',
  });
}

export function rechazarTransferencia(transferenciaId: number): Promise<void> {
  return request(`/transferencias/${transferenciaId}/rechazar`, {
    method: 'PATCH',
  });
}

export function fetchEntrada(entradaId: number): Promise<GetEntradaResponse> {
  return request(`/entradas/${entradaId}`, {
    method: 'GET',
  });
}
