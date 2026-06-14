import { useState, useRef } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';

type PaisSelectProps = {
  label?: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: string | number) => void;
  flagsPath?: string;
};

export default function PaisSelect({
  label,
  options,
  value,
  onChange,
  flagsPath = '/flags',
}: PaisSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {label && <label className="block font-semibold text-gray-700 mb-2">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="block w-full rounded border border-gray-300 px-3 py-2.5 text-left text-gray-700 shadow-sm focus:outline-none focus:ring focus:ring-green cursor-pointer flex items-center gap-2"
      >
        {selected ? (
          <>
            <img
              src={`${flagsPath}/${selected.value}.svg`}
              alt=""
              className="w-5 h-4 object-cover rounded-sm border border-gray-300"
            />
            <span>{selected.label}</span>
          </>
        ) : (
          <span className="text-gray-400">Seleccionar...</span>
        )}
        <span className="ml-auto">▾</span>
      </button>

      {open && (
        <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto mt-1">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
            >
              <img
                src={`${flagsPath}/${option.value}.svg`}
                alt=""
                className="w-5 h-4 object-cover rounded-sm border border-gray-300"
              />
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
