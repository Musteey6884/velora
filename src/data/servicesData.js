// src/data/servicesData.js
import shortLet from "../assets/services/short-let.jpg";
import studentHousing from "../assets/services/student-housing.jpg";
import residentialRentals from "../assets/services/residential-rentals.jpg";
import homesSale from "../assets/services/homes-sale.jpg";
import vehicleRental from "../assets/services/vehicle-rental.jpg";
import eventVenue from "../assets/services/event-venue.jpg";
import laundryServices from "../assets/services/laundry-services.jpg";
import homeCleaning from "../assets/services/home-cleaning.jpg";
import investmentOpportunity from "../assets/services/investment-opportunity.jpg";
import securityGuards from "../assets/services/security-guards.jpg";
import bouncers from "../assets/services/bouncers.jpg";
import verifiedArtisans from "../assets/services/verified-artisans.jpg";
import wasteRecycling from "../assets/services/waste-recycling.jpg";

export const servicesData = [
  // Accommodation & Property
  { title: "Short-Let Apartments", image: shortLet, link: "/listings?q=short-let", category: "Accommodation & Property" },
  { title: "Student Housing", image: studentHousing, link: "/listings?q=student", category: "Accommodation & Property" },
  { title: "Residential Rentals", image: residentialRentals, link: "/listings?q=residential", category: "Accommodation & Property" },
  { title: "Homes for Sale", image: homesSale, link: "/listings?q=homes", category: "Accommodation & Property" },

  // Mobility & Lifestyle Rentals
  { title: "Vehicle Rentals", image: vehicleRental, link: "/listings?q=vehicle", category: "Mobility & Lifestyle Rentals" },
  { title: "Event Venues", image: eventVenue, link: "/listings?q=events", category: "Mobility & Lifestyle Rentals" },

  // Security Services
  { title: "Security Guards", image: securityGuards, link: "/listings?q=security", category: "Security Services" },
  { title: "Bouncers", image: bouncers, link: "/listings?q=bouncers", category: "Security Services" },

  // Essential Lifestyle Services
  { title: "Laundry Services", image: laundryServices, link: "/listings?q=laundry", category: "Essential Lifestyle Services" },
  { title: "Home Cleaning", image: homeCleaning, link: "/listings?q=cleaning", category: "Essential Lifestyle Services" },
  { title: "Verified Artisans", image: verifiedArtisans, link: "/listings?q=artisans", category: "Essential Lifestyle Services" },
  { title: "Waste & Recycling", image: wasteRecycling, link: "/listings?q=waste", category: "Essential Lifestyle Services" },

  // Finance & Investment Opportunities
  { title: "Investment Opportunities", image: investmentOpportunity, link: "/listings?q=investment", category: "Finance & Investment Opportunities" },
];
