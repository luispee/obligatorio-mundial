import { useState, useRef, useEffect } from 'react';

type SelectProps = {
  label?: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: string | number) => void;
  textColor?: string;
  whiteLabel?: boolean;
};

export default function Select({
  label,
  options,
  value,
  onChange,
  textColor = 'gray-700',
  whiteLabel = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const borderColor = textColor === 'white' ? 'border-white/40' : 'border-gray-300';

  return (
    <div ref={ref} className="relative min-w-[240px]">
      {label && (
        <label
          className={`block font-semibold mb-2 ${whiteLabel ? 'text-white' : 'text-' + textColor}`}
        >
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`block w-full bg-white rounded border ${borderColor} px-3 py-2.5 text-left text-${textColor} shadow-sm focus:outline-none focus:ring focus:ring-green cursor-pointer flex items-center`}
      >
        <span className="flex-1">
          {selected ? selected.label : <span className={`text-${textColor}`}>Seleccionar...</span>}
        </span>
        <span>▾</span>
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
              className={`px-3 py-2 hover:bg-gray-100 cursor-pointer text-${textColor}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
