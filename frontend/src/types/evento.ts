import { EstadioSummary, ExtendedEstadio } from './estadio';
import { Seleccion } from './seleccion';

export type Evento = {
  id: number;
  seleccion_local: Seleccion;
  seleccion_visitante: Seleccion;
  fecha_hora: string;
  estadio: ExtendedEstadio;
};

export type EventoSummary = Omit<Evento, 'estadio'> & {
  estadio: EstadioSummary;
};
