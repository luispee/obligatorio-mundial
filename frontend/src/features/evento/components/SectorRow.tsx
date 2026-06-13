import { useState } from 'react';
import Input from '../../../components/Input';
import { Sector } from '../../../types/sector';

type SectorRowProps = {
  number: number;
  sector: Sector;
  onToggle: (sectorId: number) => void;
  isSelected: boolean;
  onChange: (precio: string) => void;
  precio?: string;
};

export default function SectorRow({
  number,
  sector,
  onToggle,
  isSelected,
  onChange,
  precio,
}: SectorRowProps) {
  const opacityClass = isSelected ? 'opacity-100' : 'opacity-40';
  return (
    <div className={`flex w-full justify-between items-center gap-4 rounded-lg `}>
      <div className="flex justify-between items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isSelected ? 'bg-blue' : 'bg-red'
          }`}
        >
          <span className="text-sm font-semibold text-white">{number}</span>
        </div>
        <div className={`flex items-center gap-6 ${opacityClass}`}>
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold text-gray-dark">{sector.nombre}</h3>
            <p className="text-sm text-gray-dark">Capacidad: {sector.capacidad}</p>
          </div>

          <input
            className="w-4 h-4 cursor-pointer"
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onToggle(sector.id)}
          />
        </div>
      </div>

      <div className={`flex items-center gap-4 ${opacityClass}`}>
        <Input
          label="Precio"
          type="number"
          placeholder="Precio por entrada"
          value={precio || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
