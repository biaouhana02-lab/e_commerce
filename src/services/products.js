import { request } from './httpClient';

export const getProducts = ({ search, category, availability, sort, page, pageSize, isNew, onSale, signal } = {}) => {
  const query = new URLSearchParams();
  if (search?.trim()) query.set('search', search.trim());
  if (category) query.set('category', category);
  if (availability && availability !== 'all') query.set('availability', availability);
  if (sort) query.set('sort', sort);
  if (page) query.set('page', String(page));
  if (pageSize) query.set('pageSize', String(pageSize));
  if (isNew) query.set('isNew', 'true');
  if (onSale) query.set('onSale', 'true');
  const suffix = query.size ? `?${query}` : '';
  return request(`/products${suffix}`, { signal });
};

export const getProductCategories = () => request('/categories');

