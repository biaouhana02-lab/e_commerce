import { getProductCategories, getProducts } from '../../services/products';
import { demoCatalog, demoCategories } from './demo';

const source = import.meta.env.VITE_CATALOG_SOURCE || 'demo';

const matchesText = (product, search) => {
  if (!search) return true;
  const query = search.trim().toLocaleLowerCase('fr');
  return [product.name, product.brand, product.description, product.category, product.type]
    .some((field) => field?.toLocaleLowerCase('fr').includes(query));
};

function sortProducts(items, sort) {
  const sorted = [...items];
  switch (sort) {
    case 'price-asc': return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc': return sorted.sort((a, b) => b.price - a.price);
    case 'name': return sorted.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    case 'newest': return sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew) || a.name.localeCompare(b.name, 'fr'));
    default: return sorted.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  }
}

function listFromDemo({ search = '', category = '', isNew = false, onSale = false, availability = 'all', sort = 'name', page = 1, pageSize = 24 }) {
  const filtered = demoCatalog.filter((product) => (
    matchesText(product, search)
    && (!category || product.category === category)
    && (!isNew || product.isNew)
    && (!onSale || product.compareAtPrice > product.price)
    && (availability !== 'in-stock' || product.stock > 0)
    && (availability !== 'out-of-stock' || product.stock === 0)
  ));
  const ordered = sortProducts(filtered, sort);
  const start = (page - 1) * pageSize;
  return { items: ordered.slice(start, start + pageSize), total: ordered.length, page, pageSize };
}

export async function listProducts(filters = {}) {
  if (source === 'api') {
    const response = await getProducts(filters);
    const items = Array.isArray(response) ? response : response.items || [];
    return {
      items: items.map((product) => ({ ...product, image: product.image ?? product.imageUrl })),
      total: response.total ?? items.length,
      page: filters.page ?? 1,
      pageSize: filters.pageSize ?? 24,
    };
  }
  return listFromDemo(filters);
}

export async function getCategories() {
  if (source === 'api') return getProductCategories();
  return demoCategories;
}

