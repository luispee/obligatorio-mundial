import { Usuario } from '../../../types/usuario';

export type LoginRequest = {
  mail: string;
  contrasena: string;
};

export type RegisterRequest = Usuario;
