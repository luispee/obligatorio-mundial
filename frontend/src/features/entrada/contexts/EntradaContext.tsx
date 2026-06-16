import { createContext, useCallback, useContext, useState } from 'react';
import {
  GetEntradasResponse,
  GetTransferenciasResponse,
  TransferirEntradaResponse,
} from '../api/entradaResponses';
import { fetchEntradas, fetchTransferencias } from '../api/entradaApi';
import { TransferirEntradaRequest } from '../api/entradaRequests';
import { transferirEntrada as transferirEntradaApi } from '../api/entradaApi';

type EntradaContextType = {
  error: string | null;
  clearError: () => void;
  loading: boolean;
  getEntradas: () => Promise<GetEntradasResponse>;
  transferirEntrada: (data: TransferirEntradaRequest) => Promise<TransferirEntradaResponse>;
  getTransferencias: () => Promise<GetTransferenciasResponse>;
};

const EntradaContext = createContext<EntradaContextType | undefined>(undefined);

export function EntradaProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const clearError = useCallback(() => setError(''), []);

  const getEntradas = useCallback(async (): Promise<GetEntradasResponse> => {
    setLoading(true);
    clearError();
    try {
      const data = await fetchEntradas();
      return data;
    } catch (err: any) {
      setError(err.message || 'Error al cargar las entradas');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const transferirEntrada = useCallback(
    async (data: TransferirEntradaRequest): Promise<TransferirEntradaResponse> => {
      setLoading(true);
      clearError();
      try {
        const response = await transferirEntradaApi(data);
        return response;
      } catch (err: any) {
        setError(err.message || 'Error al transferir la entrada');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getTransferencias = useCallback(async () => {
    setLoading(true);
    clearError();
    try {
      const data = await fetchTransferencias();
      return data;
    } catch (err: any) {
      setError(err.message || 'Error al cargar las transferencias');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <EntradaContext.Provider
      value={{
        error,
        clearError,
        loading,
        getEntradas,
        transferirEntrada,
        getTransferencias,
      }}
    >
      {children}
    </EntradaContext.Provider>
  );
}

export function useEntrada() {
  const context = useContext(EntradaContext);
  if (!context) {
    throw new Error('useEntrada debe ser usado dentro de un EntradaProvider');
  }
  return context;
}

export default EntradaContext;
