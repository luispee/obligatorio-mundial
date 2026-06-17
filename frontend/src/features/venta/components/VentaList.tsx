import { GetVentasResponse } from '../api/ventaResponses';

type VentaListProps = {
  ventas: GetVentasResponse;
};

export default function VentaList({ ventas }: VentaListProps) {
  if (ventas.length === 0) {
    return <p className="p-4 text-center text-gray-500">No has realizado ninguna compra</p>;
  }

  const montoTotal = (monto: number, porcentaje: number) => {
    const comision = (monto * porcentaje) / 100;
    return (monto + comision).toFixed(2);
  };

  return (
    <ul className="p-4">
      {ventas.map((venta) => (
        <div
          className="flex justify-between bg-blue p-4 rounded-lg mb-2 shadow-md shadow-gray"
          key={venta.id}
        >
          <div className="flex text-white gap-4">
            <div className=" flex flex-col text-sm justify-around gap-4 p-2 rounded-lg text-gray-dark">
              <img
                src={`/flags/${venta.evento.seleccion_local.codigo}.svg`}
                alt={venta.evento.seleccion_local.nombre}
                className="w-12 h-10 rounded-md mb-2 object-cover border border-gray-dark"
              />

              <img
                src={`/flags/${venta.evento.seleccion_visitante.codigo}.svg`}
                alt={venta.evento.seleccion_visitante.nombre}
                className="w-12 h-10 rounded-md mb-2 object-cover border border-gray-dark"
              />
            </div>
            <div className="flex flex-col text-sm justify-around gap-2 p-2 text-white">
              <p className="text-sm text-gray-300">
                <strong>Partido:</strong> {venta.evento.seleccion_local.nombre} vs{' '}
                {venta.evento.seleccion_visitante.nombre}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Fecha:</strong>{' '}
                {venta.evento.fecha_hora.split('T')[0].split('-').reverse().join('/')}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Hora:</strong> {venta.evento.fecha_hora.split('T')[1].slice(0, 5)}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Estadio:</strong> {venta.evento.estadio.nombre}
              </p>

              <p className="text-sm text-gray-300">
                <strong>Lugar: </strong>
                {venta.evento.estadio.ciudad}, {venta.evento.estadio.pais_sede}
              </p>
            </div>
          </div>
          <div className="text-gray text-right">
            <p>
              <strong>
                Monto: <span>${montoTotal(venta.monto_total, venta.porcentaje_comision)}</span>
              </strong>
            </p>
            <p className="mt-2">
              <strong>Entradas ({venta.sectores.length})</strong>
            </p>
            <div className="flex flex-col gap-1">
              {venta.sectores.map((sector) => (
                <span key={sector}>{sector}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </ul>
  );
}
