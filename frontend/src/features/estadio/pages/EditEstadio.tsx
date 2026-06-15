import Button from '../../../components/Button';
import Input from '../../../components/Input';
import SectorInputs from '../components/SectorInputs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEstadio } from '../contexts/EstadioContext';
import { useEffect, useState } from 'react';
import { UpdateEstadioRequest } from '../api/estadioRequests';
import { Sector } from '../../../types/sector';
import { UpdateEstadioForm } from '../types/estadioForm';

export default function EditEstadio() {
  const { loading, error, getEstadio, updateEstadio } = useEstadio();
  const [estadio, setEstadio] = useState<UpdateEstadioForm>({
    id: 0,
    nombre: '',
    ciudad: '',
    sectores: [],
  });
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const data = await getEstadio(Number(id));
        setEstadio({
          id: data.id,
          nombre: data.nombre,
          ciudad: data.ciudad,
          sectores: data.sectores.map((s) => ({
            id: s.id,
            nombre: s.nombre,
            capacidad: String(s.capacidad),
          })),
        });
      } catch (error) {
        console.error('Error fetching estadio:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange =
    (field: keyof UpdateEstadioRequest) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setEstadio((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSectorChange = (
    index: number,
    field: keyof Omit<Sector, 'id'>,
    value: string | number
  ) => {
    setEstadio((prev) => {
      const sectores = [...prev.sectores];
      sectores[index] = { ...sectores[index], [field]: value };
      return { ...prev, sectores };
    });
  };

  const handleSubmit = () => {
    try {
      const request = {
        nombre: estadio.nombre,
        ciudad: estadio.ciudad,
        sectores: estadio.sectores.map((s) => ({
          nombre: s.nombre,
          capacidad: Number(s.capacidad),
        })),
      };
      console.log('Request to update estadio:', request);
      updateEstadio(Number(id), request);
      navigate('/estadios');
    } catch (error) {
      console.error('Error updating estadio:', error);
    }
  };
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <form
        className="relative flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1 className="text-center text-3xl font-bold text-gray-dark mb-6 uppercase">
          Editar Estadio
        </h1>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Nombre"
            type="text"
            placeholder="Ingrese el nombre del estadio"
            onChange={handleChange('nombre')}
            value={estadio.nombre}
          />
          <Input
            label="Ciudad"
            type="text"
            placeholder="Ingrese la ciudad del estadio"
            onChange={handleChange('ciudad')}
            value={estadio.ciudad}
          />
        </div>
        {estadio.sectores.map((sector, i) => (
          <>
            <hr className="text-gray-300" />
            <SectorInputs key={i} index={i} sector={sector} onChange={handleSectorChange} />
          </>
        ))}

        <div className="text-center min-h-[20px]">
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </div>

        <Button text={loading ? 'Guardando...' : 'Guardar Cambios'} type="submit" />
      </form>
    </main>
  );
}
