import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(){
  return (
    <footer className="w-full surface py-10">
      <div className="max-w-5xl mx-auto text-center px-6">
  <div className="inline-flex items-center gap-4 bg-black/20 p-4 rounded-lg">
          <Link to="/services" className="inline-flex items-center gap-3 px-6 py-3 rounded btn-gold font-medium">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
              <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4L8.5 13 3 9h7l2-7z" />
            </svg>
            View all services
          </Link>
          <p className="mt-0 muted text-sm">Velora — curated luxury experiences</p>
        </div>
      </div>
    </footer>
  );
}