import { CreateEventoResponse, FormEventoResponse } from './eventoResponses';
import { request } from '../../../utils/httpClient';

export function fetchFormEventoData(): Promise<FormEventoResponse> {
  return request('/eventos/form-data');
}

export function createEvento(data: CreateEventoRequest): Promise<CreateEventoResponse> {
  return request('/eventos', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
