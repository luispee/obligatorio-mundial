import { useState, useEffect, createContext, ReactNode, useContext } from 'react';
import { fetchEventos, fetchFormEventoData } from '../api/eventoApi';
import { FormEventoResponse } from '../api/eventoResponses';
import { Evento, EventoSummary } from '../../../types/evento';
import { createEvento as createEventoApi } from '../api/eventoApi';
import { updateEvento as updateEventoApi } from '../api/eventoApi';
import { fetchEvento } from '../api/eventoApi';
import { CreateEventoRequest } from '../api/eventoRequests';
import { CreateEventoRequest as UpdateEventoRequest } from '../api/eventoRequests';

type EventoContextType = {
  loading: boolean;
  error: string | null;
  getFormData: () => Promise<FormEventoResponse | null>;
  createEvento: (form: CreateEventoRequest) => Promise<void>;
  updateEvento: (id: number, form: UpdateEventoRequest) => Promise<void>;
  eventoList: EventoSummary[];
  clearError: () => void;
  getEventos: () => Promise<void>;
  getEvento: (id: number) => Promise<Evento | null>;
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
      await createEventoApi(form);
    } catch (e: any) {
      const message = e?.code || e?.message || 'Login failed';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const updateEvento = async (id: number, form: UpdateEventoRequest) => {
    setLoading(true);
    setError(null);
    try {
      await updateEventoApi(id, form);
    } catch (e: any) {
      const message = e?.code || e?.message || 'Login failed';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const getEventos = async () => {
    setLoading(true);
    setError(null);
    try {
      const eventos = await fetchEventos();
      setEventoList(eventos);
    } catch (e: any) {
      const message = e?.code || e?.message || 'Failed to fetch eventos';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const getEvento = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const evento = await fetchEvento(id);
      return evento;
    } catch (e: any) {
      const message = e?.code || e?.message || 'Failed to fetch evento';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <EventoContext.Provider
      value={{
        loading,
        error,
        getFormData,
        createEvento,
        updateEvento,
        eventoList,
        clearError,
        getEventos,
        getEvento,
      }}
    >
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
