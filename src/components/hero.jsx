import heroImage from '../public/assets/hero.png';

export default function Hero({ onDiscover }) {
  return <section className="hero">
    <img className="hero-image" src={heroImage} alt="Silhouettes en tenues de saison" />
    <div className="hero-shade" />
    <div className="hero-copy"><p className="eyebrow">La collection printemps · été</p><h1>Le style<br />vous va si bien.</h1><p>Les belles pièces du quotidien, choisies pour vous.</p><button className="button button-light" onClick={onDiscover}>Découvrir la collection <span>↗</span></button></div>
    <div className="hero-count"><span>01</span> / 04</div>
  </section>;
}
