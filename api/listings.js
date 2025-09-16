import { connect } from "./db.js";

const DEMO_LISTINGS = [
  { _id: "l1", title: "2-Bedroom Short-let, Abuja", type: "short-let", pricePerNight: 12000, pricePerMonth: 450000, city: "Abuja", description: "Furnished short-let near city center", photos: [], amenities: ["WiFi", "AC"] },
  { _id: "l2", title: "Student Room near Uni - Kaduna", type: "student", pricePerMonth: 35000, city: "Kaduna", description: "Shared flat for students", photos: [], amenities: ["Kitchen", "Laundry"] },
  { _id: "l3", title: "SUV (Self-drive) - Weekend", type: "vehicle", pricePerNight: 25000, city: "Abuja", description: "7-seater SUV for trips", photos: [], amenities: ["Driver optional"] }
];

export default async function handler(req, res) {
  const conn = await connect();
  if (req.method === "GET") {
    const { city, type, q } = req.query;
    if (!conn) {
      let out = DEMO_LISTINGS;
      if (city) out = out.filter(l => l.city?.toLowerCase() === city.toLowerCase());
      if (type) out = out.filter(l => l.type === type);
      if (q) out = out.filter(l => l.title.toLowerCase().includes(q.toLowerCase()));
      return res.json(out);
    }
    const col = conn.db.collection("listings");
    const query = {};
    if (city) query.city = city;
    if (type) query.type = type;
    if (q) query.title = { $regex: q, $options: "i" };
    const list = await col.find(query).limit(200).toArray();
    return res.json(list);
  } else if (req.method === "POST") {
    if (!conn) {
      const payload = req.body;
      payload._id = "l" + (DEMO_LISTINGS.length + 1);
      DEMO_LISTINGS.push(payload);
      return res.json(payload);
    }
    const col = conn.db.collection("listings");
    const r = await col.insertOne(req.body);
    res.json({ ...req.body, _id: r.insertedId.toString() });
  } else res.status(405).end();
}
