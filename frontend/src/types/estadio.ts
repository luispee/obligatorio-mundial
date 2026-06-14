import { Sector, ExtendedSector } from './sector';

export type Estadio = {
  id: number;
  nombre: string;
  ciudad: string;
  sectores: Sector[];
};

export type EstadioSummary = Omit<Estadio, 'sectores'> & {
  pais_sede: string;
};

export type ExtendedEstadio = Omit<Estadio, 'sectores'> & {
  pais_sede: string;
  sectores: ExtendedSector[];
};
