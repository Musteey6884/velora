// src/components/ServiceCard.jsx
import { Link } from "react-router-dom";

export default function ServiceCard({ title, image, link }) {
  return (
    <Link to={link} className="block group" aria-label={title}>
      <div className="relative overflow-hidden rounded-lg shadow hover:shadow-lg transition">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-3">
          <h3 className="text-white text-sm sm:text-lg font-semibold">{title}</h3>
        </div>
      </div>
    </Link>
  );
}
