export type CreateEventoRequest = {
  codigo_seleccion_local: string;
  codigo_seleccion_visitante: string;
  fecha_hora: string;
  estadio: {
    id: number;
    sectores: { id: number; precio: number; activo: boolean }[];
  };
};

export type VerifyUserRequest = {
  mail: string;
};
