import { useEffect, useState } from 'react';

type PurchaseTimerProps = {
  initialSeconds: number;
  onExpire: () => void;
  stop?: boolean;
};

export default function TimerCompra({ initialSeconds, onExpire, stop }: PurchaseTimerProps) {
  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (stop) {
      return;
    }
    if (remaining <= 0) {
      onExpire();
      return;
    }
    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [remaining]);

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
      {remaining === 0 && <p className="text-sm text-red-500">Tu reserva ha expirado</p>}
    </div>
  );
}
