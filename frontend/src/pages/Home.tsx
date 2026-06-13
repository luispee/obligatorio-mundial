import { useEffect } from 'react';
import EventoList from '../features/evento/components/EventoList';
import { useEvento } from '../features/evento/contexts/EventoContext';
export default function Home() {
  const { eventoList, getEventos } = useEvento();

  useEffect(() => {
    getEventos();
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <EventoList eventos={eventoList} />
    </main>
  );
}
