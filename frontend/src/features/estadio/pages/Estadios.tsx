import { Outlet, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { GetEstadiosResponse } from '../api/estadioResponses';
import EstadioList from '../components/EstadioList';
import { useEffect, useState } from 'react';
import { useEstadio } from '../contexts/EstadioContext';

export default function Estadios() {
  const { getEstadios } = useEstadio();
  const [estadios, setEstadios] = useState<GetEstadiosResponse>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEstadios();
        setEstadios(data);
      } catch (error) {
        console.error('Error fetching estadios:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <div className="relative flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray">
        <div className="absolute top-4 right-4">
          <Button text="Nuevo Estadio" onClick={() => navigate('/estadios/crear')} />
        </div>
        <h1 className="text-center text-3xl font-bold text-gray-dark mb-6 uppercase">Estadios</h1>

        <EstadioList estadios={estadios} />
      </div>
    </main>
  );
}
