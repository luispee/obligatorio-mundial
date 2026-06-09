import { useNavigate } from 'react-router-dom';
import { Evento } from '../types/evento';
import GreenButton from '../../../components/GreenButton';

type EventoCardProps = {
  evento: Evento;
};

export default function EventoCard({ evento }: EventoCardProps) {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg bg-white border border-gray-300 p-4 shadow-gray shadow-lg">
      <div className="relative flex flex-row justify-between items-center mb-4">
        <div className="flex flex-col">
          <img
            src={`/flags/${evento.seleccionLocal.id}.svg`}
            alt={evento.seleccionLocal.nombre}
            className="w-20 h-14 rounded-md border border-gray-300 mb-2 object-cover shadow-gray shadow-md"
          />
          <h2 className="text-xl text-gray-dark font-semibold mb-2">
            {evento.seleccionLocal.nombre}
          </h2>
        </div>
        <p className="absolute left-1/2 text-gray-dark mb-4">vs</p>
        <div className="flex flex-col items-end">
          <img
            src={`/flags/${evento.seleccionVisitante.id}.svg`}
            alt={evento.seleccionVisitante.nombre}
            className="w-20 h-14 rounded-md border border-gray-300 mb-2 object-cover shadow-gray shadow-md"
          />
          <h2 className="text-xl text-end text-gray-dark font-semibold mb-2">
            {evento.seleccionVisitante.nombre}
          </h2>
        </div>
      </div>
      <p className="text-gray-dark mb-4">Fecha: {evento.fecha}</p>
      <p className="text-gray-dark mb-4">Hora: {evento.hora}</p>
      <p className="text-gray-dark mb-4">Lugar: {evento.ubicacion}</p>
      <div className="flex justify-end">
        <GreenButton text="Comprar" onClick={() => navigate(`/events/${evento.id}`)} />
      </div>
    </div>
  );
}
