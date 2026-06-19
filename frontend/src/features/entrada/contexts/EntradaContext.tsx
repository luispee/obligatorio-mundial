import { createContext, useCallback, useContext, useState } from 'react';
import {
  GetEntradaResponse,
  GetEntradasResponse,
  GetTransferenciasResponse,
  TransferirEntradaResponse,
} from '../api/entradaResponses';
import { fetchEntradas, fetchTransferencias } from '../api/entradaApi';
import { TransferirEntradaRequest } from '../api/entradaRequests';
import { transferirEntrada as transferirEntradaApi } from '../api/entradaApi';
import { aceptarTransferencia as aceptarTransferenciaApi } from '../api/entradaApi';
import { cancelarTransferencia as cancelarTransferenciaApi } from '../api/entradaApi';
import { rechazarTransferencia as rechazarTransferenciaApi } from '../api/entradaApi';
import { fetchEntrada } from '../api/entradaApi';

type EntradaContextType = {
  error: string | null;
  clearError: () => void;
  loading: boolean;
  getEntradas: () => Promise<GetEntradasResponse>;
  transferirEntrada: (data: TransferirEntradaRequest) => Promise<TransferirEntradaResponse>;
  getTransferencias: () => Promise<GetTransferenciasResponse>;
  aceptarTransferencia: (transferenciaId: number) => Promise<void>;
  cancelarTransferencia: (transferenciaId: number) => Promise<void>;
  rechazarTransferencia: (transferenciaId: number) => Promise<void>;
  getEntrada: (entradaId: number) => Promise<GetEntradaResponse>;
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

  const aceptarTransferencia = useCallback(async (transferenciaId: number) => {
    setLoading(true);
    clearError();
    try {
      await aceptarTransferenciaApi(transferenciaId);
    } catch (err: any) {
      setError(err.message || 'Error al aceptar la transferencia');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelarTransferencia = useCallback(async (transferenciaId: number) => {
    setLoading(true);
    clearError();
    try {
      await cancelarTransferenciaApi(transferenciaId);
    } catch (err: any) {
      setError(err.message || 'Error al cancelar la transferencia');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const rechazarTransferencia = useCallback(async (transferenciaId: number) => {
    setLoading(true);
    clearError();
    try {
      await rechazarTransferenciaApi(transferenciaId);
    } catch (err: any) {
      setError(err.message || 'Error al rechazar la transferencia');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getEntrada = useCallback(async (entradaId: number): Promise<GetEntradaResponse> => {
    setLoading(true);
    clearError();
    try {
      const data = await fetchEntrada(entradaId);
      return data;
    } catch (err: any) {
      setError(err.message || 'Error al cargar la entrada');
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
        aceptarTransferencia,
        cancelarTransferencia,
        rechazarTransferencia,
        getEntrada,
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
