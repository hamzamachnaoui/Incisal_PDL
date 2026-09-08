import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BadgeCheck,
  Clock3,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  PackageCheck,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  X
} from 'lucide-react';
import './styles.css';

const navItems = [
  ['Accueil', 'home'],
  ['À propos', 'about'],
  ['Services', 'services'],
  ['Offres', 'offers'],
  ['Galerie', 'gallery'],
  ['Contact', 'contact']
];

const services = [
  {
    title: 'Prothèse dentaire sur implants',
    image: '/img/service1.jpg',
    text: "Remplacement d'une ou plusieurs dents absentes avec des solutions stables, ajustées et conçues pour durer."
  },
  {
    title: 'Prothèses complètes',
    image: '/img/service2.jpg',
    text: 'Appareils complets pour restaurer la mastication, le confort et le sourire avec un contrôle précis de chaque étape.'
  },
  {
    title: 'Prothèses partielles',
    image: '/img/service3.png',
    text: "Solutions partielles pour améliorer la phonétique, la mastication et l'esthétique au quotidien."
  }
];

const offers = [
  ['Rapidité', 'Réponse courte, production maîtrisée et suivi clair.', Clock3],
  ['Livraison', 'Livraison organisée à Vendôme et dans les environs.', Truck],
  ['Suivi', 'Service après-vente disponible pour les ajustements.', PackageCheck],
  ['Fiabilité', 'Contrôle qualité avant chaque livraison.', ShieldCheck]
];

const metrics = [
  ['100%', 'Satisfaction'],
  ['100', 'Pièces par jour'],
  ['200', 'Clients réguliers'],
  ['1000+', 'Livraisons']
];

const gallery = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];

function useScrollReveal() {
  React.useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);
}

function revealClass(className = '', delay = 0) {
  return `reveal-on-scroll delay-${delay} ${className}`.trim();
}

