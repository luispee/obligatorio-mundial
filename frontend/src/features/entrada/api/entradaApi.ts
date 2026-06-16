import { request } from '../../../utils/httpClient';
import { TransferirEntradaRequest } from './entradaRequests';
import { GetEntradasResponse, TransferirEntradaResponse } from './entradaResponses';

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
