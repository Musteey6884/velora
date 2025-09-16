import { connect } from "./db.js";
import jwt from "jsonwebtoken";

function getUserIdFromAuth(req) {
  const h = req.headers.authorization;
  if (!h) return null;
  try {
    const payload = jwt.verify(h.split(" ")[1], process.env.JWT_SECRET || "velora_demo");
    return payload.id;
  } catch (e) { return null; }
}

function nearbyAttractions(city) {
  return [
    { name: "Central Park", type: "Park", distanceKm: 1.2 },
    { name: "Popular Mall", type: "Shopping", distanceKm: 2.0 },
    { name: "Famous Restaurant", type: "Food", distanceKm: 0.8 }
  ].map((a, i) => ({ ...a, id: "a" + i }));
}

export default async function handler(req, res) {
  const conn = await connect();
  const userId = getUserIdFromAuth(req);
  if (!userId) return res.status(401).json({ message: "Auth required" });

  if (!conn) {
    const demo = { id: userId, name: "Demo", email: "demo@velora.app", points: 120 };
    return res.json({ user: demo, recommendations: [
      { id: "l1", title: "Short-let in Abuja under N50k", pricePerNight: 12000, type: "short-let", city: "Abuja" },
      { id: "l3", title: "SUV available this weekend", pricePerNight: 25000, type: "vehicle", city: "Abuja" }
    ], nearby: nearbyAttractions("Abuja") });
  }

  const users = conn.db.collection("users");
  const u = await users.findOne({ _id: new ObjectId(userId) });
  const listings = conn.db.collection("listings");
  const recs = await listings.find({ $or:[{type:"short-let"},{type:"vehicle"}] }).limit(6).toArray();
  res.json({ user: { id: u._id.toString(), name: u.name, email: u.email, points: u.points || 0 }, recommendations: recs, nearby: nearbyAttractions(u.city || "Abuja") });
}
