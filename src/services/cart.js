import { request } from './httpClient';

export const getCart = (token) => request('/cart', {
  headers: { Authorization: `Bearer ${token}` },
});

export const addToCart = (productId, quantity = 1, token) => request('/cart/items', {
  method: 'POST',
  headers: token ? { Authorization: `Bearer ${token}` } : {},
  body: JSON.stringify({ productId, quantity }),
});

