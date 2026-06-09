type SelectProps = {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  whiteText?: boolean;
};

export default function Select({
  label,
  options,
  value,
  onChange,
  whiteText = false,
}: SelectProps) {
  return (
    <div>
      {label && (
        <label
          className={`block font-medium ${
            whiteText ? 'text-white' : 'text-gray-700'
          } font-semibold mb-2`}
        >
          {label}
        </label>
      )}
      <select
        className={`block w-full rounded border-gray-300 shadow-sm ${
          whiteText ? 'text-white' : 'text-gray-700'
        } 
          border border-gray-300 p-2
          focus:outline-none focus:ring focus:ring-green
          px-3 py-2.5
          cursor-pointer
        `}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
