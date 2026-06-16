import Button from '../../../components/Button';

type ConfirmBajaEventoModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmBajaEventoModal({
  onClose,
  onConfirm,
}: ConfirmBajaEventoModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-10"
      onClick={() => onClose()}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg shadow-gray w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Confirmar Baja</h2>
        <p className="mb-6">¿Estás seguro de que deseas dar de baja este evento?</p>
        <p className="mb-6 text-xs text-gray-500">Esta acción no se puede deshacer.</p>
        <div className="flex justify-end gap-4">
          <Button
            text="Cancelar"
            color="gray"
            onClick={() => onClose()}
            type="button"
            textColor="black"
          />
          <Button text="Confirmar" color="red" onClick={() => onConfirm()} type="button" />
        </div>
      </div>
    </div>
  );
}
