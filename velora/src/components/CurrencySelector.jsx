import { useState } from "react";
export default function CurrencySelector({onChange}) {
  const [cur, setCur] = useState("NGN");
  function change(v){ setCur(v); onChange && onChange(v); }
  return (
    <select value={cur} onChange={e=>change(e.target.value)} className="border p-2 rounded">
      <option value="NGN">NGN</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
    </select>
  )
}
