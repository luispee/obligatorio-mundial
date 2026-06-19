import { useEffect, useState } from 'react';

type TimerProps = {
  initialSeconds: number;
  onExpire?: () => void;
  stop?: boolean;

  expiredMessage?: string;
  resetKey?: number;
};

export default function TimerCompra({
  initialSeconds,
  onExpire,
  stop = false,
  resetKey,
  expiredMessage,
}: TimerProps) {
  const [remaining, setRemaining] = useState(initialSeconds);

  // reiniciar timer cuando cambie resetKey
  useEffect(() => {
    setRemaining(initialSeconds);
  }, [resetKey, initialSeconds]);

  useEffect(() => {
    if (stop) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        // llegó a 0
        if (prev <= 1) {
          clearInterval(interval);
          onExpire?.();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resetKey, stop]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const pct = (remaining / initialSeconds) * 100;

  const color =
    remaining <= 60 ? 'text-red-600' : remaining <= 180 ? 'text-yellow-500' : 'text-green-600';

  const barColor =
    remaining <= 60 ? 'bg-red-500' : remaining <= 180 ? 'bg-yellow-400' : 'bg-green-500';

  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-lg">
      <span className={`text-4xl font-medium tabular-nums ${color}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>

      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {remaining === 0 && <p className="text-sm text-red-500">{expiredMessage}</p>}
    </div>
  );
}
