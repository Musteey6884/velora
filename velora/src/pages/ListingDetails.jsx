import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import QuickBookModal from "../components/QuickBookModal";

export default function ListingDetails(){
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(()=> {
    if (!id) return;
    api.get(`/listings`, { params: { } }).then(res => {
      const found = res.data.find(x => x._id === id || x._id === Number(id) || x._id === String(id));
      setListing(found || { title: "Listing not found", description: "" });
    }).catch(()=> setListing({ title: "Listing not found", description: ""}));
  }, [id]);

  if (!listing) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold">{listing.title}</h2>
      <p className="mt-2">{listing.description}</p>
      <p className="mt-2 font-bold">₦{(listing.pricePerNight||listing.pricePerMonth||0).toLocaleString()}</p>
      <div className="mt-4">
        <button onClick={()=>setShow(true)} className="bg-green-600 text-white px-4 py-2 rounded">Quick Book (3 taps)</button>
      </div>

      {show && <QuickBookModal listing={listing} onClose={()=>setShow(false)} onBooked={()=>{}} />}
    </div>
  )
}
