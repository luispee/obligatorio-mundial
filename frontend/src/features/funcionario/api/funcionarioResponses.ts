import { Funcionario } from '../../../types/funcionario';
import { Usuario } from '../../../types/usuario';

export type GetFuncionariosResponse = Funcionario[];

export type GetFuncionarioResponse = Omit<Usuario, 'contrasena'> & {
  numero_legajo: string;
};
