import { useNavigate } from 'react-router-dom';
import { Evento, EventoSummary } from '../../../types/evento';
import Button from '../../../components/Button';
import { useAuth } from '../../auth/contexts/AuthContext';
import { formatDate } from '../../../utils/data';

type EventoCardProps = {
  evento: EventoSummary;
};

export default function EventoCard({ evento }: EventoCardProps) {
  const { isAdministrador } = useAuth();
  const navigate = useNavigate();

  const fecha = formatDate(evento.fecha_hora.split('T')[0]);
  const hora = evento.fecha_hora.split('T')[1].slice(0, 5);

  return (
    <div className="rounded-lg bg-white border border-gray-300 p-4 shadow-gray shadow-lg">
      <div className="relative flex flex-row justify-between items-center mb-4">
        <div className="flex flex-col">
          <img
            src={`/flags/${evento.seleccion_local.codigo}.svg`}
            alt={evento.seleccion_local.nombre}
            className="w-20 h-14 rounded-md border border-gray-300 mb-2 object-cover shadow-gray shadow-md"
          />
          <h2 className="text-xl text-gray-dark font-semibold mb-2 uppercase">
            {evento.seleccion_local.nombre}
          </h2>
        </div>
        <p className="absolute left-1/2 text-gray-dark mb-4">vs</p>
        <div className="flex flex-col items-end">
          <img
            src={`/flags/${evento.seleccion_visitante.codigo}.svg`}
            alt={evento.seleccion_visitante.nombre}
            className="w-20 h-14 rounded-md border border-gray-300 mb-2 object-cover shadow-gray shadow-md"
          />
          <h2 className="text-xl text-end text-gray-dark font-semibold mb-2 uppercase">
            {evento.seleccion_visitante.nombre}
          </h2>
        </div>
      </div>
      <p className="text-gray-dark mb-4">Fecha: {fecha}</p>
      <p className="text-gray-dark mb-4">Hora: {hora}</p>
      <p className="text-gray-dark mb-4">Estadio: {evento.estadio.nombre}</p>
      <p className="text-gray-dark mb-4">
        Lugar: {evento.estadio.pais_sede}, {evento.estadio.ciudad}
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
