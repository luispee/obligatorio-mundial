import type { Match } from '../types/matchType';
import MatchCard from './MatchCard';

type MatchListProps = {
  matches: Match[];
};

export default function MatchList({ matches }: MatchListProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <li key={match.id}>
            <MatchCard match={match} />
          </li>
        ))}
      </ul>
    </div>
  );
}
