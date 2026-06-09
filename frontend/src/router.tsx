import Home from './pages/Home';
import { Monitoring } from './features/monitoring/pages/Monitoring';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import Login from './features/auth/pages/Login';
import NotFound from './pages/NotFound';
import Register from './features/auth/pages/Register';
import EventoDetail from './features/evento/pages/EventoDetail';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/events/:id',
        element: <EventoDetail />,
      },
    ],
  },
  {
    element: <AppLayout variant="auth" />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/monitoring',
    element: <Monitoring />,
  },
]);
