import { Outlet, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { GetDispositivosResponse } from '../api/dispositivoResponses';
import DispositivoList from '../components/DispositivoList';
import { useEffect, useState } from 'react';
import { useDispositivo } from '../contexts/DispositivoContext';

export default function Dispositivos() {
  const { getDispositivos } = useDispositivo();
  const [dispositivos, setDispositivos] = useState<GetDispositivosResponse>([]);
  const navigate = useNavigate();

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

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <div className="relative flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray">
        <div className="absolute top-4 right-4">
          <Button text="Nuevo Dispositivo" onClick={() => navigate('/dispositivos/crear')} />
        </div>
        <h1 className="text-center text-3xl font-bold text-gray-dark mb-6 uppercase">
          Dispositivos
        </h1>

        <DispositivoList dispositivos={dispositivos} />
      </div>
    </main>
  );
}
