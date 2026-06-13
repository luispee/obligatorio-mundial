import { ApiError } from '../types/apiError';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5001';

let authToken: string | null = null;
let isHandlingUnauthorized = false;

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
    if (response.status === 401 && !isHandlingUnauthorized) {
      isHandlingUnauthorized = true;

      window.dispatchEvent(new Event('unauthorized'));
    }

    throw new ApiError(
      response.status,
      typeof payload === 'string'
        ? payload
        : (payload as { error?: string })?.error ?? 'Request failed'
    );
  }

  return payload as T;
}

export function setAuthToken(token: string | null) {
  authToken = token;

  if (!token) {
    isHandlingUnauthorized = false;
  }
}
