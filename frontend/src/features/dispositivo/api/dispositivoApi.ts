import { request } from '../../../utils/httpClient';
import { CreateDispositivoRequest } from './dispositivoRequest';
import { GetDispositivosResponse } from './dispositivoResponses';

export function fetchDispositivos(): Promise<GetDispositivosResponse> {
  return request('/api/dispositivos');
}

export function createDispositivo(data: CreateDispositivoRequest): Promise<any> {
  return request('/api/dispositivos', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateDispositivo(id: number, data: CreateDispositivoRequest): Promise<any> {
  return request(`/api/dispositivos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
