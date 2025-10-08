import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header(){
  const [theme, setTheme] = useState(() => localStorage.getItem('velora_theme') || 'light');

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    localStorage.setItem('velora_theme', theme);
  }, [theme]);

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <header className="surface shadow sticky top-0 z-40 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <Link to="/" className="text-2xl font-bold text-blue-600">Velora</Link>
          <div className="text-sm muted">Where living meets lifestyle</div>
        </div>
        <div className="flex items-center gap-4">
          <nav className="space-x-4 hidden sm:block">
            <Link to="/listings" className="hover:text-blue-400">Listings</Link>
            <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
          </nav>
          <button
            aria-label="Toggle theme"
            onClick={toggle}
            className="px-3 py-1 rounded border border-transparent hover:border-gray-300 transition-colors"
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </header>
  )
}
