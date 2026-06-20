import { createContext, useContext } from 'react';
import { fetchEstadisticas } from '../api/estadisticasApi';
type EstadisticasContextType = {
  getEstadisticas: () => Promise<any>;
};

const EstadisticasContext = createContext<EstadisticasContextType | undefined>(undefined);

export function EstadisticasProvider({ children }: { children: React.ReactNode }) {
  const getEstadisticas = async (): Promise<any> => {
    return await fetchEstadisticas();
  };

  return (
    <EstadisticasContext.Provider value={{ getEstadisticas }}>
      {children}
    </EstadisticasContext.Provider>
  );
}

export function useEstadisticas() {
  const context = useContext(EstadisticasContext);
  if (context === undefined) {
    throw new Error('useEstadisticas debe ser usado dentro de un EstadisticasProvider');
  }
  return context;
}

export default EstadisticasContext;
