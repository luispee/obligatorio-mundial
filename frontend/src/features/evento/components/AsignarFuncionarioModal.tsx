import Button from '../../../components/Button';
import Select from '../../../components/Select';
import { Dispositivo } from '../../../types/dispositivo';
import { Funcionario } from '../../../types/funcionario';
import { AsignarFuncionarioRequest } from '../api/eventoRequests';

type AsignarFuncionarioModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  selectedFuncionario: AsignarFuncionarioRequest | null;
  onSelectChange: (field: keyof AsignarFuncionarioRequest) => (value: string | number) => void;
  error: string | null;
  funcionarios: Funcionario[];
  dispositivos: Dispositivo[];
};

export default function AsignarFuncionarioModal({
  onClose,
  onConfirm,
  selectedFuncionario,
  onSelectChange,
  error,
  funcionarios,
  dispositivos,
}: AsignarFuncionarioModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 z-10"
      onClick={() => onClose()}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4 text-center">Asignar Funcionario</h2>
        <Select
          label="Funcionario"
          options={funcionarios.map((f) => ({
            value: f.mail,
            label: f.mail,
          }))}
          value={selectedFuncionario?.mail_funcionario || ''}
          onChange={onSelectChange('mail_funcionario')}
        />
        {funcionarios.length === 0 && (
          <p className="text-sm text-red-500 mt-2 text-center">
            No hay funcionarios disponibles para asignar.
          </p>
        )}

        <Select
          label="Dispositivo"
          options={dispositivos.map((d) => ({
            value: d.id.toString(),
            label: `${d.modelo} - Nº Serie: ${d.numero_serie}`,
          }))}
          value={selectedFuncionario?.id_dispositivo?.toString() || ''}
          onChange={onSelectChange('id_dispositivo')}
        />

        {dispositivos.length === 0 && (
          <p className="text-sm text-red-500 mt-2 text-center">
            No hay dispositivos disponibles para asignar.
          </p>
        )}

        <p className="mt-2 text-sm text-center text-red-500 min-h-[20px]">{error}</p>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            text="Cancelar"
            color="gray"
            onClick={() => onClose()}
            type="button"
            textColor="black"
          />
          <Button text="Asignar" onClick={() => onConfirm()} type="button" />
        </div>
      </div>
    </div>
  );
}
