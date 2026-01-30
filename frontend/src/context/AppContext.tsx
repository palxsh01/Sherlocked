import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/axios';
import { type EventSettings } from '../lib/settingsInterface';
import axios from 'axios';

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
  settings: EventSettings | null;
  settingsLoading: boolean;
  refreshSettings: () => Promise<void>;
  isRateLimited: boolean;
  retryUntil: number | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ADMIN_EMAILS = ['f33tfinder@sherlocked.com'];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [settings, setSettings] = useState<EventSettings | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [retryUntil, setRetryUntil] = useState<number | null>(null);

  const fetchSettings = async (attempt = 0) => {
    try {
      const res = await api.get('/settings');
      setSettings(res.data?.[0] ?? null);
      setIsRateLimited(false);
      setRetryUntil(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        const header = error.response.headers['retry-after'];
        const retrySec = header ? Number(header) : (error.response.data?.retryAfter ?? null);

        const baseMs = retrySec ? retrySec * 1000 : Math.min(1000 * 2 ** attempt, 30000);

        const jitter = Math.floor(Math.random() * 500);
        const waitMs = Math.max(1000, baseMs) + jitter;

        setIsRateLimited(true);
        setRetryUntil(Date.now() + waitMs);

        setTimeout(() => fetchSettings(attempt + 1), waitMs);
        return;
      }

      console.log('Error in fetchSettings', error);
    } finally {
      setSettingsLoading(false);
    }
  };

  const refreshSettings = async () => {
    await fetchSettings();
  };

  // Load from localStorage on mount and fetch settings
  useEffect(() => {
    const savedUser = localStorage.getItem('sherlocked_user');
    const savedProgress = localStorage.getItem('sherlocked_progress');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedProgress) setProgress(JSON.parse(savedProgress));

    fetchSettings();
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
        settings,
        settingsLoading,
        refreshSettings,
        isRateLimited,
        retryUntil
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
