import { useEffect, useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { getCategories, listProducts } from '../data/catalog/catalogRepository';
import './catalog.css';

const pageSize = 24;
const formatPrice = (price) => `${new Intl.NumberFormat('fr-FR').format(price)} FCFA`;

const ProductGrid = ({
  onAddToCart,
  search = '',
  onSearch,
  category = '',
  isNew = false,
  onSale = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availability, setAvailability] = useState('all');
  const [sort, setSort] = useState(isNew ? 'newest' : 'name');
  const [pagination, setPagination] = useState({ key: '', page: 1 });
  const [categories, setCategories] = useState([]);
  const [result, setResult] = useState({ key: '', items: [], total: 0, error: '' });

  const activeCategory = category || selectedCategory;
  const filterKey = JSON.stringify({ search, category: activeCategory, isNew, onSale, availability, sort });
  const page = pagination.key === filterKey ? pagination.page : 1;
  const filters = { search, category: activeCategory, isNew, onSale, availability, sort, page, pageSize };
  const requestKey = JSON.stringify(filters);
  const loading = result.key !== requestKey;
  const items = loading ? [] : result.items;
  const total = loading ? 0 : result.total;
  const error = loading ? '' : result.error;
  const pageCount = Math.ceil(total / pageSize);

  useEffect(() => {
    let active = true;
    getCategories().then((items) => { if (active) setCategories(items); }).catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    listProducts({ ...filters, signal: controller.signal })
      .then((data) => setResult({ key: requestKey, items: data.items, total: data.total, error: '' }))
      .catch((cause) => {
        if (cause.name !== 'AbortError') setResult({ key: requestKey, items: [], total: 0, error: cause.message || 'Impossible de charger les produits.' });
      });
    return () => controller.abort();
  // Each filter is represented in requestKey; filters is derived from these values.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey]);

  const changeCategory = (value) => setSelectedCategory(value);
  const changeAvailability = (value) => setAvailability(value);
  const changeSort = (value) => setSort(value);
  const changePage = (nextPage) => setPagination({ key: filterKey, page: nextPage });

  return (
    <section className="catalog-section">
      <div className="section-heading">
        <div><p className="eyebrow">À découvrir</p><h2>Les pièces du moment</h2></div>
        <div className="catalog-meta"><span>Photos, marques, prix et stocks de démonstration</span><span aria-live="polite">{loading ? 'Chargement…' : `${total} article${total > 1 ? 's' : ''}`}</span></div>
      </div>

      <div className="catalog-filters">
        <form onSubmit={(event) => { event.preventDefault(); onSearch?.(event.currentTarget.elements.search.value); }} className="filter-search">
          <input name="search" defaultValue={search} key={search} placeholder="Rechercher dans la sélection…" aria-label="Rechercher dans le catalogue" />
          <button>Rechercher</button>
        </form>
        {!category && <label className="sr-only" htmlFor="product-category">Catégorie</label>}
        {!category && <select id="product-category" value={selectedCategory} onChange={(event) => changeCategory(event.target.value)} aria-label="Filtrer par catégorie"><option value="">Toutes les catégories</option>{categories.map((name) => <option key={name} value={name}>{name}</option>)}</select>}
        <select value={availability} onChange={(event) => changeAvailability(event.target.value)} aria-label="Filtrer par disponibilité"><option value="all">Toutes les disponibilités</option><option value="in-stock">En stock</option><option value="out-of-stock">Rupture de stock</option></select>
        <select value={sort} onChange={(event) => changeSort(event.target.value)} aria-label="Trier les produits"><option value="name">Trier : A à Z</option><option value="price-asc">Prix croissant</option><option value="price-desc">Prix décroissant</option><option value="newest">Nouveautés d’abord</option></select>
      </div>

      {loading && <p role="status" className="catalog-message">Chargement des produits…</p>}
      {!loading && error && <p role="alert" className="catalog-message error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="catalog-message">Aucun produit ne correspond à ces critères.</p>}
      {!loading && !error && items.length > 0 && <div className="product-grid">
        {items.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-visual">{product.compareAtPrice > product.price && <span className="sale-tag">À prix doux</span>}
              <button type="button" aria-label={`Ajouter ${product.name} aux favoris`} className="favorite-button"><Heart size={19} /></button>
              <img src={product.image} alt={product.name} loading="lazy" />
            </div>
            <div className="product-info"><p className="product-category">{product.category} <span>·</span> {product.type}</p>
              {product.brand && <p className="product-brand">{product.brand}</p>}
              <h3>{product.name}</h3><div className="product-prices"><strong>{formatPrice(product.price)}</strong>{product.compareAtPrice > product.price && <del>{formatPrice(product.compareAtPrice)}</del>}</div>
              <p className={`stock-note ${product.stock > 0 ? 'available' : 'unavailable'}`}>{product.stock > 0 ? 'En stock' : 'Épuisé'}</p>
              <button type="button" disabled={product.stock === 0} onClick={() => onAddToCart(product)} className="add-button"><ShoppingCart size={17} />Ajouter au panier</button>
            </div>
          </article>
        ))}
      </div>}

      {pageCount > 1 && !loading && !error && <nav aria-label="Pagination des produits" className="pagination">
        <button type="button" disabled={page <= 1} onClick={() => changePage(page - 1)} className="rounded border px-4 py-2 disabled:opacity-40">Précédent</button>
        <span className="text-sm text-gray-600">Page {page} sur {pageCount}</span>
        <button type="button" disabled={page >= pageCount} onClick={() => changePage(page + 1)} className="rounded border px-4 py-2 disabled:opacity-40">Suivant</button>
      </nav>}
    </section>
  );
};

export default ProductGrid;
