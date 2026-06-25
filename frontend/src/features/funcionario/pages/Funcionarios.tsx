import { Outlet, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { GetFuncionariosResponse } from '../api/funcionarioResponses';
import FuncionarioList from '../components/FuncionarioList';
import { useEffect, useState } from 'react';
import { useFuncionario } from '../contexts/FuncionarioContext';

export default function Funcionarios() {
  const { getFuncionarios } = useFuncionario();
  const [funcionarios, setFuncionarios] = useState<GetFuncionariosResponse>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFuncionarios();
        setFuncionarios(data);
      } catch (error) {
        console.error('Error fetching funcionarios:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <div className="relative flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray">
        <div className="absolute top-4 right-4">
          <Button text="Nuevo Funcionario" onClick={() => navigate('/funcionarios/crear')} />
        </div>
        <h1 className="text-center text-3xl font-bold text-gray-dark mb-6 uppercase">
          Funcionarios
        </h1>

        <FuncionarioList funcionarios={funcionarios} />
      </div>
    </main>
  );
}
