import { request } from './httpClient';

export const getOrders = (token) => request('/orders', {
  headers: { Authorization: `Bearer ${token}` },
});

export const createOrder = (order, token) => request('/orders', {
  method: 'POST',
  headers: token ? { Authorization: `Bearer ${token}` } : {},
  body: JSON.stringify(order),
});

