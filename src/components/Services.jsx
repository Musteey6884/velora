// src/components/Services.jsx
import { servicesData } from "../data/servicesData";

const Services = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {servicesData.map(({ title, image, link }) => (
        <div
          key={title}
          className="bg-gray-800 rounded-2xl overflow-hidden group shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center"
        >
          {/* Image */}
          <div className="flex justify-center items-center w-full h-48 bg-black/20">
            <img
              src={image}
              alt={title}
              className="max-h-40 max-w-full object-contain mx-auto"
            />
          </div>

          {/* Title */}
          <div className="p-4 text-center">
            <h3 className="text-white font-semibold group-hover:text-yellow-400 transition">
              {title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
