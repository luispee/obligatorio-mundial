import { useState } from 'react';
import Link from '../../../components/Link';
import AuthInput from '../../../components/Input';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';

export default function Login() {
  const [mail, setMail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const navigate = useNavigate();

  const { login, error, loading } = useAuth();

  const handleSubmit = async () => {
    try {
      await login({ mail, contrasena });

      navigate('/');
    } catch (err) {
      console.error('Error en login', err);
    }
  };

  return (
    <main className="mx-auto  flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <form
        className="flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1 className="text-center text-3xl font-bold text-gray-dark mb-6 uppercase">
          Iniciar Sesión
        </h1>
        <AuthInput
          label="Correo Electrónico"
          type="email"
          placeholder="Ingresa tu correo electrónico"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <AuthInput
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <p className="text-center text-red-500 min-h-[20px]">{error ?? ''}</p>
        <Button
          text={` ${loading ? 'Cargando...' : 'Iniciar Sesión'}`}
          type="submit"
          disabled={loading}
        />
        <p>
          ¿No tienes cuenta? <Link href="/register" text="Regístrate aquí" />
        </p>
      </form>
    </main>
  );
}
