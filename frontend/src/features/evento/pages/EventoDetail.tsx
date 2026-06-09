import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import mockEventos from '../mockEventos';
import Select from '../../../components/Select';
import GreenButton from '../../../components/GreenButton';
import SelectedEntradas from '../components/SelectedEntradas';

export default function EventoDetail() {
  const [EntradasQuantity, setEntradasQuantity] = useState('1');
  const { id } = useParams();

  // mock para mostrar la info del partido
  const evento = mockEventos.find((m) => m.id === Number(id));

  useEffect(() => {
    //llamada a la api
  }, [id]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-6 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row justify-between">
            <div className="flex flex-col gap-8">
              <p className="text-lg font-bold text-gray-dark mb-2">Información del Partido</p>
              <p>
                <strong>Fecha:</strong> {evento?.fecha}
              </p>
              <p>
                <strong>Hora:</strong> {evento?.hora}
              </p>
              <p>
                <strong>Estadio:</strong> {evento?.ubicacion}
              </p>

              <Select
                label="Cantidad de entradas"
                options={['1', '2', '3', '4', '5']}
                value={EntradasQuantity}
                onChange={setEntradasQuantity}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between mx-auto items-center gap-8">
            <div className="flex flex-col items-center">
              <img
                src={`/flags/${evento?.seleccionLocal.id}.svg`}
                alt={evento?.seleccionLocal.nombre}
                className="w-24 h-18 md:w-48 md:h-32 rounded-md border border-gray-300 mb-2 object-cover shadow-gray shadow-md"
              />
              <h2 className="text-xl text-gray-dark font-semibold mb-2">
                {evento?.seleccionLocal.nombre}
              </h2>
            </div>
            <p className="text-2xl font-bold text-gray-dark">vs</p>
            <div className="flex flex-col items-center">
              <img
                src={`/flags/${evento?.seleccionVisitante.id}.svg`}
                alt={evento?.seleccionVisitante.nombre}
                className="w-24 h-18 md:w-48 md:h-32 rounded-md border border-gray-300 mb-2 object-cover shadow-gray shadow-md"
              />
              <h2 className="text-xl text-gray-dark font-semibold mb-2">
                {evento?.seleccionVisitante.nombre}
              </h2>
            </div>
          </div>
        </div>
        <hr className="my-6 text-gray-300" />

        <SelectedEntradas cantidad={Number(EntradasQuantity)} evento={evento} />

        <div className="w-full flex flex-col md:flex-row items-center justify-end mt-6">
          <span className="text-lg font-bold text-gray-dark mr-4">Total: $---</span>
          <GreenButton text="Proceder al pago" onClick={() => {}} />
        </div>
      </div>
    </main>
  );
}
