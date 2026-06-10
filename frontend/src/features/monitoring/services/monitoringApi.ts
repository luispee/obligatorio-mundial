const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5001';

async function request(path: string, options: RequestInit = {}): Promise<string> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const rawBody = await response.text();
  let payload: unknown = rawBody;

  if (rawBody) {
    try {
      payload = JSON.parse(rawBody);
    } catch {
      payload = rawBody;
    }
  }

  if (!response.ok) {
    const errorMessage =
      typeof payload === 'string'
        ? payload
        : (payload as { error?: string })?.error ?? `Request failed with status ${response.status}`;

    throw new Error(errorMessage);
  }

  if (typeof payload === 'string') {
    return payload;
  }

  return (payload as { message?: string })?.message ?? 'Acción completada';
}

export function generateMassiveInserts(amount?: number) {
  return request(`/api/massive_inserts`, {
    method: 'POST',
    body: JSON.stringify({ amount }),
  });
}

export function startConcurrentConnections() {
  return request('/api/start_connections', { method: 'GET' });
}

export function stopConcurrentConnections() {
  return request('/api/stop_connections', { method: 'GET' });
}

export function startRollbackTest() {
  return request('/api/test_rollback', { method: 'GET' });
}

export function startTableLockTest() {
  return request('/api/test_table_lock', { method: 'GET' });
}

export function startRowLockTest() {
  return request('/api/test_row_lock', { method: 'GET' });
}

export function startWaitingUpdatesTest() {
  return request('/api/test_waiting_updates', { method: 'GET' });
}
