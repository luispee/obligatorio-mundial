import { GetTransferenciasResponse } from '../api/entradaResponses';
import Button from '../../../components/Button';

type TransferenciaListProps = {
  transferencias: GetTransferenciasResponse['enviadas'] | GetTransferenciasResponse['recibidas'];
  onAceptar?: (transferenciaId: number) => void;
  onCancelar?: (transferenciaId: number) => void;
  onRechazar?: (transferenciaId: number) => void;
  variant: 'enviadas' | 'recibidas';
};

export default function TransferenciaList({
  transferencias,
  onAceptar,
  onCancelar,
  onRechazar,
  variant,
}: TransferenciaListProps) {
  if (transferencias.length === 0) {
    return (
      <p className="p-4 text-center text-gray-500">
        {variant === 'enviadas'
          ? 'No has enviado ninguna transferencia'
          : 'No has recibido ninguna transferencia'}
      </p>
    );
  }

  return (
    <ul className="p-4">
      {transferencias.map((transferencia) => (
        <div
          className="flex flex-col md:flex-row justify-between bg-blue p-4 rounded-lg mb-2 shadow-md shadow-gray"
          key={transferencia.id}
        >
          <div className="flex flex-col md:flex-row text-white gap-4">
            <div className="flex flex-row md:flex-col text-sm justify-around gap-4 p-2 rounded-lg text-gray-dark">
              <img
                src={`/flags/${transferencia.evento.seleccion_local.codigo}.svg`}
                alt={transferencia.evento.seleccion_local.nombre}
                className="w-12 h-10 rounded-md mb-2 object-cover border border-gray-dark"
              />

              <img
                src={`/flags/${transferencia.evento.seleccion_visitante.codigo}.svg`}
                alt={transferencia.evento.seleccion_visitante.nombre}
                className="w-12 h-10 rounded-md mb-2 object-cover border border-gray-dark"
              />
            </div>
            <div className="flex flex-col text-sm gap-2 p-2 text-white">
              <p className="text-sm text-gray-300">
                <strong>Partido:</strong> {transferencia.evento.seleccion_local.nombre} vs{' '}
                {transferencia.evento.seleccion_visitante.nombre}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Fecha:</strong>{' '}
                {transferencia.evento.fecha_hora.split('T')[0].split('-').reverse().join('/')}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Hora:</strong> {transferencia.evento.fecha_hora.split('T')[1].slice(0, 5)}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Estadio:</strong> {transferencia.evento.estadio.nombre}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Sector:</strong> {transferencia.evento.estadio.sector}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Lugar: </strong>
                {transferencia.evento.estadio.ciudad}, {transferencia.evento.estadio.pais_sede}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-around gap-2">
            {variant === 'enviadas' ? (
              <div className="flex flex-col items-end gap-2">
                <div className="mb-4 text-right">
                  <p className="text-sm text-gray-300">
                    <strong>Destinatario:</strong>
                  </p>
                  <p className="text-sm text-gray-300">{transferencia.mail_destinatario}</p>
                </div>
                {transferencia.estado === 'Pendiente' ? (
                  <>
                    <p className="text-sm text-yellow-300 font-semibold">Pendiente</p>
                    <Button
                      text="Cancelar"
                      color="red"
                      textColor="white"
                      onClick={() => onCancelar(transferencia.id)}
                    />
                  </>
                ) : transferencia.estado === 'Completada' ? (
                  <p className="text-sm text-green-400 font-semibold">Aceptada</p>
                ) : transferencia.estado === 'Cancelada' ? (
                  <p className="text-sm text-red-400 font-semibold">Cancelada</p>
                ) : (
                  <p className="text-sm text-red-400 font-semibold">Rechazada</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-end gap-2">
                <div className="mb-4 text-right">
                  <p className="text-sm text-gray-300">
                    <strong>Remitente:</strong>
                  </p>
                  <p className="text-sm text-gray-300">{transferencia.mail_remitente}</p>
                </div>
                {transferencia.estado === 'Pendiente' && (
                  <div className="flex flex-col items-end gap-2">
                    <div className="mb-4 text-right"></div>
                    <Button
                      text="Aceptar"
                      color="white"
                      textColor="blue"
                      onClick={() => onAceptar(transferencia.id)}
                    />
                    <Button
                      text="Rechazar"
                      color="red"
                      textColor="white"
                      onClick={() => onRechazar(transferencia.id)}
                    />
                  </div>
                )}
                {transferencia.estado === 'Completada' && (
                  <p className="text-sm text-green-400 font-semibold">Aceptada</p>
                )}
                {transferencia.estado === 'Rechazada' && (
                  <p className="text-sm text-red-400 font-semibold">Rechazada</p>
                )}
                {transferencia.estado === 'Cancelada' && (
                  <p className="text-sm text-red-400 font-semibold">Cancelada</p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </ul>
  );
}
