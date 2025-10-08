import { useEffect, useState } from "react";
import api from "../services/api";
import ListingCard from "../components/ListingCard";
import CurrencySelector from "../components/CurrencySelector";

export default function Dashboard(){
  const [user, setUser] = useState(null);
  const [recs, setRecs] = useState([]);
  const [nearby, setNearby] = useState([]);
  const [currency, setCurrency] = useState("NGN");

  useEffect(()=> {
    api.get("/users").then(res => {
      setUser(res.data.user);
      setRecs(res.data.recommendations || []);
      setNearby(res.data.nearby || []);
    }).catch(()=> {
      setUser({ name: "Guest", points: 0 });
      setRecs([{ _id:"l1", title:"Short-let in Abuja under N50k", pricePerNight:12000, type:"short-let", city:"Abuja" }, { _id:"l3", title:"SUV available this weekend", pricePerNight:25000, type:"vehicle", city:"Abuja" }]);
      setNearby([{ id:"a1", name:"Central Park", type:"Park", distanceKm:1.2 }]);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Hello, {user?.name || "Guest"}</h2>
          <p className="text-sm muted">Velora points: {user?.points ?? 0}</p>
        </div>
        <div className="flex items-center gap-3">
          <CurrencySelector onChange={setCurrency} />
        </div>
      </div>

      <section className="mt-6">
        <h3 className="text-xl font-semibold">Tailored suggestions</h3>
        <div className="grid md:grid-cols-3 gap-4 mt-3">
          {recs.map(r => <ListingCard key={r._id} item={r} />)}
        </div>
      </section>

      <section className="mt-6">
        <h3 className="text-xl font-semibold">Nearby attractions</h3>
        <div className="mt-3">
         {nearby.map(n => <div key={n.id} className="p-3 surface rounded mb-2">{n.name} — {n.type} — {n.distanceKm} km</div>)}
        </div>
      </section>
    </div>
  )
}
