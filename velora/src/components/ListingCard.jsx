import { Link } from "react-router-dom";
export default function ListingCard({item}){
  return (
    <div className="border rounded-lg p-3 bg-white">
      <div className="h-40 bg-gray-200 rounded mb-3 flex items-center justify-center">Image</div>
      <h3 className="font-semibold text-lg">{item.title}</h3>
      <p className="text-sm text-gray-600">{item.type} • {item.city}</p>
      <p className="mt-2 font-bold">₦{(item.pricePerMonth||item.pricePerNight||0).toLocaleString()}</p>
      <div className="mt-3 flex gap-2">
        <Link to={`/listings/${item._id}`} className="flex-1 text-center bg-blue-600 text-white py-2 rounded">View</Link>
      </div>
    </div>
  )
}
