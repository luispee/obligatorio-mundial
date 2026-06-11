import { createContext, useContext, useMemo, useState } from 'react';

type UIContextType = {
  displayProfile: boolean;
  toggleDisplayProfile: () => void;
  closeProfileDropdown: () => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [displayProfile, setDisplayProfile] = useState(false);

  const toggleDisplayProfile = () => {
    setDisplayProfile((prev) => !prev);
  };

  const closeProfileDropdown = () => {
    setDisplayProfile(false);
  };

  return (
    <UIContext.Provider value={{ displayProfile, toggleDisplayProfile, closeProfileDropdown }}>
      {children}
    </UIContext.Provider>
  );
}
