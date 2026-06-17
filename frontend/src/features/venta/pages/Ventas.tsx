import { useEffect, useState } from 'react';
import { useVenta } from '../contexts/VentaContext';
import { GetVentasResponse } from '../api/ventaResponses';
import VentaList from '../components/VentaList';

export default function Ventas() {
  const { getVentas, error, clearError } = useVenta();

  const [ventas, setVentas] = useState<GetVentasResponse>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVentas();
        setVentas(data);
      } catch (error) {
        console.error('Error fetching ventas:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <div className="relative flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray">
        <div className="absolute top-4 right-4"></div>
        <h1 className="text-center text-3xl font-bold text-gray-dark mb-6 uppercase">
          Mis Compras
        </h1>

        <VentaList ventas={ventas} />
      </div>
    </main>
  );
}
