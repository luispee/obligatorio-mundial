import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export const AppLayout = () => {
  return (
    <div className="min-h-screen pt-28">
      <Header />
      <Outlet />
    </div>
  );
};
