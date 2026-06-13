import React from 'react';
import { AuthProvider } from '../features/auth/contexts/AuthContext';
import { UIProvider } from './UIContext';
import { EventoProvider } from '../features/evento/contexts/EventoContext';

type Props = { children?: React.ReactNode };

export default function AppProviders({ children }: Props) {
  return (
    <AuthProvider>
      <EventoProvider>
        <UIProvider>{children}</UIProvider>
      </EventoProvider>
    </AuthProvider>
  );
}
