import { RegisterRequest } from '../../auth/api/authRequests';

export type CreateFuncionarioRequest = RegisterRequest & {
  numero_legajo: string;
};
