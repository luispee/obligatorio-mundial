import React from 'react';
import { AuthProvider } from '../features/auth/contexts/AuthContext';
import { UIProvider } from './UIContext';
import { EventoProvider } from '../features/evento/contexts/EventoContext';
import { EstadioProvider } from '../features/estadio/contexts/EstadioContext';

type Props = { children?: React.ReactNode };

export default function AppProviders({ children }: Props) {
  return (
    <AuthProvider>
      <EventoProvider>
        <EstadioProvider>
          <UIProvider>{children}</UIProvider>
        </EstadioProvider>
      </EventoProvider>
    </AuthProvider>
  );
}
