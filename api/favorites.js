export default function handler(req, res) {
  // demo stub: echo saved ids if POST, return empty list on GET
  if (req.method === 'GET') return res.status(200).json([]);
  if (req.method === 'POST') {
    const body = req.body || {};
    return res.status(201).json({ saved: body.ids || [] });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}