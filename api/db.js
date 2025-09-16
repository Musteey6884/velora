import { MongoClient } from "mongodb";

let cached = global._veloraMongo;
if (!cached) cached = global._veloraMongo = { conn: null, client: null };

export async function connect() {
  const uri = process.env.MONGO_URI;
  if (!uri) return null; // demo mode
  if (cached.conn) return cached.conn;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db();
  cached.conn = { client, db };
  return cached.conn;
}
