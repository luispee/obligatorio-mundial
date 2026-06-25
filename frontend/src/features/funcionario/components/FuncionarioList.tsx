import Button from '../../../components/Button';
import { Dispositivo } from '../../../types/dispositivo';
import { useNavigate } from 'react-router-dom';
import { Funcionario } from '../../../types/funcionario';

type FuncionarioListProps = {
  funcionarios: Funcionario[];
};
export default function FuncionarioList({ funcionarios }: FuncionarioListProps) {
  const navigate = useNavigate();
  return (
    <ul className="p-4">
      {funcionarios.map((funcionario) => (
        <div
          className="flex justify-between bg-blue p-4 rounded-lg mb-2 shadow-md shadow-gray"
          key={funcionario.mail}
        >
          <div className="flex flex-col text-white">
            <p className="font-bold uppercase">{funcionario.mail}</p>
            <div className=" flex text-sm">
              <p>{funcionario.numero_legajo}</p>
            </div>
          </div>
          <Button
            text="Editar"
            color="white"
            textColor="blue"
            onClick={() => navigate(`/funcionarios/${funcionario.mail}/editar`)}
          />
        </div>
      ))}
    </ul>
  );
}
