import { Truck, ShieldCheck, Headphones, RotateCcw } from 'lucide-react';

const Features = () => {
  const items = [
    { icon: <Truck />, title: "Livraison soignée", desc: "Suivi de votre commande" },
    { icon: <ShieldCheck />, title: "Paiement sécurisé", desc: "Vos achats en confiance" },
    { icon: <Headphones />, title: "À votre écoute", desc: "Une équipe disponible" },
    { icon: <RotateCcw />, title: "Retours faciles", desc: "14 jours pour changer d’avis" },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-benefits">
        {items.map((item, idx) => (
          <div key={idx} className="footer-benefit">
            <div>{item.icon}</div>
            <div>
              <strong>{item.title}</strong>
              <span>{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="footer-bottom"><strong>shop.</strong><span>Mode, chaussures & belles choses · © 2026 shop.</span><a href="/contact">Nous contacter</a></div>
    </footer>
  );
};

export default Features;
