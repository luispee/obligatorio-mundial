import { createContext, useContext, useState } from 'react';
import { GetFuncionariosResponse } from '../api/funcionarioResponses';
import { fetchFuncionarios } from '../api/funcionarioApi';

type FuncionarioContextType = {
  getFuncionarios: () => Promise<GetFuncionariosResponse>;

  error: string | null;
  clearError: () => void;
  loading: boolean;
  deactivateFuncionario: (id: number) => Promise<void>;
};

const FuncionarioContext = createContext<FuncionarioContextType | undefined>(undefined);

export function FuncionarioProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const clearError = () => setError(null);

  const getFuncionarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFuncionarios();
      setLoading(false);
      return response;
    } catch (err) {
      setError('Error fetching funcionarios');
      setLoading(false);
      throw err;
    }
  };

  return (
    <FuncionarioContext.Provider
      value={{
        getFuncionarios,
        error,
        clearError,
        loading,
        deactivateFuncionario: async (id: number) => {
          // Implement the deactivateFuncionario function here
          // For now, just log the id
          console.log(`Deactivate funcionario with id: ${id}`);
        },
      }}
    >
      {children}
    </FuncionarioContext.Provider>
  );
}

export function useFuncionario() {
  const context = useContext(FuncionarioContext);
  if (!context) {
    throw new Error('useFuncionario must be used within a FuncionarioProvider');
  }
  return context;
}
