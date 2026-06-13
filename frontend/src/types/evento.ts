import { EstadioSummary } from './estadio';
import { Estadio } from './estadio';
import { Seleccion } from './seleccion';

export type Evento = {
  id: number;
  seleccionLocal: Seleccion;
  seleccionVisitante: Seleccion;
  fecha_hora: string;
  estadio: Estadio;
};

export type EventoSummary = Omit<Evento, 'estadio'> & {
  estadio: EstadioSummary;
};
