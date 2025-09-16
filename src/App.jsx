import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import Dashboard from "./pages/Dashboard";

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/listings" element={<Listings/>} />
          <Route path="/listings/:id" element={<ListingDetails/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
