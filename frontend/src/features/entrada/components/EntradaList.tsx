import { GetEntradasResponse } from '../api/entradaResponses';
import Button from '../../../components/Button';

type EntradaListProps = {
  entradas: GetEntradasResponse;
  onTransferirClick: (entradaId: number) => void;
};

export default function EntradaList({ entradas, onTransferirClick }: EntradaListProps) {
  if (entradas.length === 0) {
    return <p className="p-4 text-center text-gray-500">No tienes entradas</p>;
  }

  return (
    <ul className="p-4">
      {entradas.map((entrada) => (
        <div
          className="flex justify-between bg-blue p-4 rounded-lg mb-2 shadow-md shadow-gray"
          key={entrada.id}
        >
          <div className="flex text-white gap-4">
            <div className=" flex flex-col text-sm justify-around gap-4 p-2 rounded-lg text-gray-dark">
              <img
                src={`/flags/${entrada.evento.seleccion_local.codigo}.svg`}
                alt={entrada.evento.seleccion_local.nombre}
                className="w-12 h-10 rounded-md mb-2 object-cover border border-gray-dark"
              />

              <img
                src={`/flags/${entrada.evento.seleccion_visitante.codigo}.svg`}
                alt={entrada.evento.seleccion_visitante.nombre}
                className="w-12 h-10 rounded-md mb-2 object-cover border border-gray-dark"
              />
            </div>
            <div className="flex flex-col text-sm gap-2 p-2 text-white">
              <p className="text-sm text-gray-300">
                <strong>Partido:</strong> {entrada.evento.seleccion_local.nombre} vs{' '}
                {entrada.evento.seleccion_visitante.nombre}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Fecha:</strong>{' '}
                {entrada.evento.fecha_hora.split('T')[0].split('-').reverse().join('/')}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Hora:</strong> {entrada.evento.fecha_hora.split('T')[1].slice(0, 5)}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Estadio:</strong> {entrada.evento.estadio.nombre}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Sector:</strong> {entrada.evento.estadio.sector}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Lugar: </strong>
                {entrada.evento.estadio.ciudad}, {entrada.evento.estadio.pais_sede}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-around gap-2">
            {entrada.usada ? (
              <p className="text-md text-white font-semibold">Usada</p>
            ) : entrada.transferencia_pendiente ? (
              <p className="text-sm text-yellow-300 font-semibold">Transferida (pendiente)</p>
            ) : (
              <>
                {entrada.limite_transferencias_alcanzado ? (
                  <p className="text-sm text-red-300 font-semibold">
                    Límite de transferencias alcanzado
                  </p>
                ) : (
                  <Button
                    text="Transferir"
                    color="white"
                    textColor="blue"
                    onClick={() => onTransferirClick(entrada.id)}
                  />
                )}
                <Button text="Ver QR" color="white" textColor="blue" onClick={() => {}} />
              </>
            )}
          </div>
        </div>
      ))}
    </ul>
  );
}
