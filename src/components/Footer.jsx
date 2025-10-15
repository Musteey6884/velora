import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(){
  return (
    <footer className="w-full surface py-8">
      <div className="max-w-5xl mx-auto text-center px-6">
        <Link to="/services" className="inline-block px-6 py-3 rounded btn-gold font-medium">
          View all services
        </Link>
        <p className="mt-4 muted text-sm">Velora — curated luxury experiences</p>
      </div>
    </footer>
  );
}