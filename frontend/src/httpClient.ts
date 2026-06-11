const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5001';

export async function request<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/api${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
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
    throw new Error(
      typeof payload === 'string'
        ? payload
        : (payload as { error?: string })?.error ?? `Request failed with status ${response.status}`
    );
  }

  return payload as T;
}

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}
