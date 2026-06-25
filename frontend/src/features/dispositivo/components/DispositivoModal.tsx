import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { CreateDispositivoRequest } from '../api/dispositivoRequest';

type DispositivoModalProps = {
  title: string;
  variant?: 'create' | 'edit';
  onClose: () => void;
  onConfirm: () => void;
  onDelete?: () => void;
  error: string | null;
  form: CreateDispositivoRequest;
  onChange: (
    field: keyof CreateDispositivoRequest
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function DispositivoModal({
  title,
  onClose,
  onConfirm,
  onDelete,
  error,
  form,
  onChange,
  variant = 'create',
}: DispositivoModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 z-10"
      onClick={() => onClose()}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        <div className="flex flex-col gap-4">
          <Input
            label="Número de Serie"
            placeholder="Ingrese el número de serie del dispositivo"
            type="text"
            value={form.numero_serie}
            onChange={onChange('numero_serie')}
          />

          <Input
            label="Modelo"
            placeholder="Ingrese el modelo del dispositivo"
            type="string"
            value={form.modelo}
            onChange={onChange('modelo')}
          />
        </div>

        <p className="mt-2 text-sm text-center text-red-500 min-h-[20px]">{error}</p>

        <div className="flex justify-end gap-4 pt-4">
          {variant === 'edit' && (
            <Button
              text="Eliminar"
              color="red"
              onClick={() => onDelete && onDelete()}
              type="button"
              textColor="white"
            />
          )}
          <Button
            text="Cancelar"
            color="gray"
            onClick={() => onClose()}
            type="button"
            textColor="black"
          />
          <Button
            text={variant === 'create' ? 'Agregar' : 'Guardar'}
            onClick={() => onConfirm()}
            type="button"
          />
        </div>
      </div>
    </div>
  );
}
