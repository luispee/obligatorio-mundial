import { Seleccion } from '../../../types/seleccion';
import { Estadio } from '../../../types/estadio';
import { Evento, EventoSummary } from '../../../types/evento';
import { Funcionario } from '../../../types/funcionario';
import { Dispositivo } from '../../../types/dispositivo';

export type FormEventoResponse = {
  selecciones: Seleccion[];
  estadios: Estadio[];
};

export type CreateEventoResponse = {
  message: string;
  evento: EventoSummary;
};

export type GetEventosResponse = EventoSummary[];

export type GetEventoResponse = Evento;

export type GetFuncionariosBySectorResponse = {
  asignados: {
    mail_funcionario: string;
    id_dispositivo: number;
    numero_serie: string;
    modelo: string;
  }[];
  funcionarios: Funcionario[];
  dispositivos: Dispositivo[];
};
