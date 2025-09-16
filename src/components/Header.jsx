import { Link } from "react-router-dom";
export default function Header(){
  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <Link to="/" className="text-2xl font-bold text-blue-600">Velora</Link>
          <div className="text-sm text-gray-500">Where living meets lifestyle</div>
        </div>
        <nav className="space-x-4">
          <Link to="/listings" className="hover:text-blue-600">Listings</Link>
          <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        </nav>
      </div>
    </header>
  )
}
