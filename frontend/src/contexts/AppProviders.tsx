import React from 'react';
import { AuthProvider } from '../features/auth/contexts/AuthContext';
import { UIProvider } from './UIContext';
import { EventoProvider } from '../features/evento/contexts/EventoContext';
import { EstadioProvider } from '../features/estadio/contexts/EstadioContext';
import { VentaProvider } from '../features/venta/contexts/VentaContext';
import { EntradaProvider } from '../features/entrada/contexts/EntradaContext';
import { EstadisticasProvider } from '../features/monitoring/contexts/EstadisticasContext';
import { DispositivoProvider } from '../features/dispositivo/contexts/DispositivoContext';
import { FuncionarioProvider } from '../features/funcionario/contexts/FuncionarioContext';

type Props = { children?: React.ReactNode };

export default function AppProviders({ children }: Props) {
  return (
    <AuthProvider>
      <EventoProvider>
        <EstadioProvider>
          <VentaProvider>
            <EntradaProvider>
              <EstadisticasProvider>
                <DispositivoProvider>
                  <FuncionarioProvider>
                    <UIProvider>{children}</UIProvider>
                  </FuncionarioProvider>
                </DispositivoProvider>
              </EstadisticasProvider>
            </EntradaProvider>
          </VentaProvider>
        </EstadioProvider>
      </EventoProvider>
    </AuthProvider>
  );
}
