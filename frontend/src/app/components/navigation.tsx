import { useApp } from '../context/AppContext';
import { Search, FileText, Users, BookOpen, Settings, LogOut, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { user, logout, eventSettings } = useApp();
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (!eventSettings.isActive || !eventSettings.endTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(eventSettings.endTime!);
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
  }, [eventSettings]);

  const navItems = [
    { id: 'evidence', label: 'Evidence Room', icon: FileText },
    { id: 'suspects', label: 'Suspects', icon: Users },
    { id: 'notebook', label: "Detective's Notebook", icon: BookOpen },
  ];

  if (user?.isAdmin) {
    navItems.unshift({ id: 'admin', label: 'Admin', icon: Settings });
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
            {eventSettings.endTime && (
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
        {eventSettings.isActive && eventSettings.endTime && (
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
