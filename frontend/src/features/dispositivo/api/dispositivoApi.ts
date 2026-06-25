import { request } from '../../../utils/httpClient';
import { GetDispositivosResponse } from './dispositivoResponses';

export function fetchDispositivos(): Promise<GetDispositivosResponse> {
  return request('/api/dispositivos');
}
