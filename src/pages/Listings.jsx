// src/pages/Listings.jsx
import React, { useEffect, useMemo, useState, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { servicesData } from "../data/servicesData";
import ServiceCard from "../components/ServiceCard";
import ListingCard from "../components/ListingCard";

const MapView = React.lazy(() => import("../components/MapView"));

export default function Listings() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [all, setAll] = useState([]);
  const [mapEnabled, setMapEnabled] = useState(false);
  const [searchQ, setSearchQ] = useState(query || '');
  const nav = useNavigate();

  useEffect(() => {
    api
      .get("/listings")
      .then((r) => setAll(Array.isArray(r.data) ? r.data : []))
      .catch(() => setAll([]));
  }, []);

  // Removed debug logs after verification

  const filtered = useMemo(() => {
    const q = (query || "").toLowerCase();
    return all.filter(
      (l) =>
        !q ||
        (l.title || "").toLowerCase().includes(q) ||
        (l.city || "").toLowerCase().includes(q)
    );
  }, [all, query]);

  // Filter if query exists, otherwise show all
  const filteredServices = query
    ? servicesData.filter((service) =>
        service.title.toLowerCase().includes(query.toLowerCase())
      )
    : servicesData;

  // Group services by category
  const grouped = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            nav(`/listings?q=${encodeURIComponent(searchQ)}`);
          }}
          className="flex-1"
        >
          <input
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Search listings or cities..."
            className="w-full p-3 surface transition-colors"
          />
        </form>

        <button
          onClick={() => setMapEnabled((m) => !m)}
          className="px-4 py-2 rounded muted"
        >
          {mapEnabled ? "Hide map" : "Map"}
        </button>
      </div>

      {mapEnabled && (
        <div className="mb-4">
          <Suspense fallback={<div className="p-4 muted">Loading map...</div>}>
            <MapView
              points={all.map((a) => ({
                lat: a.lat,
                lng: a.lng,
                title: a.title,
                id: a._id,
                photo: Array.isArray(a.photos) && a.photos[0] ? a.photos[0] : null,
              }))}
            />
          </Suspense>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-10 text-center">
        {query ? `Results for "${query}"` : "All Services"}
      </h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((l) => (
          <ListingCard key={l._id || l.title} {...l} />
        ))}
      </div>
    </div>
  );
}
