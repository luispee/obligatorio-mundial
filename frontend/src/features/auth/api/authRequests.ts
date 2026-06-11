export type LoginRequest = {
  mail: string;
  contrasena: string;
};

export type RegisterRequest = {
  mail: string;
  contrasena: string;
  codigo_pais_documento: string;
  id_tipo_documento: number;
  numero_documento: string;
  codigo_pais_residencia: string;
  localidad: string;
  calle: string;
  numero_puerta: string;
  codigo_postal?: string;
  telefonos: string[];
};
