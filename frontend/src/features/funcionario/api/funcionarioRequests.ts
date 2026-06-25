import { RegisterRequest } from '../../auth/api/authRequests';

export type CreateFuncionarioRequest = RegisterRequest & {
  numero_legajo: string;
};

export type UpdateFuncionarioRequest = Omit<CreateFuncionarioRequest, 'mail' | 'contrasena'> & {
  mail: string;
};
