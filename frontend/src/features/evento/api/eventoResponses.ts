import { Seleccion } from '../../../types/seleccion';
import { Estadio } from '../../../types/estadio';
import { EventoSummary } from '../../../types/evento';

export type FormEventoResponse = {
  selecciones: Seleccion[];
  estadios: Estadio[];
};

export type CreateEventoResponse = {
  message: string;
  evento: EventoSummary;
};

export type GetEventosResponse = EventoSummary[];
