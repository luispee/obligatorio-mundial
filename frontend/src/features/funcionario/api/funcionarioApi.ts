import { request } from '../../../utils/httpClient';
import { CreateFuncionarioRequest, UpdateFuncionarioRequest } from './funcionarioRequests';
import { GetFuncionarioResponse, GetFuncionariosResponse } from './funcionarioResponses';

export function fetchFuncionarios(): Promise<GetFuncionariosResponse> {
  return request('/funcionarios');
}

export function createFuncionario(data: CreateFuncionarioRequest): Promise<any> {
  return request('/funcionarios', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function deactivateFuncionario(mail_funcionario: string): Promise<void> {
  return request(`/funcionarios/${mail_funcionario}/baja`, {
    method: 'PATCH',
  });
}

export function updateFuncionario(
  mail_funcionario: string,
  data: UpdateFuncionarioRequest
): Promise<any> {
  return request(`/funcionarios/${mail_funcionario}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function getFuncionario(mail_funcionario: string): Promise<GetFuncionarioResponse> {
  return request(`/funcionarios/${mail_funcionario}`);
}
