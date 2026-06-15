import { useUI } from '../contexts/UIContext';
import { useAuth } from '../features/auth/contexts/AuthContext';
import ProfileDropdown from '../features/auth/components/ProfileDropdown';
import { LogoIcon } from '../icons/LogoIcon';
import { UserFilledIcon } from '../icons/UserFilledIcon';
import { UserIcon } from '../icons/UserIcon';
import { AppLayoutVariant } from '../types/appLayoutVariant';
import IconButton from './IconButton';
import { useRef, type RefObject } from 'react';

type HeaderProps = {
  variant: AppLayoutVariant;
};

export default function Header({ variant }: HeaderProps) {
  const profileIconRef: RefObject<HTMLDivElement | null> = useRef(null);
  const { isAdministrador, isAuthenticated } = useAuth();
  const { toggleDisplayProfile, displayProfile } = useUI();

  return (
    <>
      <header className="fixed left-0 top-0 z-20 bg-blue flex min-h-16 w-full items-center justify-between border-b px-8 py-2 text-white shadow-lg shadow-black">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => (window.location.href = '/')}
        >
          <LogoIcon className="h-16 w-16 md:h-20 md:w-20" />
          <h1 className="hidden md:flex text-3xl font-bold uppercase">
            Fifa World Cup 2026 Tickets
          </h1>
        </div>
        {variant === 'default' &&
          (!isAuthenticated ? (
            <a
              href="/login"
              className="text-white-900 hover:underline focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2 text-center"
            >
              Acceder
            </a>
          ) : (
            <div className="flex items-center gap-4">
              {isAdministrador && (
                <div className="flex items-center gap-4">
                  <a
                    href="/estadios"
                    className="text-white-900 hover:underline focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2 text-center"
                  >
                    Estadios
                  </a>
                  <a
                    href="/eventos/crear"
                    className="text-white-900 hover:underline focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2 text-center"
                  >
                    Agregar Evento
                  </a>
                </div>
              )}
              <IconButton
                icon={displayProfile ? <UserFilledIcon /> : <UserIcon />}
                onClick={() => toggleDisplayProfile()}
              />
            </div>
          ))}
      </header>

      <ProfileDropdown isOpen={displayProfile} parentRef={profileIconRef} />
    </>
  );
}
