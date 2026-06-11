import AuthInput from './AuthInput';

type TelefonoSectionProps = {
  telefonos: string[];
  onChange: (telefonos: string[]) => void;
};

export default function TelefonoSection({ telefonos, onChange }: TelefonoSectionProps) {
  const handleChange = (index: number, value: string) => {
    const updated = [...telefonos];
    updated[index] = value;
    onChange(updated);
  };

  const agregar = () => {
    if (telefonos.length < 3) onChange([...telefonos, '']);
  };

  const eliminar = () => {
    if (telefonos.length > 1) onChange(telefonos.slice(0, -1));
  };

  return (
    <div className="mb-4">
      <div className="flex flex-col gap-4">
        {telefonos.map((tel, index) => (
          <AuthInput
            key={index}
            label={`Teléfono ${index + 1}`}
            type="tel"
            placeholder="Ingresa tu teléfono"
            value={tel}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}
      </div>
      <div className="mt-2">
        {telefonos.length < 3 && (
          <button
            type="button"
            onClick={agregar}
            className="bg-green text-[14px] text-white px-2 py-1 rounded mr-2 hover:bg-green-700"
          >
            Agregar
          </button>
        )}
        {telefonos.length > 1 && (
          <button
            type="button"
            onClick={eliminar}
            className="bg-red-500 text-[14px] text-white px-2 py-1 rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
