export type CreateVentaRequest = {
  id_evento: number;
  entradas: {
    id_sector: number;
  }[];
};
