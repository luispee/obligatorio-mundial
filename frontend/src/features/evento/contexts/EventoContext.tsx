import { useState, useEffect, createContext, ReactNode, useContext } from 'react';
import { fetchFormEventoData } from '../api/eventoApi';
import { FormEventoResponse } from '../api/eventoResponses';
import { EventoSummary } from '../../../types/evento';

type EventoContextType = {
  loading: boolean;
  error: string | null;
  getFormData: () => Promise<FormEventoResponse | null>;
  createEvento: (form: CreateEventoRequest) => Promise<void>;
  eventoList: EventoSummary[];
};

export const EventoContext = createContext<EventoContextType | undefined>(undefined);

export function EventoProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eventoList, setEventoList] = useState<EventoSummary[]>([]);

  const getFormData = async (): Promise<FormEventoResponse | null> => {
    try {
      const data = await fetchFormEventoData();
      return data;
    } catch (err) {
      return null;
    } finally {
    }
  };

  const createEvento = async (form: CreateEventoRequest) => {
    setLoading(true);
    setError(null);
    try {
      if (form.codigo_seleccion_local === form.codigo_seleccion_visitante) {
        setError('La selección local y visitante no pueden ser la misma');
        return;
      }
      console.log('Creando evento con datos:', form);
      // Aquí iría la lógica para crear el evento, por ejemplo, una llamada a la API
    } catch (err) {
      setError('Error al crear el evento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventoContext.Provider value={{ loading, error, getFormData, createEvento, eventoList }}>
      {children}
    </EventoContext.Provider>
  );
}

export function useEvento() {
  const context = useContext(EventoContext);
  if (!context) {
    throw new Error('useEvento must be used within an EventoProvider');
  }
  return context;
}
