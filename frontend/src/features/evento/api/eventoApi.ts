import { FormEventoResponse } from './eventoResponses';
import { request } from '../../../utils/httpClient';

export function fetchFormEventoData(): Promise<FormEventoResponse> {
  return request('/eventos/form-data');
}
