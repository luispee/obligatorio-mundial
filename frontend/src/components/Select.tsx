type SelectProps = {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function Select({ label, options, value, onChange }: SelectProps) {
  return (
    <div>
      {label && (
        <label className="block font-medium text-gray-dark font-semibold mb-2">{label}</label>
      )}
      <select
        className=" block w-full rounded border-gray-300 shadow-sm
          border border-gray-300 p-2
          focus:outline-none focus:ring focus:ring-green
          px-3 py-2.5
        "
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
