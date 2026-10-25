import { Search, UserRound, ShoppingBag, Menu } from 'lucide-react';

const links = [['Nouveautés', '/nouveautes'], ['Vêtements', '/categories/Vêtements'], ['Chaussures', '/categories/Chaussures'], ['Sacs', '/categories/Sacs'], ['Accessoires', '/categories/Accessoires'], ['Bijoux', '/categories/Bijoux'], ['Promotions', '/promotions']];

export default function Navbar({ onNavigate, onSearch, cartCount = 0, pathname = '/' }) {
  const go = (event, path) => { event.preventDefault(); onNavigate(path); };
  return <header className="site-header">
    <div className="announcement">La nouvelle saison est arrivée <span>·</span> Livraison offerte dès 50 000 FCFA</div>
    <div className="header-main">
      <button className="mobile-menu icon-button" aria-label="Menu"><Menu /></button>
      <a href="/" onClick={(e) => go(e, '/')} className="wordmark">shop<span>.</span></a>
      <form className="header-search" onSubmit={(e) => { e.preventDefault(); onSearch(e.currentTarget.elements.search.value); }}>
        <Search size={18} /><input name="search" placeholder="Que recherchez-vous ?" aria-label="Rechercher un produit" /><button type="submit">Rechercher</button>
      </form>
      <div className="header-actions"><a href="/compte" onClick={(e) => go(e, '/compte')} aria-label="Mon compte"><UserRound /><span>Compte</span></a><a className="bag-link" href="/panier" onClick={(e) => go(e, '/panier')} aria-label={`Panier, ${cartCount} articles`}><ShoppingBag /><span>Panier</span>{cartCount > 0 && <b>{cartCount}</b>}</a></div>
    </div>
    <nav className="main-nav" aria-label="Catégories"><div className="nav-inner">{links.map(([label, path]) => <a key={path} href={path} onClick={(e) => go(e, path)} aria-current={pathname === path ? 'page' : undefined}>{label}</a>)}</div></nav>
  </header>;
}
