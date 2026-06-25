import { request } from '../../../utils/httpClient';
import { CreateFuncionarioRequest } from './funcionarioRequests';
import { GetFuncionariosResponse } from './funcionarioResponses';

export function fetchFuncionarios(): Promise<GetFuncionariosResponse> {
  return request('/funcionarios');
}

export function createFuncionario(data: CreateFuncionarioRequest): Promise<any> {
  return request('/funcionarios', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
