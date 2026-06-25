import {
  CreateEventoResponse,
  FormEventoResponse,
  GetEventoResponse,
  GetEventosResponse,
} from './eventoResponses';
import { request } from '../../../utils/httpClient';
import { CreateEventoRequest } from './eventoRequests';
import { CreateEventoRequest as UpdateEventoRequest } from './eventoRequests';
import { GetFuncionariosBySectorResponse } from './eventoResponses';

export function fetchFormEventoData(): Promise<FormEventoResponse> {
  return request('/eventos/form-data');
}

export function createEvento(data: CreateEventoRequest): Promise<CreateEventoResponse> {
  return request('/eventos', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function fetchEventos(): Promise<GetEventosResponse> {
  return request('/eventos');
}

export function updateEvento(id: number, data: UpdateEventoRequest): Promise<CreateEventoResponse> {
  return request(`/eventos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function fetchEvento(id: number): Promise<GetEventoResponse> {
  return request(`/eventos/${id}`);
}

export function deactivateEvento(id: number) {
  return request(`/eventos/${id}/baja`, {
    method: 'PATCH',
  });
}

export function fetchFuncionariosBySector(
  eventoId: number,
  sectorId: number
): Promise<GetFuncionariosBySectorResponse> {
  return request(`/eventos/${eventoId}/sectores/${sectorId}/funcionarios`);
}

export function asignarFuncionario(
  eventoId: number,
  sectorId: number,
  mail_funcionario: string,
  id_dispositivo: number
): Promise<void> {
  return request(`/eventos/${eventoId}/sectores/${sectorId}/funcionarios`, {
    method: 'POST',
    body: JSON.stringify({ mail_funcionario, id_dispositivo }),
  });
}

export function desvincularFuncionario(
  eventoId: number,
  sectorId: number,
  mail_funcionario: string
): Promise<void> {
  return request(`/eventos/${eventoId}/sectores/${sectorId}/funcionarios/${mail_funcionario}`, {
    method: 'DELETE',
  });
}
