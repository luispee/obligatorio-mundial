import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { AppLayoutVariant } from '../types/appLayoutVariant';

type AppLayoutProps = {
  variant?: AppLayoutVariant;
};

export const AppLayout = ({ variant = 'default' }: AppLayoutProps) => {
  return (
    <div className="min-h-screen pt-28">
      <Header variant={variant} />
      <Outlet />
    </div>
  );
};
