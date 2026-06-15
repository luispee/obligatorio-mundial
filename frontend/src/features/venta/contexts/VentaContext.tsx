import { CreateVentaRequest } from '../api/ventaRequests';
import { createContext, ReactNode, useContext, useState } from 'react';
import { createVenta as createVentaApi } from '../api/ventaApi';
import { pagarVenta as pagarVentaApi } from '../api/ventaApi';
import { cancelarVenta as cancelarVentaApi } from '../api/ventaApi';
import { CreateVentaResponse, PagarVentaResponse } from '../api/ventaResponses';

type VentaContextType = {
  loading: boolean;
  error: string | null;
  clearError: () => void;
  createVenta: (data: CreateVentaRequest) => Promise<CreateVentaResponse>;
  pagarVenta: (id: number) => Promise<PagarVentaResponse>;
  cancelarVenta: (id: number) => Promise<void>;
  porcentaje_comision: number;
};

export const VentaContext = createContext<VentaContextType | undefined>(undefined);

export function VentaProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clearError = () => setError(null);
  const [porcentaje_comision, setPorcentajeComision] = useState<number>(0);

  const createVenta = async (data: CreateVentaRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createVentaApi(data);
      setPorcentajeComision(response.porcentaje_comision);
      return response;
    } catch (e: any) {
      const message = e?.code || e?.message || 'Error al crear la venta';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const pagarVenta = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await pagarVentaApi(id);
      return response;
    } catch (e: any) {
      const message = e?.code || e?.message || 'Error al pagar la venta';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const cancelarVenta = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await cancelarVentaApi(id);
    } catch (e: any) {
      const message = e?.code || e?.message || 'Error al cancelar la venta';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return (
    <VentaContext.Provider
      value={{
        loading,
        error,
        clearError,
        createVenta,
        pagarVenta,
        cancelarVenta,
        porcentaje_comision,
      }}
    >
      {children}
    </VentaContext.Provider>
  );
}

export function useVenta() {
  const context = useContext(VentaContext);
  if (!context) {
    throw new Error('useVenta must be used within a VentaProvider');
  }
  return context;
}
