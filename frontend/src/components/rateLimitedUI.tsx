import { TimerIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const RateLimitedUI = () => {
  const { retryUntil } = useApp();

  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!retryUntil) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((retryUntil - Date.now()) / 1000));
      setSecondsLeft(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [retryUntil]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <TimerIcon className="size-10 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">This is taking longer than expected...</h3>
            <p className='text-base-content mb-1'>
              Your request should be processed in {secondsLeft} seconds.
            </p>
            <p className='text-sm text-base-content/70'>
            We appreciate your patience and request you to please hold on.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;