// src/pages/Listings.jsx
import { useLocation } from "react-router-dom";
import { servicesData } from "../data/servicesData";
import ServiceCard from "../components/ServiceCard";

export default function Listings() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

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
      <h1 className="text-3xl font-bold mb-10 text-center">
        {query ? `Results for "${query}"` : "All Services"}
      </h1>

      {Object.keys(grouped).map((category, idx) => (
        <div key={idx} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {grouped[category].map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
