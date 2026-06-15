import { request } from '../../../utils/httpClient';
import { CreateVentaRequest } from './ventaRequests';
import { CreateVentaResponse, PagarVentaResponse } from './ventaResponses';

export function createVenta(data: CreateVentaRequest): Promise<CreateVentaResponse> {
  return request('/ventas', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function pagarVenta(id: number): Promise<PagarVentaResponse> {
  return request(`/ventas/${id}/pagar`, {
    method: 'PATCH',
  });
}

export function cancelarVenta(id: number) {
  return request(`/ventas/${id}/cancelar`, {
    method: 'PATCH',
  });
}
