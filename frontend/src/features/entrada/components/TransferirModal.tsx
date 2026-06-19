import Button from '../../../components/Button';
import Input from '../../../components/Input';

type TransferirModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  error: string | null;
};

export default function TransferirModal({
  onClose,
  onConfirm,
  inputValue,
  onInputChange,
  error,
}: TransferirModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 z-10"
      onClick={() => onClose()}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Transferir</h2>
        <Input
          label="Correo del destinatario"
          type="email"
          placeholder="correo@ejemplo.com"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
        />

        <p className="mt-2 text-sm text-center text-red-500 min-h-[20px]">{error}</p>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            text="Cancelar"
            color="gray"
            onClick={() => onClose()}
            type="button"
            textColor="black"
          />
          <Button text="Enviar" onClick={() => onConfirm()} type="button" />
        </div>
      </div>
    </div>
  );
}
