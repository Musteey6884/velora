import React, { useEffect, useState } from 'react';
import { getFavorites } from '../services/favorites';
import ListingCard from '../components/ListingCard';
import api from '../services/api';

export default function Favorites() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      const favs = getFavorites();
      if (!favs.length) { setItems([]); return; }
      // try fetching details; fall back to id placeholders
      try {
        const res = await api.get('/listings');
        const all = Array.isArray(res.data) ? res.data : [];
        setItems(all.filter(l => favs.includes(l._id)));
      } catch {
        setItems(favs.map(id => ({ _id: id, title: 'Saved listing' })));
      }
    }
    load();
    const onStorage = () => load();
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!items.length) return <div className="p-6 muted">No favorites yet</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 gold">Favorites</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(it => <ListingCard key={it._id} {...it} />)}
      </div>
    </div>
  );
}