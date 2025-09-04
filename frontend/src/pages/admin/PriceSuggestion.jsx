import { useState } from "react";
import http from "../../api/http.js";

export default function PriceSuggestion({ productId, currentPrice, onApplied }) {
  const [loading, setLoading] = useState(false);
  const [sugg, setSugg] = useState(null);
  const [err, setErr] = useState("");

  const ask = async () => {
    try {
      setErr(""); setLoading(true);
      const { data } = await http.get(`/api/ai/price-suggest/${productId}`);
      setSugg(data);
    } catch (e) {
      setErr("Failed to fetch suggestion");
    } finally {
      setLoading(false);
    }
  };

  const apply = async () => {
    if (!sugg?.suggested) return;
    try {
      setErr(""); setLoading(true);
      // ⚠️ Update endpoint adjust if different in your app:
      await http.put(`/api/admin/products/${productId}`, { price: sugg.suggested });
      onApplied?.(sugg.suggested);
    } catch (e) {
      setErr("Failed to apply price");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h3>Price Suggestion</h3>
        <button className="btn" onClick={ask} disabled={loading}>
          {loading ? "Calculating..." : "Suggest Price"}
        </button>
      </div>

      <p className="muted" style={{marginTop:8}}>
        Current: <b>₹{currentPrice}</b>
      </p>

      {sugg && (
        <div style={{marginTop:10}}>
          <p><b>{sugg.message}</b></p>
          <details style={{marginTop:6}}>
            <summary>Why this price?</summary>
            <pre style={{whiteSpace:"pre-wrap", background:"#f8fafc", padding:8, borderRadius:8}}>
{JSON.stringify(sugg.details, null, 2)}
            </pre>
          </details>
          <div style={{marginTop:8, display:"flex", gap:8}}>
            <button className="btn btn-buy" onClick={apply} disabled={loading}>Apply ₹{sugg.suggested}</button>
          </div>
        </div>
      )}

      {err ? <p className="error" style={{marginTop:8}}>{err}</p> : null}
    </div>
  );
}
