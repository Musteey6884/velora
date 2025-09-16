import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import api from "../services/api";
import { useSearchParams } from "react-router-dom";

export default function Listings(){
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const city = params.get("city") || "";

  useEffect(()=> {
    setLoading(true);
    api.get("/listings", { params: { q, city } }).then(res => setList(res.data)).catch(()=>setList([])).finally(()=>setLoading(false));
  }, [q, city]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Listings</h2>
      {loading ? <div>Loading...</div> : (
        <div className="grid md:grid-cols-3 gap-4">
          {list.map(l => <ListingCard key={l._id} item={l} />)}
        </div>
      )}
    </div>
  )
}
