import { createContext, useContext, useState } from 'react';
import { GetDispositivosResponse } from '../api/dispositivoResponses';
import { fetchDispositivos } from '../api/dispositivoApi';
import { CreateDispositivoRequest } from '../api/dispositivoRequest';
import { createDispositivo as createDispositivoApi } from '../api/dispositivoApi';
import { UpdateDispositivoRequest } from '../api/dispositivoRequest';
import { updateDispositivo as updateDispositivoApi } from '../api/dispositivoApi';

type DispositivoContextType = {
  getDispositivos: () => Promise<GetDispositivosResponse>;
  createDispositivo: (data: CreateDispositivoRequest) => Promise<any>;
  updateDispositivo: (id: number, data: UpdateDispositivoRequest) => Promise<any>;
  error: string | null;
  clearError: () => void;
  loading: boolean;
  deactivateDispositivo: (id: number) => Promise<void>;
};

const DispositivoContext = createContext<DispositivoContextType | undefined>(undefined);

export function DispositivoProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const clearError = () => setError(null);

  const getDispositivos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchDispositivos();
      setLoading(false);
      return response;
    } catch (err) {
      setError('Error fetching dispositivos');
      setLoading(false);
      throw err;
    }
  };

  const createDispositivo = async (data: CreateDispositivoRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createDispositivoApi(data);
      setLoading(false);
      return response;
    } catch (err) {
      setError('Error creating dispositivo');
      setLoading(false);
      throw err;
    }
  };

  const updateDispositivo = async (id: number, data: UpdateDispositivoRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateDispositivoApi(id, data);
      setLoading(false);
      return response;
    } catch (err) {
      setError('Error updating dispositivo');
      setLoading(false);
      throw err;
    }
  };

  return (
    <DispositivoContext.Provider
      value={{
        getDispositivos,
        createDispositivo,
        updateDispositivo,
        error,
        clearError,
        loading,
        deactivateDispositivo: async (id: number) => {
          // Implement the deactivateDispositivo function here
          // For now, just log the id
          console.log(`Deactivate dispositivo with id: ${id}`);
        },
      }}
    >
      {children}
    </DispositivoContext.Provider>
  );
}

export function useDispositivo() {
  const context = useContext(DispositivoContext);
  if (!context) {
    throw new Error('useDispositivo must be used within a DispositivoProvider');
  }
  return context;
}
