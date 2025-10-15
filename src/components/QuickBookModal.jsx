import { useState } from "react";
import api from "../services/api";

export default function QuickBookModal({listing, onClose, onBooked}) {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);

  async function book(e){
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { listingId: listing._id, startDate: start, endDate: end, totalAmount: listing.pricePerNight || listing.pricePerMonth || 0, guestInfo: { name } };
      const res = await api.post("/bookings", payload);
      alert(`Booked! Points awarded: ${res.data.awardedPoints || 0}`);
      onBooked && onBooked(res.data.booking);
      onClose();
    } catch (err) {
      alert("Booking failed. Login required.");
    } finally { setLoading(false); }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <form onSubmit={book} className="bg-white p-6 rounded max-w-md w-full">
        <h3 className="text-xl font-semibold mb-3">Quick Book — {listing.title}</h3>
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full border p-2 rounded mb-2" />
        <div className="flex gap-2">
          <input required type="date" value={start} onChange={e=>setStart(e.target.value)} className="flex-1 border p-2 rounded" />
          <input required type="date" value={end} onChange={e=>setEnd(e.target.value)} className="flex-1 border p-2 rounded" />
        </div>
        <div className="mt-4 flex gap-2">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded flex-1">{loading ? "Booking..." : "Pay & Book"}</button>
          <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
