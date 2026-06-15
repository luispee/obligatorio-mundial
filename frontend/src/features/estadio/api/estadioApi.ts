import { request } from '../../../utils/httpClient';
import { CreateEstadioRequest, UpdateEstadioRequest } from './estadioRequests';
import { GetEstadioResponse, GetEstadiosResponse } from './estadioResponses';

export function fetchEstadios(): Promise<GetEstadiosResponse> {
  return request('/estadios', {
    method: 'GET',
  });
}

export function fetchEstadio(id: number): Promise<GetEstadioResponse> {
  return request(`/estadios/${id}`, {
    method: 'GET',
  });
}

export function createEstadio(data: CreateEstadioRequest) {
  return request('/estadios', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateEstadio(id: number, data: UpdateEstadioRequest) {
  return request(`/estadios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteEstadio(id: number) {
  return request(`/estadios/${id}`, {
    method: 'DELETE',
  });
}
