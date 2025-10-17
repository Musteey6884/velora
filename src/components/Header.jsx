import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const mobileRef = useRef();

  useEffect(() => {
    // read demo auth from localStorage
    try {
      const token = localStorage.getItem('velora_token');
      const u = localStorage.getItem('velora_user');
      if (token && u) setUser(JSON.parse(u));
    } catch {}
  }, []);

  useEffect(() => {
    // close mobile menu on outside click
    function onDoc(e) {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) setMobileOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  function signInDemo() {
    const demoToken = `demo-token-${Date.now()}`;
    const demoUser = { name: 'Demo User' };
    localStorage.setItem('velora_token', demoToken);
    localStorage.setItem('velora_user', JSON.stringify(demoUser));
    setUser(demoUser);
    alert('Signed in as Demo User');
  }

  function signOut() {
    localStorage.removeItem('velora_token');
    localStorage.removeItem('velora_user');
    setUser(null);
    alert('Signed out');
  }

  return (
  <header className="w-full surface px-3 md:px-5 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="text-2xl font-semibold gold-strong">VELORA</div>
        </Link>

  {/* desktop nav */}
  <nav className="hidden md:flex gap-3 items-center">
          <Link to="/" className="muted hover:gold-strong px-3 py-1 rounded">Home</Link>
          <Link to="/listings" className="muted hover:gold-strong px-3 py-1 rounded">Listings</Link>
          <Link to="/about" className="muted hover:gold-strong px-3 py-1 rounded">About</Link>
          <Link to="/contact" className="muted hover:gold-strong px-3 py-1 rounded">Contact</Link>
        </nav>
      </div>

      {/* right-side controls */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="relative" ref={mobileRef}>
            <button
              className="px-3 py-1 rounded muted flex items-center gap-2"
              onClick={() => setMobileOpen((s) => !s)}
              aria-haspopup="true"
              aria-expanded={mobileOpen}
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-400 flex items-center justify-center text-black font-semibold">
                {user.name.split(' ').map(n => n[0]).slice(0,2).join('')}
              </span>
            </button>

            {mobileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-black/70 backdrop-blur-sm border border-yellow-900 rounded shadow-lg p-2 z-50">
                <div className="p-2 text-sm gold">{user.name}</div>
                <button onClick={signOut} className="w-full text-left p-2 muted hover:bg-opacity-10 rounded">Sign out</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={signInDemo} className="px-4 py-2 rounded btn-gold font-medium">Sign In</button>
        )}

        {/* mobile menu button */}
        <button
          className="md:hidden px-2 py-1 muted"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((s) => !s)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
            <path d="M3 6h18M3 12h18M3 18h18"></path>
          </svg>
        </button>
      </div>

      {/* mobile dropdown */}
      {mobileOpen && (
        <div ref={mobileRef} className="md:hidden absolute left-4 right-4 top-16 surface rounded shadow-lg p-4 z-40">
            <nav className="flex flex-col gap-2">
            <Link to="/" onClick={() => setMobileOpen(false)} className="p-2 muted rounded">Home</Link>
            <Link to="/listings" onClick={() => setMobileOpen(false)} className="p-2 muted rounded">Listings</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="p-2 muted rounded">About</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="p-2 muted rounded">Contact</Link>
            {user ? (
              <button onClick={() => { signOut(); setMobileOpen(false); }} className="p-2 muted rounded text-left">Sign out</button>
            ) : (
              <button onClick={() => { signInDemo(); setMobileOpen(false); }} className="p-2 btn-gold rounded">Sign In</button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}