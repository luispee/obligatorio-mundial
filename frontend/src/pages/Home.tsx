import { useEffect } from 'react';
import EventoList from '../features/evento/components/EventoList';
import { useEvento } from '../features/evento/contexts/EventoContext';
import { useAuth } from '../features/auth/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { isFuncionario } = useAuth();
  const { eventoList, getEventos } = useEvento();

  const navigate = useNavigate();

  useEffect(() => {
    if (isFuncionario) {
      navigate('/funcionario');
      return;
    }
    getEventos();
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <EventoList eventos={eventoList} />
    </main>
  );
}
