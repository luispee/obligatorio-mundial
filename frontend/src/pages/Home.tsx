import MatchList from '../features/matches/components/MatchList';
import { mockMatches } from '../features/matches/mockMatches';

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <MatchList matches={mockMatches} />
    </main>
  );
}
