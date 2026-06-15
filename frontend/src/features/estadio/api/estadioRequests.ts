import { Estadio } from '../../../types/estadio';

export type CreateEstadioRequest = Omit<Estadio, 'id' | 'sectores'> & {
  sectores: {
    nombre: string;
    capacidad: number;
  }[];
};

export type UpdateEstadioRequest = CreateEstadioRequest;
