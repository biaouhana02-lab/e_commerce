import { request } from './httpClient';

export const login = (credentials) => request('/auth/login', {
  method: 'POST',
  body: JSON.stringify(credentials),
});

export const getCurrentUser = (token) => request('/auth/me', {
  headers: { Authorization: `Bearer ${token}` },
});

