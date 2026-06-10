import { useState } from 'react';

interface MonitoringOptionProps {
  title: string;
  description: string;
  actionLabel?: string;
  onExecute?: (amount?: number) => Promise<string> | unknown;
  showInsertAmountDropdown?: boolean;
  dashboard?: number;
}

export const MonitoringOption: React.FC<MonitoringOptionProps> = ({
  title,
  description,
  actionLabel = 'Ejecutar',
  onExecute,
  showInsertAmountDropdown = false,
  dashboard = 1,
}) => {
  const [insertAmount, setInsertAmount] = useState('500');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleExecute = async () => {
    if (!onExecute || isLoading) {
      return;
    }

    setIsLoading(true);
    setStatusMessage('');

    try {
      const result = await onExecute(showInsertAmountDropdown ? Number(insertAmount) : undefined);
      setStatusMessage(String(result));
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'No se pudo completar la acción');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40 ring-1 ring-white/5 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-cyan-950/20">
      <span className="absolute right-6 top-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
        Dashboard {dashboard === 1 ? '1' : '2'}
      </span>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 pr-20">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-sm leading-6 text-slate-300">{description}</p>
        </div>

        {showInsertAmountDropdown ? (
          <label className="block space-y-2 pt-2">
            <span className="text-sm font-medium text-slate-300">Cantidad de inserts</span>
            <select
              name="insertAmount"
              value={insertAmount}
              onChange={(event) => setInsertAmount(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            >
              <option value="500">500</option>
              <option value="1000">1000</option>
              <option value="5000">5000</option>
              <option value="10000">10000</option>
            </select>
          </label>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
        <span className="text-sm text-slate-400">
          {showInsertAmountDropdown ? `Seleccionado: ${insertAmount}` : null}
        </span>
        <button
          type="button"
          onClick={handleExecute}
          disabled={isLoading || !onExecute}
          className="inline-flex items-center rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-700 disabled:text-slate-200"
        >
          {isLoading ? 'Ejecutando...' : actionLabel}
        </button>
      </div>

      {statusMessage ? (
        <p className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-200">
          {statusMessage}
        </p>
      ) : null}
    </article>
  );
};
