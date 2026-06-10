import { useState } from 'react';
import AuthInput from './AuthInput';

export default function TelefonoSection() {
  const [telefonosQuantity, setTelefonosQuantity] = useState(1);

  return (
    <div className="mb-4">
      <div className="flex flex-col gap-4">
        {[...Array(telefonosQuantity)].map((_, index) => (
          <AuthInput
            key={index}
            label={`Teléfono ${index + 1}`}
            type="tel"
            placeholder="Ingresa tu teléfono"
            value={''}
            onChange={() => {}}
          />
        ))}
      </div>
      <div>
        {telefonosQuantity < 3 && (
          <button
            type="button"
            onClick={() => setTelefonosQuantity(telefonosQuantity + 1)}
            className="bg-green text-[10px] text-white px-2 py-1 rounded mr-2 hover:bg-green-700"
          >
            Agregar
          </button>
        )}
        {telefonosQuantity > 1 && (
          <button
            type="button"
            onClick={() => setTelefonosQuantity(telefonosQuantity - 1)}
            className="bg-red-500 text-[10px] text-white px-2 py-1 rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
