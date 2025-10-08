import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({defaultCity="Abuja"}) {
  const [q, setQ] = useState("");
  const [city, setCity] = useState(defaultCity);
  const nav = useNavigate();
  function submit(e){
    e.preventDefault();
    nav(`/listings?q=${encodeURIComponent(q)}&city=${encodeURIComponent(city)}`);
  }
  return (
    <form onSubmit={submit} className="max-w-3xl mx-auto p-4 flex gap-2 surface rounded shadow-sm">
      <input className="flex-1 p-3 border rounded bg-transparent" placeholder="Search (e.g. short-let, SUV)" value={q} onChange={e=>setQ(e.target.value)} />
      <input className="w-40 p-3 border rounded bg-transparent" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 rounded">Search</button>
    </form>
  );
}
