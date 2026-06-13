import { useAuth } from '../features/auth/contexts/AuthContext';
import NotFound from '../pages/NotFound';
import type { Role } from '../types/role';
import { isTokenExpired } from '../utils/jwt';

type Props = {
  children: React.ReactNode;
  requiredRoles?: Role[];
};
export default function ProtectedRoute({ children, requiredRoles }: Props) {
  const { user, token, logout } = useAuth();

  if (!token || isTokenExpired(token)) {
    logout();
    return <NotFound />;
  }

  if (requiredRoles && !requiredRoles.includes(user?.role)) {
    return <NotFound />;
  }
  return <>{children}</>;
}
