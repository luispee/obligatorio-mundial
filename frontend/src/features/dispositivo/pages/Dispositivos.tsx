import { Outlet, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { GetDispositivosResponse } from '../api/dispositivoResponses';
import DispositivoList from '../components/DispositivoList';
import { useEffect, useState } from 'react';
import { useDispositivo } from '../contexts/DispositivoContext';
import { CreateDispositivoRequest } from '../api/dispositivoRequest';
import DispositivoModal from '../components/DispositivoModal';

export default function Dispositivos() {
  const {
    getDispositivos,
    deactivateDispositivo,
    clearError,
    loading,
    error,
    createDispositivo,
    updateDispositivo,
  } = useDispositivo();
  const [dispositivos, setDispositivos] = useState<GetDispositivosResponse>([]);
  const [form, setForm] = useState<CreateDispositivoRequest>({
    numero_serie: '',
    modelo: '',
  });
  const [displayAgregarModal, setDisplayAgregarModal] = useState(false);
  const [editarId, setEditarId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDispositivos();
        setDispositivos(data);
      } catch (error) {
        console.error('Error fetching dispositivos:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange =
    (field: keyof CreateDispositivoRequest) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleCreateDispositivo = async () => {
    try {
      await createDispositivo(form);
      setDisplayAgregarModal(false);
      const data = await getDispositivos();
      setForm({ numero_serie: '', modelo: '' });
      clearError();
      setDispositivos(data);
    } catch (error) {
      console.error('Error creating dispositivo:', error);
    }
  };

  const handleClickEditar = (id: number) => {
    clearError();
    const dispositivoToEdit = dispositivos.find((dispositivo) => dispositivo.id === id);
    if (dispositivoToEdit) {
      setForm({
        numero_serie: dispositivoToEdit.numero_serie,
        modelo: dispositivoToEdit.modelo,
      });
      setEditarId(id);
    }
  };

  const handleEditDispositivo = async () => {
    try {
      await updateDispositivo(editarId, form);
      setEditarId(null);
      setForm({ numero_serie: '', modelo: '' });
      const data = await getDispositivos();
      setDispositivos(data);
    } catch (error) {
      console.error('Error editing dispositivo:', error);
    }
  };

  const handleDarDeBajaDispositivo = async (id: number) => {
    try {
      await deactivateDispositivo(id);
      const data = await getDispositivos();
      setEditarId(null);
      setDispositivos(data);
    } catch (error) {
      console.error('Error deactivating dispositivo:', error);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <div className="relative flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray">
        {displayAgregarModal && (
          <DispositivoModal
            title="Agregar Dispositivo"
            onConfirm={() => handleCreateDispositivo()}
            onClose={() => setDisplayAgregarModal(false)}
            form={form}
            onChange={handleChange}
            error={error}
          />
        )}

        {editarId !== null && (
          <DispositivoModal
            title="Editar Dispositivo"
            variant="edit"
            onConfirm={() => handleEditDispositivo()}
            onClose={() => setEditarId(null)}
            form={form}
            onChange={handleChange}
            onDelete={() => handleDarDeBajaDispositivo(editarId)}
            error={error}
          />
        )}
        <div className="absolute top-4 right-4">
          <Button
            text="Nuevo Dispositivo"
            onClick={() => {
              setForm({ numero_serie: '', modelo: '' });
              setDisplayAgregarModal(true);
            }}
          />
        </div>
        <h1 className="text-center text-3xl font-bold text-gray-dark mb-6 uppercase">
          Dispositivos
        </h1>

        {loading ? (
          <p className="text-center text-gray-dark">Cargando dispositivos...</p>
        ) : dispositivos.length === 0 ? (
          <p className="text-center text-gray-dark">No hay dispositivos registrados.</p>
        ) : (
          <DispositivoList
            dispositivos={dispositivos}
            onClickEditar={(id) => handleClickEditar(id)}
          />
        )}
      </div>
    </main>
  );
}
