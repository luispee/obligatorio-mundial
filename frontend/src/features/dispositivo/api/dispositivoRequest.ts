import { Dispositivo } from '../../../types/dispositivo';

export type CreateDispositivoRequest = Omit<Dispositivo, 'id'>;

export type UpdateDispositivoRequest = Omit<Dispositivo, 'id'>;
