import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 🖼 Import local images
import apartmentImg from '../assets/images/service1.jpg';
import carImg from '../assets/images/service2.jpg';
import jetImg from '../assets/images/service3.jpg';
import venueImg from '../assets/images/event-venue.jpg';
import securityImg from '../assets/images/security-guards.jpg';
import investmentImg from '../assets/images/investment-opportunity.jpg';

// 🔹 Cards data
const whereCards = [
  { title: 'Short let Apartments', img: apartmentImg },
  { title: 'Vehicle Rentals', img: carImg },
  { title: 'Private Jet Charters', img: jetImg },
];

const discover = [
  { title: 'Event Venues', img: venueImg },
  { title: 'Security Vanguard', img: securityImg },
  { title: 'Investments', img: investmentImg },
];

// 🔹 Card component with hover/animation polish
function Card({ item }) {
  // Wrap the card in a Link so users can navigate to the listings page with a query
  const to = `/listings?q=${encodeURIComponent(item.title)}`;
  return (
    <Link to={to} aria-label={item.title} className="block">
      <article
        className="surface rounded-lg overflow-hidden shadow-sm transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
      >
        <div
          className="h-44 md:h-40 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${item.img})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-90 transition-opacity duration-300 hover:opacity-100" />
        </div>

        <div className="p-4">
          <h3 className="font-semibold gold">{item.title}</h3>
          <p className="mt-2 muted text-sm">Explore premium options in this category.</p>
        </div>
      </article>
    </Link>
  );
}

// 🔹 Home component
export default function Home() {
  const [tab, setTab] = useState('stay');

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="h1-serif text-5xl md:text-6xl leading-tight">Welcome to Velora</h1>
        <p className="mt-4 text-lg muted">Your luxury beyond is a few clicks away</p>

        {/* Tabs */}
        <div className="mt-8 inline-flex bg-opacity-5 surface rounded-full p-1">
          <button
            onClick={() => setTab('stay')}
            className={`px-5 py-2 rounded-full ${tab === 'stay' ? 'gold-strong bg-opacity-10' : 'muted'}`}
          >
            Where to stay?
          </button>
          <button
            onClick={() => setTab('rent')}
            className={`px-5 py-2 rounded-full ${tab === 'rent' ? 'gold-strong bg-opacity-10' : 'muted'}`}
          >
            What to rent?
          </button>
          <button
            onClick={() => setTab('security')}
            className={`px-5 py-2 rounded-full ${tab === 'security' ? 'gold-strong bg-opacity-10' : 'muted'}`}
          >
            Need security?
          </button>
        </div>
      </section>

      {/* Where Cards */}
      <section className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {whereCards.map((c) => (
            <Card key={c.title} item={c} />
          ))}
        </div>
      </section>

      {/* Discover More */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-6 gold">Discover More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {discover.map((d) => (
            <Card key={d.title} item={d} />
          ))}
        </div>
      </section>
    </div>
  );
}