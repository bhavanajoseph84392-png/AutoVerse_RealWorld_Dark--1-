import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, CarFront, CheckCircle2, ChevronRight, Gauge, Heart, ShieldCheck, Sparkles, Zap } from "lucide-react";

const budgets = [
  { id: "entry", range: "₹4 – 6 lakh", title: "Entry-level hatchbacks", desc: "Smart city cars for everyday drives.", min: 400000, max: 600000, icon: CarFront },
  { id: "compact", range: "₹6 – 9 lakh", title: "Compact hatchbacks or sub-compact SUVs", desc: "More space, features and road presence.", min: 600000, max: 900000, icon: Gauge },
  { id: "premium", range: "₹9 – 13 lakh", title: "Premium hatchbacks or entry-level sedans", desc: "A polished upgrade for modern drivers.", min: 900000, max: 1300000, icon: Sparkles },
  { id: "ideal", range: "₹13 – 20 lakh or more", title: "Sedans, compact SUVs, or EVs", desc: "Premium everyday mobility with more choice.", min: 1300000, max: 999999999, icon: Zap },
];

const featured = [
  { name: "Jaguar F-Type", type: "Performance coupe", price: "₹99.50 lakh", image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1000&q=85" },
  { name: "Range Rover Evoque", type: "Luxury SUV", price: "₹72.90 lakh", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85" },
  { name: "Tata Nexon", type: "Compact SUV", price: "₹8.15 lakh", image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85" },
];

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-backdrop" />
        <div className="hero-copy">
          <div className="hero-pill"><span /> AUTOVERSE SELECT • BUY • RENT • DRIVE</div>
          <p className="hero-kicker">THE ART OF THE DRIVE</p>
          <h1>Drive something<br /><em>worth remembering.</em></h1>
          <p className="hero-text">A modern showroom for everyday cars, premium SUVs and performance icons. Explore by budget, save your favourites, or rent a car for days or months.</p>
          <div className="hero-actions">
            <Link className="primary-button large" to="/cars">Explore cars <ArrowRight size={17} /></Link>
            <Link className="hero-link" to="/cars?minPrice=1300000&maxPrice=999999999">Explore premium <ChevronRight size={17} /></Link>
          </div>
          <div className="hero-points"><span><ShieldCheck size={16} /> Verified-style listings</span><span><CalendarDays size={16} /> Day & monthly rentals</span><span><Heart size={16} /> Dream Garage</span></div>
        </div>
        <div className="hero-image-panel">
          <img src="/hero-car.png" alt="Premium performance car" />
          <div className="hero-image-overlay" />
          <div className="hero-caption"><span>FEATURED DRIVE</span><strong>Performance, without compromise.</strong><small>From ₹13 lakh and up</small></div>
          <div className="hero-side-stat"><strong>30+</strong><span>cars to explore</span></div>
        </div>
      </section>

      <section className="trust-bar">
        <div><CheckCircle2 size={17} /><span>Curated collection</span></div>
        <div><ShieldCheck size={17} /><span>Transparent pricing</span></div>
        <div><CalendarDays size={17} /><span>Flexible rentals</span></div>
        <div><Heart size={17} /><span>Personal Dream Garage</span></div>
      </section>

      <section className="budget-section section-shell">
        <div className="section-heading centered"><p className="eyebrow">SHOP BY BUDGET</p><h2>Find your sweet spot</h2><p>Choose a budget band and AutoVerse filters the collection for you.</p></div>
        <div className="budget-grid">
          {budgets.map(({ id, range, title, desc, min, max, icon: Icon }) => (
            <Link key={id} to={`/cars?minPrice=${min}&maxPrice=${max}`} className="budget-card">
              <div className="budget-icon"><Icon size={21} /></div>
              <div><span className="budget-range">{range}</span><h3>{title}</h3><p>{desc}</p></div>
              <ArrowRight className="budget-arrow" size={18} />
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-section section-shell">
        <div className="section-heading-row"><div><p className="eyebrow">EDITOR'S PICKS</p><h2>Cars worth a closer look</h2></div><Link to="/cars" className="text-link">View all cars <ArrowRight size={15} /></Link></div>
        <div className="featured-grid">
          {featured.map((car) => <Link to="/cars" className="featured-card" key={car.name}><img src={car.image} alt={car.name} /><div className="featured-overlay" /><div className="featured-copy"><span>{car.type}</span><h3>{car.name}</h3><strong>From {car.price}</strong></div><ArrowRight className="featured-arrow" size={20} /></Link>)}
        </div>
      </section>

      <section className="brand-story section-shell">
        <div className="story-copy"><p className="eyebrow">WHY AUTOVERSE</p><h2>More than a catalogue. A better way to choose.</h2><p>Compare practical city cars with premium SUVs, EVs and Jaguar performance models in one polished showroom. Then switch from ownership to flexible rental whenever your plans change.</p><div className="story-actions"><Link to="/cars" className="primary-button">Explore the collection</Link><Link to="/signup" className="secondary-button">Join AutoVerse</Link></div></div>
        <div className="story-metrics"><div><strong>4</strong><span>budget zones</span></div><div><strong>2</strong><span>rental plans</span></div><div><strong>30+</strong><span>models</span></div><div><strong>1</strong><span>Dream Garage</span></div></div>
      </section>

      <section className="experience-strip section-shell">
        <div><div className="experience-icon"><CarFront /></div><div><strong>Everyday to exotic</strong><p>Hatchbacks, sedans, SUVs, EVs and performance cars.</p></div></div>
        <div><div className="experience-icon"><CalendarDays /></div><div><strong>Rent your way</strong><p>Book for a few days or settle in for several months.</p></div></div>
        <div><div className="experience-icon"><Heart /></div><div><strong>Build your garage</strong><p>Save cars you love and come back when you're ready.</p></div></div>
      </section>
    </div>
  );
}
export default Home;
