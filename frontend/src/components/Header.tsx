import { LogoIcon } from '../icons/LogoIcon';

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-20 bg-blue flex min-h-16 w-full items-center justify-between border-b px-8 py-2 text-white shadow-lg shadow-black">
      <div className="flex items-center gap-4">
        <LogoIcon className="h-20 w-20" />
        <h1 className="hidden md:flex text-3xl font-bold">Fifa World Cup 2026 Tickets</h1>
      </div>
      <a
        href="/login"
        className="text-white-900 hover:underline focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2 text-center"
      >
        Acceder
      </a>
    </header>
  );
}
