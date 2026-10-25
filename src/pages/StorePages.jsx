import { useState } from 'react';
import ProductGrid from '../components/productgrid';

const PageShell = ({ eyebrow, title, children }) => (
  <section className="page-shell">
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="page-title">{title}</h2>
      {children}
    </div>
  </section>
);

export function CategoryPage({ path, search, onSearch, onAddToCart }) {
  const category = decodeURIComponent(path.split('/')[2] || '');

  return (
    <>
      <PageShell eyebrow="Explorer" title={category || 'Nos catégories'}>
        <p className="max-w-2xl text-lg text-gray-600">Parcourez la sélection shop. et filtrez les produits selon vos envies.</p>
      </PageShell>
      <ProductGrid category={category} search={search} onSearch={onSearch} onAddToCart={onAddToCart} />
    </>
  );
}

export function NewProductsPage({ search, onSearch, onAddToCart }) {
  return <><PageShell eyebrow="Tout juste arrivés" title="Nouveautés"><p className="max-w-2xl text-lg text-gray-600">Produits marqués comme nouveaux dans le catalogue de démonstration.</p></PageShell><ProductGrid isNew search={search} onSearch={onSearch} onAddToCart={onAddToCart} /></>;
}

export function PromotionsPage({ search, onSearch, onAddToCart }) {
  return <><PageShell eyebrow="Les bons plans shop." title="Promotions"><p className="max-w-2xl text-lg text-gray-600">Vos pièces préférées à prix doux.</p></PageShell><ProductGrid onSale search={search} onSearch={onSearch} onAddToCart={onAddToCart} /></>;
}

export function AboutPage() {
  return <PageShell eyebrow="Notre histoire" title="À propos de shop."><div className="max-w-3xl space-y-5 text-lg leading-relaxed text-gray-700"><p>shop. est une boutique en ligne pensée pour rendre la mode, les chaussures et les accessoires faciles à découvrir.</p><p>Le catalogue de démonstration est local. Les services API sont prêts à être reliés à votre backend.</p></div></PageShell>;
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return <PageShell eyebrow="Nous contacter" title="Parlons de votre projet"><div className="grid gap-10 md:grid-cols-2"><div className="text-gray-700"><p className="mb-4 text-lg">Une question sur shop. ? Retrouvez ici le formulaire de contact de la boutique.</p><p>Les coordonnées et l’envoi des messages pourront être reliés au backend lors de son installation.</p></div><form className="space-y-4 rounded-lg bg-white p-6 shadow-sm" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label className="block text-sm font-medium">Votre nom<input required className="mt-1 w-full rounded border border-gray-300 p-3" /></label><label className="block text-sm font-medium">Votre adresse e-mail<input required type="email" className="mt-1 w-full rounded border border-gray-300 p-3" /></label><label className="block text-sm font-medium">Votre message<textarea required rows="4" className="mt-1 w-full rounded border border-gray-300 p-3" /></label><button className="rounded bg-black px-5 py-3 font-bold text-white hover:bg-gray-800">Envoyer</button>{submitted && <p role="status" className="text-sm text-yellow-800">Formulaire de démonstration : aucun message n’a été envoyé.</p>}</form></div></PageShell>;
}

export function AccountPage() {
  return <PageShell eyebrow="Espace client" title="Mon compte"><div className="max-w-lg rounded-lg bg-white p-6 shadow-sm"><p className="mb-5 text-gray-600">Connectez-vous pour retrouver vos commandes et vos informations personnelles.</p><form className="space-y-4" onSubmit={(event) => event.preventDefault()}><label className="block text-sm font-medium">Adresse e-mail<input type="email" className="mt-1 w-full rounded border border-gray-300 p-3" /></label><label className="block text-sm font-medium">Mot de passe<input type="password" className="mt-1 w-full rounded border border-gray-300 p-3" /></label><button type="button" className="rounded bg-black px-5 py-3 font-bold text-white">Connexion bientôt disponible</button></form></div></PageShell>;
}

export function CartPage({ cart, onRemove, onNavigate }) {
  return <PageShell eyebrow="Votre sélection" title="Panier">{cart.length === 0 ? <div className="rounded-lg bg-white p-8 text-gray-600">Votre panier est vide. <a href="/categories" onClick={(event) => { event.preventDefault(); onNavigate('/categories'); }} className="ml-1 font-semibold text-yellow-700 underline">Découvrir les produits</a></div> : <div className="space-y-4">{cart.map(({ product, quantity }) => <article key={product.id} className="flex items-center gap-5 rounded-lg bg-white p-4"><img src={product.image} alt="" className="h-20 w-20 object-contain" /><div className="flex-1"><h3 className="font-bold">{product.name}</h3><p className="text-gray-600">{new Intl.NumberFormat('fr-FR').format(product.price)} FCFA · Quantité : {quantity}</p></div><button onClick={() => onRemove(product.id)} className="text-sm text-red-700 underline">Retirer</button></article>)}<p className="text-sm text-gray-500">Panier local de démonstration : prix et stocks fictifs, commande non connectée au backend.</p></div>}</PageShell>;
}

