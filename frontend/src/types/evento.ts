import { EstadioSummary } from './estadio';
import { Estadio } from './estadio';
import { Seleccion } from './seleccion';

export type Evento = {
  id: number;
  seleccion_local: Seleccion;
  seleccion_visitante: Seleccion;
  fecha_hora: string;
  estadio: Estadio;
};

export type EventoSummary = Omit<Evento, 'estadio'> & {
  estadio: EstadioSummary;
};
