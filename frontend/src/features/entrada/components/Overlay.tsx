import CrossIcon from '../../../icons/CrossIcon';
import { ValidarEntradaResponse } from '../api/entradaResponses';
import Button from '../../../components/Button';
import { formatDate } from '../../../utils/date';
import TickIcon from '../../../icons/TickIcon';

type OverlayProps = {
  validacion: ValidarEntradaResponse;
};

export default function Overlay({ validacion }: OverlayProps) {
  return (
    <div
      className={`fixed inset-0 ${
        validacion.valid ? 'bg-green' : 'bg-red'
      } bg-opacity-50 flex flex-col items-center justify-center z-50`}
    >
      {!validacion.valid ? (
        <CrossIcon className="w-36 h-36 cursor-pointer mb-4" />
      ) : (
        <TickIcon className="w-36 h-36 cursor-pointer mb-4" />
      )}

      <div className="w-full max-w-xs flex flex-col gap-16">
        <div className="text-center bg-white rounded-lg shadow-black shadow-md p-8">
          {validacion.valid ? (
            <h2 className="text-xl font-bold mb-4">Entrada válida</h2>
          ) : (
            <>
              <h2 className="text-xl font-bold">Entrada inválida</h2>
              <p className="text-gray-600">{validacion.message}</p>
            </>
          )}

          <div className="mt-4 text-left">
            <strong>Datos de la entrada:</strong>
            <p>Cliente: {validacion.entrada?.mail}</p>
            <p>
              Partido: {validacion.entrada?.evento.seleccion_local.nombre} vs{' '}
              {validacion.entrada?.evento.seleccion_visitante.nombre}
            </p>
            <p>Estadio: {validacion.entrada?.evento.estadio.nombre}</p>
            <p>Sector: {validacion.entrada?.evento.estadio.sector}</p>
            <p>
              Horario: {formatDate(validacion.entrada?.evento.fecha_hora.split('T')[0])}{' '}
              {validacion.entrada?.evento.fecha_hora.split('T')[1].slice(0, 5)}
            </p>
          </div>
        </div>

        {/* ocupa exactamente mismo ancho */}
        <div className="flex flex-col">
          <button
            className="button bg-white shadow-black shadow-md"
            onClick={() => window.location.reload()}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
