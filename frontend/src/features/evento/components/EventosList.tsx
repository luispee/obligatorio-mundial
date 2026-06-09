import type { Evento } from '../types/evento';
import EventoCard from './EventoCard';

type EventosListProps = {
  eventos: Evento[];
};

export default function EventosList({ eventos }: EventosListProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      {eventos.length === 0 ? (
        <p className="text-gray-dark text-lg">No hay eventos disponibles.</p>
      ) : null}
      <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {eventos.map((evento) => (
          <li key={evento.id}>
            <EventoCard evento={evento} />
          </li>
        ))}
      </ul>
    </div>
  );
}
