import { useState, useEffect } from 'react';
import { useEntrada } from '../contexts/EntradaContext';
import { QRCodeSVG } from 'qrcode.react';
import TimerCompra from '../../venta/components/TimerCompra';
import { EventoSummaryWithNombreSector } from '../../../types/evento';

type QRModalProps = {
  onClose: () => void;
  entradaId: number;
  evento?: EventoSummaryWithNombreSector;
};

export default function QRModal({ onClose, entradaId, evento }: QRModalProps) {
  const { getEntrada, error } = useEntrada();

  const [entradaToken, setEntradaToken] = useState<string | null>(null);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const fetchToken = async () => {
      try {
        const res = await getEntrada(entradaId);
        console.log('Token de entrada:', res.token_entrada);
        setEntradaToken(res.token_entrada);
        setTimerResetKey((prev) => prev + 1);
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchToken();

    interval = setInterval(fetchToken, 30000);

    return () => clearInterval(interval);
  }, [entradaId, getEntrada]);

  const handleClose = () => {
    setEntradaToken(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-10"
      onClick={handleClose}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={`/flags/${evento.seleccion_local.codigo}.svg`}
            alt="Seleccion Local"
            className="w-10 h-8 mx-auto border border-gray-dark object-cover rounded"
          />
          <p className="text-lg font-bold text-center">
            {evento?.seleccion_local.nombre} vs {evento?.seleccion_visitante.nombre}
          </p>
          <img
            src={`/flags/${evento.seleccion_visitante.codigo}.svg`}
            alt="Seleccion Visitante"
            className="w-10 h-8 mx-auto border object-cover border-gray-dark rounded"
          />
        </div>
        {initialLoading && <p className="text-center">Generando QR...</p>}

        {error && <p className="text-red-500 text-center">{error}</p>}

        {entradaToken && !error && (
          <div className="flex flex-col items-center gap-4">
            <TimerCompra initialSeconds={30} resetKey={timerResetKey} />
            <QRCodeSVG value={entradaToken} size={220} />
          </div>
        )}

        <button
          onClick={handleClose}
          className="mt-6 w-full bg-blue text-white py-2 rounded button"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
