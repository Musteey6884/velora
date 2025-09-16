import { connect } from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const { action } = req.query;
    if (action === "register") {
      const { name, email, password } = req.body;
      if (!email || !password) return res.status(400).json({ message: "Missing" });
      const conn = await connect();
      if (!conn) {
        const token = jwt.sign({ id: "demo_user", email }, process.env.JWT_SECRET || "velora_demo", { expiresIn: "7d" });
        return res.json({ token, user: { id: "demo_user", name: name || "Demo", email, points: 0 }});
      }
      const users = conn.db.collection("users");
      const existing = await users.findOne({ email });
      if (existing) return res.status(400).json({ message: "User exists" });
      const hash = await bcrypt.hash(password, 10);
      const r = await users.insertOne({ name, email, passwordHash: hash, points: 0 });
      const token = jwt.sign({ id: r.insertedId.toString(), email }, process.env.JWT_SECRET);
      res.json({ token, user: { id: r.insertedId.toString(), name, email, points: 0 }});
    } else if (action === "login") {
      const { email, password } = req.body;
      const conn = await connect();
      if (!conn) {
        const token = jwt.sign({ id: "demo_user", email }, process.env.JWT_SECRET || "velora_demo", { expiresIn: "7d" });
        return res.json({ token, user: { id: "demo_user", name: "Demo", email, points: 0 }});
      }
      const users = conn.db.collection("users");
      const u = await users.findOne({ email });
      if (!u) return res.status(400).json({ message: "User not found" });
      const ok = await bcrypt.compare(password, u.passwordHash);
      if (!ok) return res.status(400).json({ message: "Invalid" });
      const token = jwt.sign({ id: u._id.toString(), email }, process.env.JWT_SECRET);
      res.json({ token, user: { id: u._id.toString(), name: u.name, email: u.email, points: u.points || 0 }});
    } else res.status(404).json({ message: "Action required" });
  } else res.status(405).end();
}
