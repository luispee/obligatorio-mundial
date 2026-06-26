import { createContext, useContext, useState } from 'react';
import { GetFuncionariosResponse } from '../api/funcionarioResponses';
import { fetchFuncionarios } from '../api/funcionarioApi';
import { CreateFuncionarioRequest, UpdateFuncionarioRequest } from '../api/funcionarioRequests';
import { createFuncionario as createFuncionarioApi } from '../api/funcionarioApi';
import { GetFuncionarioResponse } from '../api/funcionarioResponses';
import { getFuncionario as getFuncionarioApi } from '../api/funcionarioApi';
import { deactivateFuncionario as deactivateFuncionarioApi } from '../api/funcionarioApi';
import { updateFuncionario as updateFuncionarioApi } from '../api/funcionarioApi';

type FuncionarioContextType = {
  getFuncionarios: () => Promise<GetFuncionariosResponse>;
  createFuncionario: (data: CreateFuncionarioRequest) => Promise<any>;
  error: string | null;
  clearError: () => void;
  loading: boolean;
  deactivateFuncionario: (mail_funcionario: string) => Promise<void>;
  updateFuncionario: (mail_funcionario: string, data: UpdateFuncionarioRequest) => Promise<any>;
  getFuncionario: (mail_funcionario: string) => Promise<GetFuncionarioResponse>;
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

  const createFuncionario = async (data: CreateFuncionarioRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createFuncionarioApi(data);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err?.message || 'Error creating funcionario');
      setLoading(false);
      throw err;
    }
  };

  const getFuncionario = async (mail_funcionario: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getFuncionarioApi(mail_funcionario);
      setLoading(false);
      return response;
    } catch (err) {
      setError('Error fetching funcionario');
      setLoading(false);
      throw err;
    }
  };

  const deactivateFuncionario = async (mail_funcionario: string) => {
    setLoading(true);
    setError(null);
    try {
      await deactivateFuncionarioApi(mail_funcionario);
      setLoading(false);
    } catch (err) {
      setError('Error deactivating funcionario');
      setLoading(false);
      throw err;
    }
  };

  const updateFuncionario = async (mail_funcionario: string, data: UpdateFuncionarioRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateFuncionarioApi(mail_funcionario, data);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err?.message || 'Error updating funcionario');
      setLoading(false);
      throw err;
    }
  };

  return (
    <FuncionarioContext.Provider
      value={{
        getFuncionario,
        getFuncionarios,
        createFuncionario,
        clearError,
        error,
        loading,
        deactivateFuncionario,
        updateFuncionario,
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
