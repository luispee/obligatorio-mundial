import Input from '../../../components/Input';
import { Sector } from '../../../types/sector';

type SectorInputsProps = {
  index: number;
  sector: Omit<Sector, 'id' | 'capacidad'> & { id?: number; capacidad?: string };
  onChange: (index: number, field: keyof Omit<Sector, 'id'>, value: string | number) => void;
};

export default function SectorInputs({ index, sector, onChange }: SectorInputsProps) {
  return (
    <div className="w-full">
      <label className="block text-md font-bold text-gray-700 uppercase">Sector {index + 1}</label>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Nombre del Sector"
          type="text"
          placeholder="Ingrese el nombre del sector"
          onChange={(e) => onChange(index, 'nombre', e.target.value)}
          value={sector.nombre}
        />
        <Input
          label="Capacidad"
          type="number"
          placeholder="Ingrese la capacidad del sector"
          onChange={(e) => onChange(index, 'capacidad', Number(e.target.value))}
          value={sector.capacidad || ''}
        />
      </div>
    </div>
  );
}
