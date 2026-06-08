import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-5xl font-semibold uppercase tracking-[0.3em] text-red">404</p>
      <h1 className="mt-4 text-4xl font-bold text-gray-dark">Página no encontrada</h1>
      <p className="mt-4 max-w-xl text-lg text-gray-dark">
        La ruta que intentaste abrir no existe o ya no está disponible.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link to="/" className="green-button flex items-center">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
