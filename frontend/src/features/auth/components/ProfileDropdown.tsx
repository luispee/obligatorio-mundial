import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useUI } from '../../../contexts/UIContext';
import { useRef, useState, useEffect, type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../../../components/Button';

type Props = {
  isOpen: boolean;
  parentRef?: RefObject<HTMLDivElement | null>;
};

export default function ProfileDropdown({ isOpen, parentRef }: Props) {
  const { closeProfileDropdown } = useUI();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { user, logout, isCliente, isAdministrador } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const id = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(id);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  function handleTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget && !isOpen) setMounted(false);
  }

  useOnClickOutside(dropdownRef, (event) => {
    if (!parentRef || !parentRef.current) {
      closeProfileDropdown();
      return;
    }

    if (!parentRef.current.contains(event.target as Node)) {
      closeProfileDropdown();
    }
  });

  if (!mounted) return null;

  const handleLogout = () => {
    logout();
    closeProfileDropdown();
  };

  return (
    <div
      ref={dropdownRef}
      onTransitionEnd={handleTransitionEnd}
      className={`fixed right-0 top-20 md:top-24 min-w-[240px] 
        w-max bg-blue rounded-b-xl shadow-lg shadow-black p-2 z-10
        border border-transparent border-t-secondary/20
        transform motion-safe:transition-all 
        motion-safe:duration-300 motion-safe:ease-in-out 
        ${
          visible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-32 pointer-events-none'
        }`}
    >
      <div className="flex flex-col items-center p-2 space-y-4">
        <p className="text-white truncate max-w-[160px]">{user?.mail}</p>
        <Button
          text="Mi Perfil"
          onClick={() => navigate('/perfil')}
          color="white"
          textColor="blue"
        />
        {isAdministrador && (
          <Button
            text="Estadísticas"
            onClick={() => navigate('/estadisticas')}
            color="white"
            textColor="blue"
          />
        )}
        {isCliente && (
          <>
            <Button
              text="Mis Entradas"
              onClick={() => navigate('/mis-entradas')}
              color="white"
              textColor="blue"
            />
            <Button
              text="Transferencias"
              onClick={() => navigate('/transferencias')}
              color="white"
              textColor="blue"
            />

            <Button
              text="Mis Compras"
              onClick={() => navigate('/mis-compras')}
              color="white"
              textColor="blue"
            />
          </>
        )}
        <Button text="Cerrar Sesión" onClick={() => handleLogout()} color="red" />
      </div>
    </div>
  );
}
