import Home from './pages/Home';
import { Monitoring } from './features/monitoring/pages/Monitoring';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import Login from './features/auth/pages/Login';
import NotFound from './pages/NotFound';
import Register from './features/auth/pages/Register';
import EventoDetail from './features/evento/pages/EventoDetail';
import VerifyMail from './features/auth/pages/VerifyMail';
import CreateEvento from './features/evento/pages/CreateEvento';
import ProtectedRoute from './components/ProtectedRoute';
import EditEvento from './features/evento/pages/EditEvento';
import Profile from './features/auth/pages/Profile';
import Estadios from './features/estadio/pages/Estadios';
import CreateEstadio from './features/estadio/pages/CreateEstadio';
import EditEstadio from './features/estadio/pages/EditEstadio';
import ConfirmarCompra from './features/venta/pages/ConfirmarCompra';
import Entradas from './features/entrada/pages/Entradas';
import Transferencias from './features/entrada/pages/Transferencias';

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
        path: '/perfil',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/mis-entradas',
        element: (
          <ProtectedRoute requiredRoles={['CLIENTE']}>
            <Entradas />
          </ProtectedRoute>
        ),
      },
      {
        path: '/transferencias',
        element: (
          <ProtectedRoute requiredRoles={['CLIENTE']}>
            <Transferencias />
          </ProtectedRoute>
        ),
      },
      {
        path: '/estadios',
        element: (
          <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
            <Estadios />
          </ProtectedRoute>
        ),
      },
      {
        path: '/estadios/crear',
        element: (
          <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
            <CreateEstadio />
          </ProtectedRoute>
        ),
      },
      {
        path: '/estadios/:id/editar',
        element: (
          <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
            <EditEstadio />
          </ProtectedRoute>
        ),
      },
      {
        path: '/confirmar-compra/:id',
        element: (
          <ProtectedRoute requiredRoles={['CLIENTE']}>
            <ConfirmarCompra />
          </ProtectedRoute>
        ),
      },
      {
        path: '/eventos',
        children: [
          {
            path: 'crear',
            element: (
              <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
                <CreateEvento />
              </ProtectedRoute>
            ),
          },
          {
            path: ':id/editar',
            element: (
              <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
                <EditEvento />
              </ProtectedRoute>
            ),
          },
          {
            path: ':id',
            element: (
              <ProtectedRoute requiredRoles={['CLIENTE']}>
                <EventoDetail />
              </ProtectedRoute>
            ),
          },
        ],
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
        path: '/registro',
        element: <Register />,
      },
      {
        path: '/registro/verificar-mail',
        element: <VerifyMail />,
      },
    ],
  },
  {
    path: '/monitoring',
    element: <Monitoring />,
  },
]);
