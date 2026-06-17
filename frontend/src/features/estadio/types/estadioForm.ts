import { Estadio } from '../../../types/estadio';

export type CreateEstadioForm = Omit<Estadio, 'id' | 'sectores'> & {
  sectores: {
    nombre: string;
    capacidad: string;
  }[];
};

export type UpdateEstadioForm = Omit<Estadio, 'id' | 'sectores'> & {
  sectores: {
    id: number;
    nombre: string;
    capacidad: string;
  }[];
};
