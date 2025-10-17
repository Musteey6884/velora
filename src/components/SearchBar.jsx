import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { servicesData } from "../data/servicesData";
import api from "../services/api";

export default function SearchBar({ defaultCity = "Abuja" }) {
  const [q, setQ] = useState("");
  const [city, setCity] = useState(defaultCity);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const nav = useNavigate();
  const cacheRef = useRef(null);
  const containerRef = useRef();

  useEffect(() => {
    function onDoc(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  // debounce query
  useEffect(() => {
    if (!q || q.length < 2) {
      setSuggestions([]);
      setOpen(false);
      setActive(-1);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      // try cached API listings first (fetch once)
      if (!cacheRef.current) {
        try {
          const res = await api.get('/listings');
          cacheRef.current = Array.isArray(res.data) ? res.data : [];
        } catch (e) {
          cacheRef.current = [];
        }
      }

      const ql = q.toLowerCase();
      const fromListings = (cacheRef.current || []).filter(l => (
        (l.title || '').toLowerCase().includes(ql) || (l.city || '').toLowerCase().includes(ql)
      )).slice(0, 6).map(l => ({ type: 'listing', id: l._id, title: l.title, subtitle: l.city }));

      const fromServices = servicesData.filter(s => s.title.toLowerCase().includes(ql)).slice(0, 6).map(s => ({ type: 'service', title: s.title }));

      // merge, prioritizing listings
      const merged = [...fromListings];
      for (const s of fromServices) {
        if (merged.length >= 8) break;
        if (!merged.find(m => m.title === s.title)) merged.push(s);
      }

      setSuggestions(merged);
      setOpen(true);
      setActive(-1);
      setLoading(false);
    }, 220);

    return () => clearTimeout(t);
  }, [q]);

  function choose(item) {
    setOpen(false);
    if (!item) return;
    if (item.type === 'listing' && item.id) {
      nav(`/listings?q=${encodeURIComponent(item.title)}&id=${encodeURIComponent(item.id)}`);
    } else {
      nav(`/listings?q=${encodeURIComponent(item.title)}`);
    }
  }

  function onKey(e) {
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (active >= 0 && active < suggestions.length) choose(suggestions[active]);
      else choose({ title: q });
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto p-4 relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
          nav(`/listings?q=${encodeURIComponent(q)}&city=${encodeURIComponent(city)}`);
        }}
        className="flex gap-2"
      >
        <div className="relative flex-1">
          <input
            aria-label="Search listings"
            aria-autocomplete="list"
            aria-expanded={open}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            onFocus={() => { if (suggestions.length) setOpen(true); }}
            placeholder="Search (e.g. short-let, SUV)"
            className="w-full p-3 surface rounded"
          />

          {open && (
            <ul role="listbox" className="absolute z-40 left-0 right-0 mt-2 bg-black/80 border border-yellow-900 rounded shadow-lg p-2 max-h-60 overflow-auto">
              {loading && <li className="p-2 muted">Searching...</li>}
              {!loading && suggestions.length === 0 && <li className="p-2 muted">No results</li>}
              {!loading && suggestions.map((s, idx) => (
                <li
                  key={`${s.type}-${s.id||s.title}-${idx}`}
                  role="option"
                  aria-selected={active === idx}
                  className={`p-2 rounded cursor-pointer ${active === idx ? 'bg-yellow-900/30' : 'hover:bg-yellow-900/10'}`}
                  onMouseEnter={() => setActive(idx)}
                  onClick={() => choose(s)}
                >
                  <div className="text-sm font-medium">{s.title}</div>
                  {s.subtitle && <div className="text-xs muted">{s.subtitle}</div>}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input className="w-40 p-3 surface rounded" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
        <button className="px-4 py-2 btn-gold rounded">Search</button>
      </form>
    </div>
  );
}
