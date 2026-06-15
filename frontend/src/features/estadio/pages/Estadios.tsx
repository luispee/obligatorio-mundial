import { Outlet, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { GetEstadiosResponse } from '../api/estadioResponses';
import EstadioList from '../components/EstadioList';
import { useEffect, useState } from 'react';

export default function Estadios() {
  const [estadios, setEstadios] = useState<GetEstadiosResponse>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí iría la lógica para cargar los estadios desde la API
    setEstadios([
      { id: 1, nombre: 'MetLife', ciudad: 'Dallas', pais_sede: 'Estados Unidos' },
      { id: 2, nombre: 'Maracaná', ciudad: 'Río de Janeiro', pais_sede: 'Brasil' },
    ]);
  }, []);

  const handleSubmit = () => {
    console.log('Formulario enviado');
  };
  return (
    <>
      <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
        <form
          className="relative flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="absolute top-4 right-4">
            <Button text="Nuevo Estadio" onClick={() => navigate('/stadiums/create')} />
          </div>
          <h1 className="text-center text-3xl font-bold text-gray-dark mb-6 uppercase">Estadios</h1>

          <EstadioList estadios={estadios} />
        </form>
      </main>
      <Outlet />
    </>
  );
}
