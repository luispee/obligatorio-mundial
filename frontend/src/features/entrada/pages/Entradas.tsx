import { useEffect, useState } from 'react';
import { useEntrada } from '../contexts/EntradaContext';
import EntradaList from '../components/EntradaList';
import TransferirModal from '../components/TransferirModal';

export default function Entradas() {
  const { getEntradas, transferirEntrada, error, clearError } = useEntrada();
  const [entradas, setEntradas] = useState([]);
  const [entradaTransferencia, setEntradaTransferencia] = useState(null);
  const [destinatarioTransferencia, setDestinatarioTransferencia] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEntradas();
        setEntradas(data);
      } catch (error) {
        console.error('Error fetching entradas:', error);
      }
    };
    fetchData();
  }, []);

  const handleTransferir = async (entradaId: number) => {
    clearError();
    const response = await transferirEntrada({
      id_entrada: entradaId,
      mail_destinatario: destinatarioTransferencia,
    });
    if (response.success) {
      setEntradaTransferencia(null);
      setDestinatarioTransferencia('');
      try {
        const data = await getEntradas();
        setEntradas(data);
      } catch (error) {
        console.error('Error fetching entradas:', error);
      }
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      {entradaTransferencia && (
        <TransferirModal
          onClose={() => setEntradaTransferencia(null)}
          onConfirm={() => handleTransferir(entradaTransferencia)}
          inputValue={destinatarioTransferencia}
          onInputChange={setDestinatarioTransferencia}
          error={error}
        />
      )}
      <div className="relative flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray">
        <div className="absolute top-4 right-4"></div>
        <h1 className="text-center text-3xl font-bold text-gray-dark mb-6 uppercase">
          Mis Entradas
        </h1>

        <EntradaList entradas={entradas} onTransferirClick={setEntradaTransferencia} />
      </div>
    </main>
  );
}
