import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Hero from './components/hero';
import ProductGrid from './components/productgrid';
import Features from './components/features';
import { AccountPage, AboutPage, CartPage, CategoryPage, ContactPage, NewProductsPage, PromotionsPage } from './pages/StorePages';

const readPath = () => window.location.pathname;

function App() {
  const [pathname, setPathname] = useState(readPath);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const onPopState = () => setPathname(readPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setPathname(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product) => setCart((current) => {
    const existing = current.find((item) => item.product.id === product.id);
    return existing
      ? current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...current, { product, quantity: 1 }];
  });
  const handleRemoveFromCart = (id) => setCart((current) => current.filter((item) => item.product.id !== id));
  const handleSearch = (value) => {
    setSearch(value);
    if (!['/', '/nouveautes', '/promotions'].includes(pathname) && !pathname.startsWith('/categories')) navigate('/');
  };

  let page;
  if (pathname === '/') {
    page = <><Hero onDiscover={() => navigate('/categories')} /><ProductGrid search={search} onSearch={setSearch} onAddToCart={handleAddToCart} /></>;
  } else if (pathname.startsWith('/categories')) {
    page = <CategoryPage path={pathname} search={search} onSearch={setSearch} onAddToCart={handleAddToCart} />;
  } else if (pathname === '/nouveautes') {
    page = <NewProductsPage search={search} onSearch={setSearch} onAddToCart={handleAddToCart} />;
  } else if (pathname === '/promotions') {
    page = <PromotionsPage search={search} onSearch={setSearch} onAddToCart={handleAddToCart} />;
  } else if (pathname === '/a-propos') {
    page = <AboutPage />;
  } else if (pathname === '/contact') {
    page = <ContactPage />;
  } else if (pathname === '/panier') {
    page = <CartPage cart={cart} onRemove={handleRemoveFromCart} onNavigate={navigate} />;
  } else if (pathname === '/compte') {
    page = <AccountPage />;
  } else {
    page = <section className="px-8 py-20 text-center"><h2 className="mb-3 text-3xl font-bold">Page introuvable</h2><a href="/" onClick={(event) => { event.preventDefault(); navigate('/'); }} className="text-yellow-700 underline">Retour à l’accueil</a></section>;
  }

  return (
      <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar onNavigate={navigate} onSearch={handleSearch} cartCount={cart.reduce((count, item) => count + item.quantity, 0)} pathname={pathname} />
      <main>{page}</main>
      <Features />
    </div>
  );
}

export default App;
