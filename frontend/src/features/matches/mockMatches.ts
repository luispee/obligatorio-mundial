import { Match } from './types/match';

const TEAMS = [
  'Argentina',
  'Brazil',
  'Germany',
  'France',
  'Spain',
  'Portugal',
  'Italy',
  'Netherlands',
  'England',
  'Croatia',
  'Mexico',
  'Estados Unidos',
  'Japan',
  'Corea del Sur',
  'Australia',
  'New Zealand',
  'Belgium',
  'Switzerland',
  'Denmark',
  'Uruguay',
  'Colombia',
  'Chile',
  'Turkey',
  'Senegal',
];

const DATES = ['2026-06-10', '2026-06-11', '2026-06-12', '2026-06-13', '2026-06-14', '2026-06-15'];

const TIMES = ['12:00', '14:00', '16:00', '18:00', '20:00', '21:30'];

const LOCATIONS = [
  'Estadio Monumental',
  'Allianz Arena',
  'Santiago Bernabéu',
  'San Siro',
  'Wembley Stadium',
  'Azteca Stadium',
];

export const mockMatches: Match[] = Array.from({ length: 72 }).map((_, i) => ({
  id: i + 1,
  homeTeam: TEAMS[(i * 2) % TEAMS.length],
  awayTeam: TEAMS[(i * 2 + 1) % TEAMS.length],
  date: DATES[i % DATES.length],
  time: TIMES[i % TIMES.length],
  location: LOCATIONS[i % LOCATIONS.length],
}));

export default mockMatches;
