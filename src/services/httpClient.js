import { API_BASE_URL } from './apiConfig';

export async function request(path, { headers = {}, ...options } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
  });

  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const error = new Error(body?.message || `Erreur API (${response.status})`);
    error.status = response.status;
    error.body = body;
    throw error;
  }

  return body;
}

