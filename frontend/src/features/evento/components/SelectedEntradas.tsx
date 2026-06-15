import Select from '../../../components/Select';
import type { Evento } from '../../../types/evento';
import { CreateVentaRequest } from '../../venta/api/ventaRequests';

type SelectedEntradasProps = {
  cantidad: number;
  evento: Evento;
  selectedSectores: { id: number }[];
  onChange: (index: number, sectorId: number) => void;
};

export default function SelectedEntradas({
  cantidad,
  evento,
  selectedSectores,
  onChange,
}: SelectedEntradasProps) {
  const precio = (sectorId: number) => {
    return evento.estadio.sectores.find((s) => s.id === sectorId)?.precio || 0;
  };
  return (
    <ul className="flex w-full flex-col gap-4">
      {Array.from({ length: cantidad }, (_, i) => (
        <li
          key={i}
          className="flex items-center justify-between gap-4 rounded-lg bg-blue p-4 shadow-lg shadow-gray"
        >
          <div className="flex flex-col gap-2">
            <span className="text-white text-xl font-bold uppercase">Entrada {i + 1}</span>
          </div>
          <Select
            label="Sector"
            options={evento.estadio.sectores.map((sector) => ({
              value: sector.id.toString(),
              label: sector.nombre + ' ($' + sector.precio.toFixed(2) + ')',
            }))}
            value={selectedSectores[i]?.id.toString() || ''}
            onChange={(value) => onChange(i, Number(value))}
            whiteLabel
            textColor="blue"
          />
        </li>
      ))}
    </ul>
  );
}
