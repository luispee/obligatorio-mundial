import Select from '../../../components/Select';
import type { Evento } from '../types/evento';

type SelectedEntradasProps = {
  cantidad: number;
  evento: Evento;
};

export default function SelectedEntradas({ cantidad, evento }: SelectedEntradasProps) {
  return (
    <ul className="flex w-full flex-col gap-4">
      {Array.from({ length: cantidad }, (_, i) => (
        <li
          key={i}
          className="flex items-center justify-between gap-4 rounded-lg bg-blue p-4 shadow-lg shadow-gray"
        >
          <div className="flex flex-col gap-2">
            <span className="text-white text-lg font-bold">Entrada #{i + 1}</span>
            <span className="text-white text-sm font-medium">Precio: $---</span>
          </div>
          <Select
            label="Sector"
            options={['Sin elección', 'Sector A', 'Sector B', 'Sector C', 'Sector D']}
            value=""
            onChange={() => {}}
            whiteText
          />
        </li>
      ))}
    </ul>
  );
}
