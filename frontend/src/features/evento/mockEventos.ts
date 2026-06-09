import { Evento } from './types/evento';

const SELECCIONES = [
  { id: 'ARG', nombre: 'Argentina' },
  { id: 'AUS', nombre: 'Australia' },
  { id: 'AUT', nombre: 'Austria' },
  { id: 'BEL', nombre: 'Bélgica' },
  { id: 'BIH', nombre: 'Bosnia' },
  { id: 'BRA', nombre: 'Brasil' },
  { id: 'CAN', nombre: 'Canadá' },
  { id: 'NOR', nombre: 'Noruega' },
  { id: 'SUI', nombre: 'Suiza' },
  { id: 'CIV', nombre: 'Costa de Marfil' },
  { id: 'COL', nombre: 'Colombia' },
  { id: 'CPV', nombre: 'Cabo Verde' },
  { id: 'CUW', nombre: 'Curazao' },
  { id: 'CZE', nombre: 'República Checa' },
  { id: 'DEU', nombre: 'Alemania' },
  { id: 'ALG', nombre: 'Argelia' },
  { id: 'ECU', nombre: 'Ecuador' },
  { id: 'EGY', nombre: 'Egipto' },
  { id: 'ESP', nombre: 'España' },
  { id: 'FRA', nombre: 'Francia' },
  { id: 'GHA', nombre: 'Ghana' },
  { id: 'CRO', nombre: 'Croacia' },
  { id: 'IRN', nombre: 'Irán' },
  { id: 'IRQ', nombre: 'Iraq' },
  { id: 'JPN', nombre: 'Japón' },
  { id: 'JOR', nombre: 'Jordania' },
  { id: 'KOR', nombre: 'Corea del Sur' },
  { id: 'MAR', nombre: 'Marruecos' },
  { id: 'MEX', nombre: 'México' },
  { id: 'NED', nombre: 'Países Bajos' },
  { id: 'NZL', nombre: 'Nueva Zelanda' },
  { id: 'PAN', nombre: 'Panamá' },
  { id: 'PAR', nombre: 'Paraguay' },
  { id: 'POR', nombre: 'Portugal' },
  { id: 'QAT', nombre: 'Qatar' },
  { id: 'KSA', nombre: 'Arabia Saudita' },
  { id: 'SEN', nombre: 'Senegal' },
  { id: 'SWE', nombre: 'Suecia' },
  { id: 'TUN', nombre: 'Túnez' },
  { id: 'TUR', nombre: 'Turquía' },
  { id: 'URY', nombre: 'Uruguay' },
  { id: 'USA', nombre: 'Estados Unidos' },
  { id: 'UZB', nombre: 'Uzbekistán' },
  { id: 'RSA', nombre: 'Sudáfrica' },
  { id: 'HAI', nombre: 'Haití' },
];

const FECHAS = ['2026-06-10', '2026-06-11', '2026-06-12', '2026-06-13', '2026-06-14', '2026-06-15'];

const HORAS = ['12:00', '14:00', '16:00', '18:00', '20:00', '21:30'];

const UBICACIONES = [
  'Estadio Monumental',
  'Allianz Arena',
  'Santiago Bernabéu',
  'San Siro',
  'Wembley Stadium',
  'Azteca Stadium',
];

export const mockEventos: Evento[] = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  seleccionLocal: SELECCIONES[(i * 2) % SELECCIONES.length],
  seleccionVisitante: SELECCIONES[(i * 2 + 1) % SELECCIONES.length],
  fecha: FECHAS[i % FECHAS.length],
  hora: HORAS[i % HORAS.length],
  ubicacion: UBICACIONES[i % UBICACIONES.length],
}));

export default mockEventos;
