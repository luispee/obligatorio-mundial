import GreenButton from '../../../components/GreenButton';
import Link from '../../../components/Link';
import AuthInput from '../components/AuthInput';

export default function Login() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <form className="flex flex-col gap-12 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray">
        <h1 className="text-center text-3xl font-bold text-gray-dark mb-6">Iniciar Sesión</h1>
        <AuthInput
          label="Correo Electrónico"
          type="email"
          placeholder="Ingresa tu correo electrónico"
          value={''}
          onChange={() => {}}
        />
        <AuthInput
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={''}
          onChange={() => {}}
        />
        <GreenButton text="Iniciar Sesión" onClick={() => {}} type="submit" />
        <p>
          ¿No tienes cuenta? <Link href="/register" text="Regístrate aquí" />
        </p>
      </form>
    </main>
  );
}
