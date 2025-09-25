// src/pages/Home.jsx
import SearchBar from "../components/SearchBar";
import ServiceCard from "../components/ServiceCard";
import { featuredServices } from "../data/featuredServices";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 rounded-xl text-center shadow-md">
        <h1 className="text-4xl font-bold">Velora</h1>
        <p className="mt-3 text-lg">Where living meets lifestyle</p>
      </section>

      {/* Search */}
      <div className="mt-6">
        <SearchBar defaultCity="Abuja" />
      </div>

      {/* Featured Services */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Explore Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredServices.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Link
            to="/listings"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            View All Services
          </Link>
        </div>
      </section>
    </div>
  );
}
