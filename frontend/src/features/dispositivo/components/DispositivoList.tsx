import Button from '../../../components/Button';
import { Dispositivo } from '../../../types/dispositivo';
import { useNavigate } from 'react-router-dom';

type DispositivoListProps = {
  dispositivos: Dispositivo[];
  onClickEditar: (id: number) => void;
};
export default function DispositivoList({ dispositivos, onClickEditar }: DispositivoListProps) {
  const navigate = useNavigate();
  return (
    <ul className="p-4">
      {dispositivos.map((dispositivo) => (
        <div
          className="flex justify-between bg-blue p-4 rounded-lg mb-2 shadow-md shadow-gray"
          key={dispositivo.id}
        >
          <div className="flex flex-col text-white">
            <p className="font-bold uppercase">{dispositivo.numero_serie}</p>
            <div className=" flex text-sm">
              <p>{dispositivo.modelo}</p>
            </div>
          </div>
          <Button
            text="Editar"
            color="white"
            textColor="blue"
            onClick={() => onClickEditar(dispositivo.id)}
          />
        </div>
      ))}
    </ul>
  );
}
