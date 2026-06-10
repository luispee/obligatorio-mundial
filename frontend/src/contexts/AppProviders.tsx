import React from 'react';
import { AuthProvider } from '../features/auth/contexts/AuthContext';
import { UIProvider } from './UIContext';

type Props = { children?: React.ReactNode };

export default function AppProviders({ children }: Props) {
  return (
    <AuthProvider>
      <UIProvider>{children}</UIProvider>
    </AuthProvider>
  );
}
