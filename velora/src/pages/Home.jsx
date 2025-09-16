import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div className="max-w-6xl mx-auto p-4">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded">
        <h1 className="text-3xl font-bold">Velora</h1>
        <p className="mt-2">Where living meets lifestyle</p>
      </section>

      <SearchBar defaultCity="Abuja" />

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Quick categories</h2>
        <div className="flex gap-3 mt-3">
          <Link to="/listings?q=short-let" className="p-4 bg-white rounded shadow">Short-lets</Link>
          <Link to="/listings?q=student" className="p-4 bg-white rounded shadow">Student rooms</Link>
          <Link to="/listings?q=vehicle" className="p-4 bg-white rounded shadow">Vehicles</Link>
        </div>
      </section>
    </div>
  )
}
