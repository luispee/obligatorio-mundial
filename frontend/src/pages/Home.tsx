import EventosList from '../features/evento/components/EventosList';
import { mockEventos } from '../features/evento/mockEventos';

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <EventosList eventos={mockEventos} />
    </main>
  );
}
