import React from 'react';
import { AuthProvider } from '../features/auth/contexts/AuthContext';
import { UIProvider } from './UIContext';
import { EventoProvider } from '../features/evento/contexts/EventoContext';
import { EstadioProvider } from '../features/estadio/contexts/EstadioContext';
import { VentaProvider } from '../features/venta/contexts/VentaContext';

type Props = { children?: React.ReactNode };

export default function AppProviders({ children }: Props) {
  return (
    <AuthProvider>
      <EventoProvider>
        <EstadioProvider>
          <VentaProvider>
            <UIProvider>{children}</UIProvider>
          </VentaProvider>
        </EstadioProvider>
      </EventoProvider>
    </AuthProvider>
  );
}
