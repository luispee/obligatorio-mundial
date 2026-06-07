import React from 'react';

type Props = { children?: React.ReactNode };

export default function AppProviders({ children }: Props) {
  return <>{children}</>;
}
