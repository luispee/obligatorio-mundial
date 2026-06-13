import { Sector } from './sector';

export type Estadio = {
  id: number;
  nombre: string;
  ciudad: string;
  sectores: Sector[];
};

export type EstadioSummary = Omit<Estadio, 'sectores'> & {
  pais: string;
};
