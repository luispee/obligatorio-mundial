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
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/stadiums',
        element: (
          <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
            <Estadios />
          </ProtectedRoute>
        ),
      },
      {
        path: '/stadiums/create',
        element: (
          <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
            <CreateEstadio />
          </ProtectedRoute>
        ),
      },
      {
        path: '/stadiums/:id/edit',
        element: (
          <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
            <EditEstadio />
          </ProtectedRoute>
        ),
      },
      {
        path: 'events',
        children: [
          {
            path: 'create',
            element: (
              <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
                <CreateEvento />
              </ProtectedRoute>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
                <EditEvento />
              </ProtectedRoute>
            ),
          },
          {
            path: ':id',
            element: <EventoDetail />,
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
        path: '/register',
        element: <Register />,
      },
      {
        path: '/register/verify-mail',
        element: <VerifyMail />,
      },
    ],
  },
  {
    path: '/monitoring',
    element: <Monitoring />,
  },
]);
