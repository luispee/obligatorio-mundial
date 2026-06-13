import { Pais } from '../../../types/pais';
import { Role } from '../../../types/role';
import { TipoDocumento } from '../../../types/documento';

export type LoginResponse = {
  token: string;
  usuario: {
    role: Role;
    mail: string;
  };
  message: string;
};

export type RegisterFormDataResponse = {
  paises: Pais[];
  tipos_documento: TipoDocumento[];
};
