import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AppContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  progress: Record<string, boolean>;
  markProgress: (key: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ADMIN_EMAILS = ['f33tfinder@sherlocked.com'];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('sherlocked_user');
    const savedSettings = localStorage.getItem('sherlocked_event_settings');
    const savedProgress = localStorage.getItem('sherlocked_progress');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedProgress) setProgress(JSON.parse(savedProgress));
  }, []);

  const login = (email: string, name: string) => {
    const isAdmin = ADMIN_EMAILS.map(e => e.toLowerCase()).includes(email.toLowerCase());
    const newUser = { email, name, isAdmin };
    setUser(newUser);
    localStorage.setItem('sherlocked_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sherlocked_user');
  };

  const markProgress = (key: string) => {
    const newProgress = { ...progress, [key]: true };
    setProgress(newProgress);
    localStorage.setItem('sherlocked_progress', JSON.stringify(newProgress));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        progress,
        markProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
