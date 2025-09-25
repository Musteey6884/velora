// src/pages/Home.jsx
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ServiceCard from "../components/ServiceCard";
import { servicesData } from "../data/servicesData";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20 px-6 rounded-xl text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover. Rent. Invest. <br /> Live Better with Velora.
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-80">
          Your all-in-one marketplace for apartments, student housing, cars,
          event venues, lifestyle services, and more.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/listings"
            className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-semibold shadow hover:bg-yellow-400 transition"
          >
            Find Your Next Home
          </Link>
          <Link
            to="/list-property"
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold shadow hover:bg-gray-100 transition"
          >
            List Your Property
          </Link>
        </div>
      </section>

      {/* Search Section */}
      <div className="mt-10">
        <SearchBar defaultCity="Abuja" />
      </div>

      {/* Our Services */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/listings"
            className="inline-block px-6 py-3 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-400 transition"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* Why Velora */}
      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Velora</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-900 text-white rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">All-in-One Marketplace</h3>
            <p className="opacity-80">
              From homes to cars, venues, and lifestyle services — everything in
              one place.
            </p>
          </div>
          <div className="p-6 bg-gray-900 text-white rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">Verified & Secure</h3>
            <p className="opacity-80">
              Every listing is verified for your safety and peace of mind.
            </p>
          </div>
          <div className="p-6 bg-gray-900 text-white rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">Luxury Meets Convenience</h3>
            <p className="opacity-80">
              Experience modern living with top-notch services and convenience.
            </p>
          </div>
        </div>
      </section>

      {/* Handpicked for You */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Handpicked for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src="/assets/images/apartment.jpg"
              alt="Apartment"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">Chis Downtown Apartment</h3>
              <p className="text-gray-600">$120 / night</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src="/assets/images/suv.jpg"
              alt="SUV"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">SUV Rental</h3>
              <p className="text-gray-600">$80 / day</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src="/assets/images/ballroom.jpg"
              alt="Ballroom"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">Grand Ballroom</h3>
              <p className="text-gray-600">$2000 / night</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
