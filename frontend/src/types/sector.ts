export type Sector = {
  id: number;
  nombre: string;
  capacidad: number;
};

export type ExtendedSector = Omit<Sector, 'capacidad'> & {
  precio: number;
  disponible: boolean;
  activo: boolean;
};
