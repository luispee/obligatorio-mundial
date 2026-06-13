import { MonitoringOption } from '../components/MonitoringOption';
import {
  generateMassiveInserts,
  startConcurrentConnections,
  startRollbackTest,
  startRowLockTest,
  startWaitingUpdatesTest,
  stopConcurrentConnections,
} from '../api/monitoringApi';

export const Monitoring: React.FC = () => {
  const monitoringOptions = [
    {
      title: 'Generar Inserts',
      description:
        'Generar una carga de inserts en la base de datos para observar su comportamiento.',
      actionLabel: 'Ejecutar',
      onExecute: generateMassiveInserts,
      showInsertAmountDropdown: true,
      dashboard: 1,
    },
    {
      title: 'Iniciar Conexiones Concurrentes',
      description: 'Iniciar 50 conexiones concurrentes para observar el rendimiento del sistema.',
      actionLabel: 'Ejecutar',
      onExecute: startConcurrentConnections,
      dashboard: 1,
    },
    {
      title: 'Cerrar Conexiones',
      description: 'Cerrar conexiones activas.',
      actionLabel: 'Ejecutar',
      onExecute: stopConcurrentConnections,
      dashboard: 1,
    },
    {
      title: 'Generar Inserts + Rollbacks',
      description:
        'Generar varias cargas de inserts en la base de datos y luego realizar rollbacks para observar su comportamiento.',
      actionLabel: 'Ejecutar',
      onExecute: startRollbackTest,
      dashboard: 2,
    },
    {
      title: 'Bloqueo de Fila',
      description:
        'Bloquear un registro específico en la tabla logs para observar el comportamiento de locks a nivel de registro.',
      actionLabel: 'Bloquear fila',
      onExecute: startRowLockTest,
      dashboard: 2,
    },
    {
      title: 'Generar Updates',
      description:
        'Lanzar múltiples updates concurrentes sobre el regsitro bloqueado para ver cómo se acumulan las esperas.',
      actionLabel: 'Lanzar updates',
      onExecute: startWaitingUpdatesTest,
      dashboard: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <header className="mb-10 flex flex-col gap-4 border-b border-slate-800 pb-8">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl text-center font-semibold uppercase tracking-[0.35em] text-cyan-400 sm:text-4xl">
              Monitoreo PoC
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg"></p>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {monitoringOptions.map((option) => (
            <MonitoringOption key={option.title} {...option} />
          ))}
        </section>

        <div className="mt-10 flex justify-center">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-950/30"
          >
            Ir a Grafana
          </a>
        </div>
      </div>
    </div>
  );
};
