import { useNavigate } from 'react-router-dom';
import { Match } from '../types/match';
import GreenButton from '../../../components/GreenButton';

type MatchCardProps = {
  match: Match;
};

export default function MatchCard({ match }: MatchCardProps) {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg bg-white border border-gray-300 p-4 shadow-gray shadow-lg">
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-2xl text-gray-dark font-semibold mb-2">{match.homeTeam}</h2>
        <p className="text-gray-dark mb-4">vs</p>
        <h2 className="text-2xl text-end text-gray-dark font-semibold mb-2">{match.awayTeam}</h2>
      </div>
      <p className="text-gray-dark mb-4">Fecha: {match.date}</p>
      <p className="text-gray-dark mb-4">Hora: {match.time}</p>
      <p className="text-gray-dark mb-4">Lugar: {match.location}</p>
      <div className="flex justify-end">
        <GreenButton text="Comprar" onClick={() => navigate(`/matches/${match.id}`)} />
      </div>
    </div>
  );
}
