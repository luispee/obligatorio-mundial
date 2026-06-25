import { request } from '../../../utils/httpClient';
import { GetFuncionariosResponse } from './funcionarioResponses';

export function fetchFuncionarios(): Promise<GetFuncionariosResponse> {
  return request('/funcionarios');
}
