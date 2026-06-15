import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchEstadio, fetchEstadios } from '../api/estadioApi';
import {
  createEstadio as createEstadioApi,
  updateEstadio as updateEstadioApi,
} from '../api/estadioApi';
import { GetEstadioResponse, GetEstadiosResponse } from '../api/estadioResponses';
import { CreateEstadioRequest, UpdateEstadioRequest } from '../api/estadioRequests';

type EstadioContextType = {
  getEstadios: () => Promise<GetEstadiosResponse>;
  getEstadio: (id: number) => Promise<GetEstadioResponse>;
  createEstadio: (data: CreateEstadioRequest) => Promise<any>;
  updateEstadio: (id: number, data: UpdateEstadioRequest) => Promise<any>;
  error: string | null;
  clearError: () => void;
  loading: boolean;
};

const EstadioContext = createContext<EstadioContextType | undefined>(undefined);

export function EstadioProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const clearError = useCallback(() => setError(''), []);

  const getEstadios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const estadios = await fetchEstadios();
      return estadios;
    } catch (error) {
      console.error('Error fetching estadios:', error);
      setError('Error al cargar los estadios');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getEstadio = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const estadio = await fetchEstadio(id);
      return estadio;
    } catch (error) {
      console.error('Error fetching estadio:', error);
      setError('Error al cargar el estadio');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createEstadio = useCallback(async (data: CreateEstadioRequest) => {
    setLoading(true);
    setError(null);
    try {
      const estadio = await createEstadioApi(data);
      return estadio;
    } catch (e: any) {
      const message = e?.code || e?.message || 'Error al crear el estadio';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEstadio = useCallback(async (id: number, data: UpdateEstadioRequest) => {
    setLoading(true);
    setError(null);
    try {
      const estadio = await updateEstadioApi(id, data);
      return estadio;
    } catch (e: any) {
      const message = e?.code || e?.message || 'Error al editar el estadio';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <EstadioContext.Provider
      value={{ getEstadios, getEstadio, createEstadio, updateEstadio, error, clearError, loading }}
    >
      {children}
    </EstadioContext.Provider>
  );
}

export function useEstadio() {
  const context = useContext(EstadioContext);
  if (!context) {
    throw new Error('useEstadio debe ser usado dentro de un EstadioProvider');
  }
  return context;
}

export default EstadioContext;
