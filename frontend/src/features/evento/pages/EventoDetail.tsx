import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from '../../../components/Select';
import SelectedEntradas from '../components/SelectedEntradas';
import Button from '../../../components/Button';
import { Evento } from '../../../types/evento';
import { useEvento } from '../contexts/EventoContext';
import { formatDate } from '../../../utils/data';
import SelectCantidadEntradas from '../components/SelectCantidadEntradas';
import { CreateVentaRequest } from '../../venta/api/ventaRequests';

export default function EventoDetail() {
  const { getEvento } = useEvento();
  const [cantidadEntradas, setCantidadEntradas] = useState(1);
  const [selectedEntradas, setSelectedEntradas] = useState<{ id_sector: number }[]>([]);

  const { id } = useParams();

  const [evento, setEvento] = useState<Evento | null>(null);

  useEffect(() => {
    async function fetchEventoData() {
      try {
        const data = await getEvento(Number(id));
        setEvento(data);
      } catch (error) {
        console.error('Error fetching evento:', error);
      }
    }

    fetchEventoData();
  }, [id]);

  useEffect(() => {
    setSelectedEntradas((prev) => prev.slice(0, cantidadEntradas));
  }, [cantidadEntradas]);

  if (!evento) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <p className="text-center text-gray-dark">Cargando evento...</p>
      </main>
    );
  }

  const handleCantidadChange = (cantidad: number) => {
    setCantidadEntradas(cantidad);
  };

  const handleSectorChange = (index: number, sectorId: number) => {
    const updatedEntradas = [...selectedEntradas];
    updatedEntradas[index] = { id_sector: sectorId };
    setSelectedEntradas(updatedEntradas);
  };

  const fecha = formatDate(evento.fecha_hora.split('T')[0]);
  const hora = evento.fecha_hora.split('T')[1].slice(0, 5);

  const total = selectedEntradas.reduce((acc, entrada) => {
    const sector = evento.estadio.sectores.find((s) => s.id === entrada?.id_sector);
    return acc + (sector?.precio || 0);
  }, 0);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-6 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row justify-between">
            <div className="flex flex-col">
              <p className="text-lg font-bold text-gray-dark mb-8">Información del Partido</p>
              <div className="flex flex-col gap-4">
                <p className="text-gray-dark">
                  <strong>Fecha:</strong> {fecha}
                </p>
                <p className="text-gray-dark">
                  <strong>Hora:</strong> {hora}
                </p>
                <p className="text-gray-dark">
                  <strong>Estadio:</strong> {evento.estadio.nombre}
                </p>

                <p className="text-gray-dark">
                  <strong>Lugar:</strong> {evento.estadio.ciudad}, {evento.estadio.pais_sede}
                </p>

                <SelectCantidadEntradas
                  cantidad={cantidadEntradas}
                  onChange={handleCantidadChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between mx-auto items-center gap-8">
            <div className="flex flex-col items-center">
              <img
                src={`/flags/${evento.seleccion_local.codigo}.svg`}
                alt={evento.seleccion_local.nombre}
                className="w-24 h-18 md:w-48 md:h-32 rounded-md border border-gray-300 mb-2 object-cover shadow-gray shadow-md"
              />
              <h2 className="text-xl text-gray-dark font-semibold mb-2 uppercase">
                {evento.seleccion_local.nombre}
              </h2>
            </div>
            <p className="text-2xl font-bold text-gray-dark">vs</p>
            <div className="flex flex-col items-center">
              <img
                src={`/flags/${evento.seleccion_visitante.codigo}.svg`}
                alt={evento?.seleccion_visitante.nombre}
                className="w-24 h-18 md:w-48 md:h-32 rounded-md border border-gray-300 mb-2 object-cover shadow-gray shadow-md"
              />
              <h2 className="text-xl text-gray-dark font-semibold mb-2 uppercase">
                {evento.seleccion_visitante.nombre}
              </h2>
            </div>
          </div>
        </div>
        <hr className="my-6 text-gray-300" />

        <SelectedEntradas
          cantidad={Number(cantidadEntradas)}
          evento={evento}
          selectedEntradas={selectedEntradas}
          onChange={handleSectorChange}
        />

        <div className="w-full flex flex-col md:flex-row items-center justify-end mt-6">
          <span className="text-lg font-bold text-gray-dark mr-4">Total: ${total.toFixed(2)}</span>
          <Button text="Proceder al pago" onClick={() => {}} />
        </div>
      </div>
    </main>
  );
}
