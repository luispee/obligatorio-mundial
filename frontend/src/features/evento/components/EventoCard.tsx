import { useNavigate } from 'react-router-dom';
import { Evento, EventoSummary } from '../../../types/evento';
import Button from '../../../components/Button';
import { useAuth } from '../../auth/contexts/AuthContext';

type EventoCardProps = {
  evento: EventoSummary;
};

export default function EventoCard({ evento }: EventoCardProps) {
  const { isAdministrador } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="rounded-lg bg-white border border-gray-300 p-4 shadow-gray shadow-lg">
      <div className="relative flex flex-row justify-between items-center mb-4">
        <div className="flex flex-col">
          <img
            src={`/flags/${evento.seleccionLocal.codigo}.svg`}
            alt={evento.seleccionLocal.nombre}
            className="w-20 h-14 rounded-md border border-gray-300 mb-2 object-cover shadow-gray shadow-md"
          />
          <h2 className="text-xl text-gray-dark font-semibold mb-2 uppercase">
            {evento.seleccionLocal.nombre}
          </h2>
        </div>
        <p className="absolute left-1/2 text-gray-dark mb-4">vs</p>
        <div className="flex flex-col items-end">
          <img
            src={`/flags/${evento.seleccionVisitante.codigo}.svg`}
            alt={evento.seleccionVisitante.nombre}
            className="w-20 h-14 rounded-md border border-gray-300 mb-2 object-cover shadow-gray shadow-md"
          />
          <h2 className="text-xl text-end text-gray-dark font-semibold mb-2 uppercase">
            {evento.seleccionVisitante.nombre}
          </h2>
        </div>
      </div>
      <p className="text-gray-dark mb-4">Fecha: {''}</p>
      <p className="text-gray-dark mb-4">Hora: {''}</p>
      <p className="text-gray-dark mb-4">Estadio: {evento.estadio.nombre}</p>
      <p className="text-gray-dark mb-4">
        Lugar: {evento.estadio.pais}, {evento.estadio.ciudad}
      </p>
      <div className="flex justify-end">
        {isAdministrador ? (
          <Button text="Editar" onClick={() => navigate(`/events/${evento.id}/edit`)} />
        ) : (
          <Button text="Comprar" onClick={() => navigate(`/events/${evento.id}`)} />
        )}
      </div>
    </div>
  );
}
