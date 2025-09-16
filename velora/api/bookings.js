import { connect } from "./db.js";
import jwt from "jsonwebtoken";

function getUserIdFromAuth(req) {
  const h = req.headers.authorization;
  if (!h) return null;
  const token = h.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "velora_demo");
    return payload.id || payload;
  } catch (e) { return null; }
}

const DEMO_BOOKINGS = [];

export default async function handler(req, res) {
  const conn = await connect();
  if (req.method === "POST") {
    const userId = getUserIdFromAuth(req);
    if (!userId) return res.status(401).json({ message: "Auth required" });
    const payload = { ...req.body, userId, _id: "b" + (DEMO_BOOKINGS.length + 1), createdAt: new Date().toISOString(), paymentStatus: "paid" };
    if (!conn) {
      DEMO_BOOKINGS.push(payload);
      return res.json({ booking: payload, awardedPoints: 50 });
    }
    const col = conn.db.collection("bookings");
    const r = await col.insertOne(payload);
    const users = conn.db.collection("users");
    await users.updateOne({ _id: new ObjectId(userId) }, { $inc: { points: 50 } });
    res.json({ booking: { ...payload, _id: r.insertedId.toString() }, awardedPoints: 50 });
  } else if (req.method === "GET") {
    const userId = getUserIdFromAuth(req);
    if (!userId) return res.status(401).json({ message: "Auth required" });
    if (!conn) return res.json(DEMO_BOOKINGS.filter(b => b.userId === userId));
    const col = conn.db.collection("bookings");
    const list = await col.find({ userId }).toArray();
    res.json(list);
  } else res.status(405).end();
}
