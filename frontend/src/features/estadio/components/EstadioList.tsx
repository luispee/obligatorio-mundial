import Button from '../../../components/Button';
import { EstadioSummary } from '../../../types/estadio';
import { useNavigate } from 'react-router-dom';

type EstadioListProps = {
  estadios: EstadioSummary[];
};
export default function EstadioList({ estadios }: EstadioListProps) {
  const navigate = useNavigate();
  return (
    <ul className="p-4">
      {estadios.map((estadio) => (
        <div
          className="flex justify-between bg-blue p-4 rounded-lg mb-2 shadow-md shadow-gray"
          key={estadio.id}
        >
          <div className="flex flex-col text-white">
            <p className="font-bold uppercase">{estadio.nombre}</p>
            <div className=" flex text-sm">
              <p>
                {estadio.ciudad}, {estadio.pais_sede}
              </p>
            </div>
          </div>
          <Button
            text="Editar"
            color="white"
            textColor="blue"
            onClick={() => navigate(`/stadiums/${estadio.id}/edit`)}
          />
        </div>
      ))}
    </ul>
  );
}
