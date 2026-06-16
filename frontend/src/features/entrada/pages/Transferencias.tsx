import { useEffect, useState } from 'react';
import { useEntrada } from '../contexts/EntradaContext';
import EntradaList from '../components/EntradaList';
import TransferirModal from '../components/TransferirModal';
import Button from '../../../components/Button';
import TransferenciaList from '../components/TransferenciaList';
import { GetTransferenciasResponse } from '../api/entradaResponses';

export default function Transferencias() {
  const { getTransferencias, error, clearError } = useEntrada();

  const [transferenciasEnviadas, setTransferenciasEnviadas] = useState<
    GetTransferenciasResponse['enviadas']
  >([]);
  const [transferenciasRecibidas, setTransferenciasRecibidas] = useState<
    GetTransferenciasResponse['recibidas']
  >([]);
  const [displayRecibidas, setDisplayRecibidas] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransferencias();
        setTransferenciasEnviadas(data.enviadas);
        setTransferenciasRecibidas(data.recibidas);
      } catch (error) {
        console.error('Error fetching transferencias:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <div className="relative flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray">
        <div className="absolute top-4 right-4"></div>
        <h1 className="text-center text-3xl font-bold text-gray-dark mb-6 uppercase">
          Transferencias
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          <Button
            text="Recibidas"
            onClick={() => setDisplayRecibidas(true)}
            color={displayRecibidas ? 'blue' : 'gray'}
            textColor={displayRecibidas ? 'white' : 'blue'}
          />
          <Button
            text="Enviadas"
            onClick={() => setDisplayRecibidas(false)}
            color={displayRecibidas ? 'gray' : 'blue'}
            textColor={displayRecibidas ? 'blue' : 'white'}
          />
        </div>

        {displayRecibidas ? (
          <TransferenciaList
            variant="recibidas"
            transferencias={transferenciasRecibidas}
            onTransferirClick={() => {}}
          />
        ) : (
          <TransferenciaList
            variant="enviadas"
            transferencias={transferenciasEnviadas}
            onTransferirClick={() => {}}
          />
        )}
      </div>
    </main>
  );
}