function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Incisal P.D.L">
        <img src="/img/logo.png" alt="Incisal P.D.L" />
      </a>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {navItems.map(([label, anchor]) => (
          <a key={anchor} href={`#${anchor}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function NewsletterForm() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      setStatus(data.message);
      if (response.ok) setEmail('');
    } catch {
      setStatus("L'inscription est momentanément indisponible.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email">Abonnez-vous à la lettre d'Incisal P.D.L</label>
      <div className="field-row">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="votre@email.com"
          required
        />
        <button type="submit" disabled={loading} aria-label="Envoyer l'inscription">
          <Send size={18} />
        </button>
      </div>
      {status && <p className="form-status">{status}</p>}
    </form>
  );
}

function ContactForm() {
  const [status, setStatus] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus('');
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData))
      });
      const data = await response.json();
      setStatus(data.message);
      if (response.ok) event.currentTarget.reset();
    } catch {
      setStatus("Le message n'a pas pu être envoyé pour le moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input name="nom" placeholder="Nom" minLength="3" required />
      <input name="email" type="email" placeholder="E-mail" required />
      <input name="telephone" placeholder="Téléphone" minLength="8" required />
      <textarea name="message" rows="5" placeholder="Message" required />
      <button type="submit" disabled={loading}>
        <Mail size={18} />
        {loading ? 'Envoi...' : 'Envoyer le message'}
      </button>
      {status && <p className="form-status">{status}</p>}
    </form>
  );
}

function App() {
  useScrollReveal();

  return (
    <>
      <Header />
      <main>
        <section id="home" className="hero-section scene-section">
          <div className="hero-copy hero-reveal">
            <p className="eyebrow">Laboratoire de prothèse dentaire à Vendôme</p>
            <h1>Incisal P.D.L</h1>
            <p>
              Toutes prothèses dentaires, conçues avec précision, livrées avec rigueur et suivies par une équipe proche des praticiens.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#contact">Contacter le laboratoire</a>
              <a className="secondary-link" href="#services">Voir les services</a>
            </div>
          </div>
          <div className="hero-stage" aria-label="Aperçu 3D du laboratoire">
            <div className="orbit-ring" />
            <div className="hero-panel hero-card-back">
              <img src="/img/slider2.jpg" alt="Équipement de laboratoire dentaire" />
            </div>
            <div className="hero-panel hero-card-main">
              <img src="/img/slider1.jpg" alt="Prothèse dentaire Incisal P.D.L" />
              <div className="quality-badge">
                <BadgeCheck size={18} />
                Contrôle qualité avant livraison
              </div>
            </div>
            <div className="floating-chip chip-top">
              <HeartPulse size={18} />
              Précision laboratoire
            </div>
            <div className="floating-chip chip-bottom">
              <Sparkles size={18} />
              Finition soignée
            </div>
          </div>
        </section>

        <section id="about" className={revealClass('section about-grid')}>
          <div>
            <p className="eyebrow">À propos</p>
            <h2>Un laboratoire intégré pour garder la maîtrise de chaque sourire.</h2>
          </div>
          <div className="about-content">
            <p>
              Incisal P.D.L est spécialisée dans la fabrication de matériel médico-chirurgical et dentaire. Les prothèses sont conçues dans notre propre laboratoire afin de contrôler chaque étape sans intermédiaire.
            </p>
            <div className="pill-list">
              <span>Rapidité 100%</span>
              <span>Fiabilité 100%</span>
              <span>Disponibilité 100%</span>
              <span>Proximité 100%</span>
            </div>
          </div>
        </section>

        <section id="services" className={revealClass('section', 1)}>
          <div className="section-heading">
            <p className="eyebrow">Nos services</p>
            <h2>Des solutions adaptées aux besoins de chaque patient.</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card reveal-child" key={service.title}>
                <img src={service.image} alt={service.title} />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="offers" className={revealClass('section offer-section')}>
          <div className="section-heading compact">
            <p className="eyebrow">Ce que nous offrons</p>
            <h2>Un service pensé pour les cabinets qui ont besoin de précision et de réactivité.</h2>
          </div>
          <div className="offer-grid">
            {offers.map(([title, text, Icon]) => (
              <article className="offer-item reveal-child" key={title}>
                <Icon size={26} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={revealClass('metrics-band', 1)} aria-label="Chiffres clés">
          {metrics.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section id="gallery" className={revealClass('section gallery-section')}>
          <div className="section-heading compact">
            <p className="eyebrow">Galerie</p>
            <h2>Quelques réalisations du laboratoire.</h2>
          </div>
          <div className="gallery-grid">
            {gallery.map((image, index) => (
              <img className="reveal-child" key={image} src={`/img/portfolio/${image}`} alt={`Réalisation ${index + 1}`} />
            ))}
          </div>
        </section>

        <section className={revealClass('newsletter-section', 1)}>
          <Sparkles size={28} />
          <NewsletterForm />
        </section>

        <section id="contact" className={revealClass('section contact-section')}>
          <div className="contact-details">
            <p className="eyebrow">Contact</p>
            <h2>Parlons de votre prochain cas.</h2>
            <div className="contact-list">
              <p><Phone size={18} /> 0033 6 48 57 89 56</p>
              <p><Mail size={18} /> cabinetdentaire@example.com</p>
              <p><MapPin size={18} /> Vendôme, France</p>
              <p><Wrench size={18} /> Lundi-vendredi, 8h-17h</p>
            </div>
            <iframe
              title="Incisal P.D.L sur Google Maps"
              src="https://www.google.com/maps/embed?pb=!4v1559743384525!6m8!1m7!1sIlUvo9GyVaENL3QZJr-pVg!2m2!1d47.8034411605975!2d1.053820569324004!3f353.24596160481144!4f-3.335918501249097!5f0.7820865974627469"
              loading="lazy"
              allowFullScreen
            />
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="footer">
        <img src="/img/logo.png" alt="Incisal P.D.L" />
        <p>SARL P.D.L, Prothèse Dentaire Ligérienne. Tous les droits sont réservés.</p>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);