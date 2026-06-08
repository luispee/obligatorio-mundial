type AuthInputProps = {
  label: string;
  type: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
};

export default function AuthInput({ label, type, placeholder, onChange, value }: AuthInputProps) {
  const inputId = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div>
      <label htmlFor={inputId} className="block text-gray-dark font-semibold mb-2">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green"
      />
    </div>
  );
}
