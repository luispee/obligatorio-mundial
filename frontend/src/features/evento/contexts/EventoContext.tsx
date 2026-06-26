import { useState, useEffect, createContext, ReactNode, useContext } from 'react';
import { fetchEventos, fetchFormEventoData } from '../api/eventoApi';
import { FormEventoResponse, GetFuncionariosBySectorResponse } from '../api/eventoResponses';
import { Evento, EventoSummary } from '../../../types/evento';
import { createEvento as createEventoApi } from '../api/eventoApi';
import { updateEvento as updateEventoApi } from '../api/eventoApi';
import { fetchEvento } from '../api/eventoApi';
import { CreateEventoRequest } from '../api/eventoRequests';
import { CreateEventoRequest as UpdateEventoRequest } from '../api/eventoRequests';
import { deactivateEvento as deactivateEventoApi } from '../api/eventoApi';
import { fetchFuncionariosBySector } from '../api/eventoApi';
import { asignarFuncionario as asignarFuncionarioApi } from '../api/eventoApi';
import { desvincularFuncionario as desvincularFuncionarioApi } from '../api/eventoApi';

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
  deactivateEvento: (id: number) => Promise<void>;
  getFuncionariosBySector: (
    eventoId: number,
    sectorId: number
  ) => Promise<GetFuncionariosBySectorResponse>;
  asignarFuncionario: (
    eventoId: number,
    sectorId: number,
    mail_funcionario: string,
    id_dispositivo: number
  ) => Promise<void>;
  desvincularFuncionario: (
    eventoId: number,
    sectorId: number,
    mail_funcionario: string
  ) => Promise<void>;
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

  const deactivateEvento = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deactivateEventoApi(id);
    } catch (e: any) {
      const message = e?.code || e?.message || 'Failed to deactivate evento';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const getFuncionariosBySector = async (
    eventoId: number,
    sectorId: number
  ): Promise<GetFuncionariosBySectorResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFuncionariosBySector(eventoId, sectorId);
      return response;
    } catch (e: any) {
      const message = e?.code || e?.message || 'Failed to fetch funcionarios';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const asignarFuncionario = async (
    eventoId: number,
    sectorId: number,
    mail_funcionario: string,
    id_dispositivo: number
  ) => {
    setLoading(true);
    setError(null);
    console.log('Asignando funcionario:', { eventoId, sectorId, mail_funcionario, id_dispositivo });
    try {
      await asignarFuncionarioApi(eventoId, sectorId, mail_funcionario, id_dispositivo);
    } catch (e: any) {
      const message = e?.code || e?.message || 'Failed to assign funcionario';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const desvincularFuncionario = async (
    eventoId: number,
    sectorId: number,
    mail_funcionario: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await desvincularFuncionarioApi(eventoId, sectorId, mail_funcionario);
    } catch (e: any) {
      const message = e?.code || e?.message || 'Failed to unassign funcionario';
      setError(message);
      throw e;
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
        deactivateEvento,
        getFuncionariosBySector,
        asignarFuncionario,
        desvincularFuncionario,
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
