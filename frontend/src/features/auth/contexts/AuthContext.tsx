import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { LoginResponse, RegisterFormDataResponse } from '../api/authResponses';
import { LoginRequest, RegisterRequest } from '../api/authRequests';
import { login as apiLogin } from '../api/authApi';
import { setAuthToken } from '../../../utils/httpClient';
import { getRegisterFormData as apiGetRegisterFormData } from '../api/authApi';
import { register as apiRegister } from '../api/authApi';
import { verifyUser as apiVerifyUser } from '../api/authApi';
import { VerifyUserRequest } from '../../evento/api/eventoRequests';

type AuthContextType = {
  isAuthenticated: boolean;
  user: LoginResponse['usuario'] | null;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
  isAdministrador: boolean;
  isCliente: boolean;
  isFuncionario: boolean;
  error: string | null;
  clearError: () => void;
  loading: boolean;
  getRegisterFormData: () => Promise<RegisterFormDataResponse>;
  register: (data: RegisterRequest) => Promise<any>;
  verifyUser: (data: VerifyUserRequest) => Promise<any>;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const clearError = useCallback(() => setError(''), []);
  const [token, setToken] = useState<string | null>(() => {
    const saved = localStorage.getItem('token');
    if (saved) setAuthToken(saved);
    return saved;
  });
  const [user, setUser] = useState<LoginResponse['usuario'] | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('token');

    if (savedToken) {
      setToken(savedToken);
      setAuthToken(savedToken);
    }
  }, []);

  const login = useCallback(async (req: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiLogin(req);

      setToken(res.token);
      setAuthToken(res.token);

      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.usuario));

      setUser(res.usuario);
    } catch (e: any) {
      const message = e?.code || e?.message || 'Login failed';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRegisterFormData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiGetRegisterFormData();
      return res;
    } catch (e: any) {
      const message = e?.code || e?.message || 'Failed to fetch register form data';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiRegister(data);
      return res;
    } catch (e: any) {
      const message = e?.code || e?.message || 'Failed to register';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setAuthToken(null);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, [logout]);

  const verifyUser = useCallback(async (data: VerifyUserRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiVerifyUser(data);
      return res;
    } catch (e: any) {
      const message = e?.code || e?.message || 'Failed to verify user';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const isAuthenticated = !!token;
  const isAdministrador = user?.role === 'ADMINISTRADOR';
  const isCliente = user?.role === 'CLIENTE';
  const isFuncionario = user?.role === 'FUNCIONARIO';

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isAdministrador,
        isCliente,
        isFuncionario,
        error,
        clearError,
        loading,
        getRegisterFormData,
        register,
        token,
        verifyUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}

export default AuthContext;
