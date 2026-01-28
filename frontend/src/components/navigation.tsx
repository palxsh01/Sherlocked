import { useApp } from '../context/AppContext';
import { Search, FileText, Users, BookOpen, Settings, LogOut, Clock, LoaderIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../lib/axios';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface Settings {
  isActive: boolean;
  startTime: string;
  endTime: string;
  remainingDuration: number;
  currentPhase: number;
  maxPhases: number;
}

export function Navigation({ currentPage, onNavigate } : NavigationProps) {
  const { user, logout } = useApp();
  const [settings, setSettings] = useState<Settings[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings");
      console.log(res.data);
      setSettings(res.data); //Settings array will only contain one object, hence using settings[0] henceforth.
    } catch (error) {
      console.log("Error in fetchSettings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchSettings();
  }, []);

  useEffect(() => {
    if (!settings.length || !settings[0].isActive || !settings[0].endTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(settings[0].endTime);
      const diff = end.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining('Event Ended');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [settings]);

  const navItems = [
    { id: 'evidence', label: 'Evidence Room', icon: FileText },
    { id: 'suspects', label: 'Suspects', icon: Users },
    { id: 'notebook', label: "Detective's Notebook", icon: BookOpen },
  ];

  if (user?.isAdmin) {
    navItems.unshift({ id: 'admin', label: 'Admin', icon: Settings });
  }

   if (loading || !settings.length) {
      return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
          <LoaderIcon className="animate-spin size-10" />
        </div>
      );
    }

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('evidence')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Search className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold">Sherlocked</span>
          </button>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Countdown Timer */}
            {settings[0].startTime && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">{timeRemaining}</span>
              </div>
            )}

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <div className="hidden md:block text-right">
                <div className="text-sm">{user?.name}</div>
                <div className="text-xs text-muted-foreground">{user?.email}</div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-1 pb-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap text-sm ${
                  currentPage === item.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Timer */}
        {settings[0].isActive && settings[0].endTime && (
          <div className="md:hidden pb-2">
            <div className="flex items-center justify-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{timeRemaining}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}