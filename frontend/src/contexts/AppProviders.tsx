import React from 'react';
import { AuthProvider } from '../features/auth/contexts/AuthContext';
import { UIProvider } from './UIContext';
import { EventoProvider } from '../features/evento/contexts/EventoContext';
import { EstadioProvider } from '../features/estadio/contexts/EstadioContext';
import { VentaProvider } from '../features/venta/contexts/VentaContext';
import { EntradaProvider } from '../features/entrada/contexts/EntradaContext';

type Props = { children?: React.ReactNode };

export default function AppProviders({ children }: Props) {
  return (
    <AuthProvider>
      <EventoProvider>
        <EstadioProvider>
          <VentaProvider>
            <EntradaProvider>
              <UIProvider>{children}</UIProvider>
            </EntradaProvider>
          </VentaProvider>
        </EstadioProvider>
      </EventoProvider>
    </AuthProvider>
  );
}
