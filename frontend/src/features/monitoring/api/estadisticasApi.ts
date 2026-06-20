import { request } from '../../../utils/httpClient';
import { GetEstadisticasResponse } from './estadisticasResponses';

export function fetchEstadisticas(): Promise<GetEstadisticasResponse> {
  return request('/estadisticas', {
    method: 'GET',
  });
}
