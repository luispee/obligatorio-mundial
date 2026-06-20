import { useEstadisticas } from '../contexts/EstadisticasContext';
import { useEffect, useState } from 'react';
import { GetEstadisticasResponse } from '../api/estadisticasResponses';

export default function Estadisticas() {
  const { getEstadisticas } = useEstadisticas();
  const [estadisticas, setEstadisticas] = useState<GetEstadisticasResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEstadisticas();
        setEstadisticas(data);
      } catch (err: any) {
        console.error('Error fetching estadisticas:', err);
      }
    }
    fetchData();
  }, [getEstadisticas]);

  if (!estadisticas) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
        <p>Cargando estadísticas...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-auto flex-col items-center justify-center px-4 py-8">
      <div className="relative flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray">
        <div className="absolute top-4 right-4"></div>
        <h1 className="text-center text-3xl font-bold text-gray-dark mb-6 uppercase">
          ESTADÍSTICAS DE VENTAS
        </h1>
        <p className="text-center text-lg font-semibold">
          Total entradas vendidas: {estadisticas.total_entradas_vendidas}
        </p>
        <div className="flex mt-4">
          <ul className="flex flex-col gap-4 p-4">
            <label className="font-bold">Máximos compradores</label>
            <div>
              {estadisticas.top_compradores.map((comprador) => (
                <div
                  className="flex flex-col justify-between bg-blue p-4 rounded-lg mb-2 shadow-md shadow-gray text-white"
                  key={comprador.mail}
                >
                  <p className="text-md font-bold">{comprador.mail}</p>
                  <p className="text-sm">Entradas: {comprador.total_entradas}</p>
                </div>
              ))}
            </div>
          </ul>
          <ul className="flex flex-col gap-4 p-4">
            <label className="font-bold">Eventos con más entradas vendidas</label>
            <div>
              {estadisticas.eventos_con_mas_entradas_vendidas.map((evento, index) => (
                <div
                  className="flex flex-col md:flex-row justify-between bg-blue p-4 rounded-lg mb-2 shadow-md shadow-gray"
                  key={index}
                >
                  <div className=" flex flex-col text-sm justify-around gap-4 p-2 rounded-lg text-gray-dark">
                    <img
                      src={`/flags/${evento.seleccion_local.codigo}.svg`}
                      alt={evento.seleccion_local.nombre}
                      className="w-12 h-10 rounded-md mb-2 object-cover border border-gray-dark"
                    />

                    <img
                      src={`/flags/${evento.seleccion_visitante.codigo}.svg`}
                      alt={evento.seleccion_visitante.nombre}
                      className="w-12 h-10 rounded-md mb-2 object-cover border border-gray-dark"
                    />
                  </div>
                  <div className="flex flex-col text-sm gap-2 p-2 text-white">
                    <p className="text-sm text-gray-300">
                      <strong>Partido:</strong> {evento.seleccion_local.nombre} vs{' '}
                      {evento.seleccion_visitante.nombre}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Fecha:</strong>{' '}
                      {evento.fecha_hora.split('T')[0].split('-').reverse().join('/')}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Hora:</strong> {evento.fecha_hora.split('T')[1].slice(0, 5)}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Estadio:</strong> {evento.estadio.nombre}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Lugar: </strong>
                      {evento.estadio.ciudad}, {evento.estadio.pais_sede}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </main>
  );
}
