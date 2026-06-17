import Button from '../../../components/Button';
import Input from '../../../components/Input';
import SectorInputs from '../components/SectorInputs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CreateEstadioRequest } from '../api/estadioRequests';
import { Sector } from '../../../types/sector';
import { useEstadio } from '../contexts/EstadioContext';
import { CreateEstadioForm } from '../types/estadioForm';

export default function CreateEstadio() {
  const [successMessage, setSuccessMessage] = useState('');
  const [estadio, setEstadio] = useState<CreateEstadioForm>({
    nombre: '',
    ciudad: '',
    sectores: [
      {
        nombre: '',
        capacidad: '',
      },
      {
        nombre: '',
        capacidad: '',
      },
      {
        nombre: '',
        capacidad: '',
      },
      {
        nombre: '',
        capacidad: '',
      },
    ],
  });

  const { createEstadio, error, loading } = useEstadio();

  const handleChange =
    (field: keyof CreateEstadioRequest) =>
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

  const handleSubmit = async () => {
    setSuccessMessage('');
    try {
      const request = {
        nombre: estadio.nombre,
        ciudad: estadio.ciudad,
        sectores: estadio.sectores.map((s) => ({
          nombre: s.nombre,
          capacidad: Number(s.capacidad),
        })),
      };
      const response = await createEstadio(request);
      setSuccessMessage(response.message);
    } catch (error) {
      console.error('Error creating estadio:', error);
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
          Nuevo Estadio
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
            <SectorInputs index={i} sector={sector} onChange={handleSectorChange} />
          </>
        ))}

        <div className="text-center min-h-[20px]">
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </div>
        {successMessage ? (
          <Button
            text="Volver a Estadios"
            color="blue"
            textColor="white"
            onClick={() => {
              setSuccessMessage('');
              window.location.href = '/estadios';
            }}
          />
        ) : (
          <Button text={loading ? 'Agregando...' : 'Agregar Estadio'} type="submit" />
        )}
      </form>
    </main>
  );
}
