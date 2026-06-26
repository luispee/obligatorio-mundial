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
import Ventas from './features/venta/pages/Ventas';
import Funcionario from './features/entrada/pages/Funcionario';
import Estadisticas from './features/monitoring/pages/Estadisticas';
import FuncionariosSector from './features/evento/pages/FuncionariosSector';
import Dispositivos from './features/dispositivo/pages/Dispositivos';
import Funcionarios from './features/funcionario/pages/Funcionarios';
import CreateFuncionario from './features/funcionario/pages/CreateFuncionario';
import UpdateFuncionario from './features/funcionario/pages/UpdateFuncionario';

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
        path: '/funcionario',
        element: (
          <ProtectedRoute requiredRoles={['FUNCIONARIO']}>
            <Funcionario />
          </ProtectedRoute>
        ),
      },
      {
        path: '/estadisticas',
        element: (
          <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
            <Estadisticas />
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
        path: '/mis-compras',
        element: (
          <ProtectedRoute requiredRoles={['CLIENTE']}>
            <Ventas />
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
        path: '/dispositivos',
        element: (
          <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
            <Dispositivos />
          </ProtectedRoute>
        ),
      },
      {
        path: '/funcionarios',
        element: (
          <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
            <Funcionarios />
          </ProtectedRoute>
        ),
      },
      {
        path: '/funcionarios/crear',
        element: (
          <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
            <CreateFuncionario />
          </ProtectedRoute>
        ),
      },
      {
        path: '/funcionarios/:mail/editar',
        element: (
          <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
            <UpdateFuncionario />
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
            path: ':id/editar/sectores/:sectorId/funcionarios',
            element: (
              <ProtectedRoute requiredRoles={['ADMINISTRADOR']}>
                <FuncionariosSector />
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
