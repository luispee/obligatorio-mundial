import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Funcionario } from '../../../types/funcionario';
import { useEvento } from '../contexts/EventoContext';
import Button from '../../../components/Button';
import { GetFuncionariosBySectorResponse } from '../api/eventoResponses';
import AsignarFuncionarioModal from '../components/AsignarFuncionarioModal';
import { AsignarFuncionarioRequest } from '../api/eventoRequests';
import { asignarFuncionario } from '../api/eventoApi';

export default function FuncionariosSector() {
  const { id, sectorId } = useParams();
  const { getFuncionariosBySector, error } = useEvento();
  const [displayFuncionariosModal, setDisplayFuncionariosModal] = useState(false);
  const [funcionariosData, setFuncionariosData] = useState<GetFuncionariosBySectorResponse | null>({
    asignados: [],
    dispositivos: [],
    funcionarios: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedFuncionario, setSelectedFuncionario] = useState<AsignarFuncionarioRequest | null>(
    null
  );

  const handleSelectChange =
    (field: keyof AsignarFuncionarioRequest) => (value: string | number) => {
      setSelectedFuncionario((prev) => ({ ...prev, [field]: value }));
    };

  useEffect(() => {
    async function fetchFuncionarios() {
      if (id && sectorId) {
        try {
          const data = await getFuncionariosBySector(Number(id), Number(sectorId));
          setFuncionariosData(data);
        } catch (error) {
          console.error('Error fetching funcionarios:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchFuncionarios();
  }, [id, sectorId, getFuncionariosBySector]);

  const handleAsignarFuncionario = async () => {
    if (id && sectorId && selectedFuncionario) {
      try {
        await asignarFuncionario(
          Number(id),
          Number(sectorId),
          selectedFuncionario.mail_funcionario,
          selectedFuncionario.id_dispositivo
        );
        setDisplayFuncionariosModal(false);
        const data = await getFuncionariosBySector(Number(id), Number(sectorId));
        setFuncionariosData(data);
      } catch (error) {
        console.error('Error assigning funcionario:', error);
      }
    }
  };

  if (loading) {
    return <p>Cargando funcionarios...</p>;
  }

  if (!funcionariosData) {
    return <p>No se pudieron cargar los funcionarios.</p>;
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <div className="relative flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray">
        <div className="absolute top-4 right-4">
          <Button text="Asignar" onClick={() => setDisplayFuncionariosModal(true)} />
        </div>
        {displayFuncionariosModal && (
          <AsignarFuncionarioModal
            onClose={() => setDisplayFuncionariosModal(false)}
            onConfirm={handleAsignarFuncionario}
            funcionarios={funcionariosData?.funcionarios || []}
            dispositivos={funcionariosData?.dispositivos || []}
            selectedFuncionario={selectedFuncionario}
            error={error}
            onSelectChange={handleSelectChange}
          />
        )}
        <h2 className="text-xl font-semibold mb-4 uppercase">Funcionarios del Sector</h2>
        {funcionariosData?.asignados.length === 0 ? (
          <p className="text-center">No hay funcionarios asignados a este sector.</p>
        ) : (
          <ul className="space-y-2">
            {funcionariosData.asignados.map((funcionario) => (
              <li
                key={funcionario.mail_funcionario}
                className="bg-gray-100 p-2 rounded shadow-sm flex justify-between items-center"
              >
                <span>{funcionario.mail_funcionario}</span>
                <span className="text-sm text-gray-600">{funcionario.numero_serie}</span>
                <span className="text-sm text-gray-600">{funcionario.modelo}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
