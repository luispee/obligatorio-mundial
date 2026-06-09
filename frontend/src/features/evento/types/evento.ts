type Seleccion = {
  id: string;
  nombre: string;
};

export interface Evento {
  id: number;
  seleccionLocal: Seleccion;
  seleccionVisitante: Seleccion;
  fecha: string;
  hora: string;
  ubicacion: string;
}
