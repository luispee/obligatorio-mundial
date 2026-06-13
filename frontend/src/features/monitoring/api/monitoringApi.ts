import { request } from '../../../utils/httpClient';

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
