import React, { useState, useEffect } from 'react';
import { isFavorite, toggleFavorite } from '../services/favorites';
import { Link } from "react-router-dom";

// ListingCard accepts either a `listing` object or legacy fields. We normalize to `data`.
export default function ListingCard(props) {
  const data = props.listing || props.item || {
    _id: props._id,
    title: props.title,
    subtitle: props.subtitle,
    photos: props.photos,
    city: props.city,
    type: props.type,
    pricePerMonth: props.pricePerMonth,
    pricePerNight: props.pricePerNight,
  };
  const id = data._id || data.title || 'listing';
  const [fav, setFav] = useState(isFavorite(id));

  useEffect(() => {
    const onStorage = () => setFav(isFavorite(id));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [id]);

  function onToggle() {
    toggleFavorite(id);
    setFav(isFavorite(id));
  }

  const img = (data.photos && data.photos[0]) || `https://picsum.photos/seed/${encodeURIComponent(id)}/800/600`;

  return (
    <article className="surface rounded-lg overflow-hidden shadow-sm transform transition-all duration-300 hover:-translate-y-1">
      <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
      <div className="p-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold gold">{data.title || 'Listing'}</h3>
          {data.subtitle && <p className="muted text-sm">{data.subtitle}</p>}
          {(!data.subtitle && data.city) && <p className="muted text-sm">{data.city}</p>}
        </div>
        <div className="flex flex-col items-end gap-2">
          <button onClick={onToggle} aria-pressed={fav} className="px-2 py-1 muted rounded">
            {fav ? '★' : '☆'}
          </button>
        </div>
      </div>
      <div className="p-4 border-t muted/20 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm text-muted">{data.type || '—'}</div>
          <div className="mt-1 font-bold">₦{(data.pricePerMonth||data.pricePerNight||0).toLocaleString()}</div>
        </div>
        <Link to={`/listings/${id}`} className="btn-gold px-3 py-2 rounded text-sm">View</Link>
      </div>
    </article>
  );
}
