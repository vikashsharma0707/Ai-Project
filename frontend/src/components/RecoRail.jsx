// import React, { useEffect, useState } from 'react';
// import http from '../api/http.js';
// import { ENDPOINTS } from '../api/endpoints.js';
// import ProductCard from './ProductCard.jsx';

// export default function RecoRail({ productId }){
//   const [items, setItems] = useState([]);
//   useEffect(()=>{ (async()=>{ const { data } = await http.get(`${ENDPOINTS.ai.recommend}?productId=${productId}`); setItems(data) })(); }, [productId]);
//   if (!items.length) return null;
//   return (
//     <div>
//       <h3>Recommended</h3>
//       <div className="grid">{items.map(p => <ProductCard key={p._id} p={p}/>)}</div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import http from "../api/http.js";
import ProductCard from "./ProductCard.jsx";

export default function RecoRail({ productId, category }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let data = [];
        if (productId) {
          const res = await http.get(`/api/ai/recommend?productId=${productId}`);
          data = res.data.items || res.data || [];
        } else if (category) {
          const res = await http.get(
            `/api/products?category=${encodeURIComponent(category)}&limit=8`
          );
          data = res.data.items || [];
        } else {
          const res = await http.get(`/api/products?limit=8&sort=popular`);
          data = res.data.items || [];
        }
        if (!cancelled) setItems(data);
      } catch (e) {
        console.error(e);
        if (!cancelled) setItems([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [productId, category]);

  if (!items.length) return null;

  return (
    <div className="panel" style={{ marginTop: 16 }}>
      <h3>Recommended for you</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12 }}>
        {items.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
