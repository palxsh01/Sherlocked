import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search } from 'lucide-react';

export function LandingPage() {
  const { login } = useApp();
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      login(email, name);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Fog Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="fog-layer fog-1"></div>
        <div className="fog-layer fog-2"></div>
        <div className="fog-layer fog-3"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Magnifying Glass Icon */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
          <Search className="w-24 h-24 text-primary relative z-10" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-8xl mb-6 text-center tracking-tight">
          Sherlocked
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 text-center max-w-2xl italic">
          "A murder has occurred on campus. The truth lies in the details."
        </p>

        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <p className="text-foreground/90 leading-relaxed">
            Sherlocked is an immersive, real-world murder mystery experience. Participants become detectives for three hours,
            investigating a chilling crime that has shaken the campus.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-sm">
            <div className="p-4 bg-card/50 border border-border rounded-lg backdrop-blur-sm">
              <div className="text-primary mb-2">Duration</div>
              <div className="text-foreground">3 Hours</div>
            </div>
            <div className="p-4 bg-card/50 border border-border rounded-lg backdrop-blur-sm">
              <div className="text-primary mb-2">Mode</div>
              <div className="text-foreground">On-campus Investigation</div>
            </div>
            <div className="p-4 bg-card/50 border border-border rounded-lg backdrop-blur-sm">
              <div className="text-primary mb-2">Objective</div>
              <div className="text-foreground">Solve the Murder</div>
            </div>
          </div>
        </div>

        {/* Login Button/Form */}
        {!showLogin ? (
          <button
            onClick={() => setShowLogin(true)}
            className="group relative px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <span className="relative flex items-center gap-2 font-medium">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Log In with Google
            </span>
          </button>
        ) : (
          <div className="w-full max-w-md p-8 bg-card border border-border rounded-lg backdrop-blur-sm">
            <h3 className="text-xl mb-4 text-center">Mock Google Login</h3>
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Enter any email and name to simulate login
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Tip: Use admin@sherlocked.com for admin access
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-lg"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="w-full px-6 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all rounded-lg"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Footer text */}
        <p className="mt-12 text-sm text-muted-foreground text-center max-w-2xl">
          The truth awaits those observant enough to find it
        </p>
      </div>

      {/* Fog Animation Styles */}
      <style>{`
        .fog-layer {
          position: absolute;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(232, 230, 227, 0.03) 0%, transparent 70%);
        }

        .fog-1 {
          animation: drift 20s infinite alternate ease-in-out;
          top: -50%;
          left: -50%;
        }

        .fog-2 {
          animation: drift 25s infinite alternate-reverse ease-in-out;
          top: -30%;
          left: -30%;
          animation-delay: -5s;
        }

        .fog-3 {
          animation: drift 30s infinite alternate ease-in-out;
          top: -40%;
          left: -40%;
          animation-delay: -10s;
        }

        @keyframes drift {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(10%, 10%) scale(1.1);
          }
          100% {
            transform: translate(-10%, 5%) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}
