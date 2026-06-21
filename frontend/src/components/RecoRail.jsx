// // import React, { useEffect, useState } from 'react';
// // import http from '../api/http.js';
// // import { ENDPOINTS } from '../api/endpoints.js';
// // import ProductCard from './ProductCard.jsx';

// // export default function RecoRail({ productId }){
// //   const [items, setItems] = useState([]);
// //   useEffect(()=>{ (async()=>{ const { data } = await http.get(`${ENDPOINTS.ai.recommend}?productId=${productId}`); setItems(data) })(); }, [productId]);
// //   if (!items.length) return null;
// //   return (
// //     <div>
// //       <h3>Recommended</h3>
// //       <div className="grid">{items.map(p => <ProductCard key={p._id} p={p}/>)}</div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import http from "../api/http.js";
// import ProductCard from "./ProductCard.jsx";

// export default function RecoRail({ productId, category }) {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       try {
//         let data = [];
//         if (productId) {
//           const res = await http.get(`/api/ai/recommend?productId=${productId}`);
//           data = res.data.items || res.data || [];
//         } else if (category) {
//           const res = await http.get(
//             `/api/products?category=${encodeURIComponent(category)}&limit=8`
//           );
//           data = res.data.items || [];
//         } else {
//           const res = await http.get(`/api/products?limit=8&sort=popular`);
//           data = res.data.items || [];
//         }
//         if (!cancelled) setItems(data);
//       } catch (e) {
//         console.error(e);
//         if (!cancelled) setItems([]);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, [productId, category]);

//   if (!items.length) return null;

//   return (
//     <div className="panel" style={{ marginTop: 16 }}>
//       <h3>Recommended for you</h3>
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12 }}>
//         {items.map((p) => (
//           <ProductCard key={p._id} product={p} />
//         ))}
//       </div>
//     </div>
//   );
// }






// frontend/src/components/RecoRail.jsx
import React, { useEffect, useState } from "react";
import http from "../api/http.js";
import ProductCard from "./ProductCard.jsx";

export default function RecoRail({ productId, category }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const loadRecommendations = async () => {
    if (showRecommendations) return; // already loaded

    setLoading(true);
    try {
      let data = [];
      if (productId) {
        const res = await http.get(`/api/ai/recommend?productId=${productId}`);
        data = res.data.items || res.data || [];
      } else if (category) {
        const res = await http.get(`/api/products?category=${encodeURIComponent(category)}&limit=8`);
        data = res.data || [];
      } else {
        const res = await http.get(`/api/products?limit=8&sort=popular`);
        data = res.data || [];
      }
      setItems(data);
      setShowRecommendations(true);
    } catch (e) {
      console.error(e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Auto load if you want (optional - currently disabled)
  // useEffect(() => { loadRecommendations(); }, [productId, category]);

  if (!showRecommendations) {
    return (
      <div className="panel text-center py-8">
        <button
          onClick={loadRecommendations}
          disabled={loading}
          className="px-8 py-3 bg-black text-white rounded-2xl font-semibold hover:bg-gray-800 transition"
        >
          {loading ? "Loading Recommendations..." : "Show Recommended Products"}
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="panel text-center py-8 text-gray-500">No recommendations found.</div>;
  }

  return (
    <div className="panel">
      <h3 className="mb-6 text-2xl font-semibold">Recommended for you</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}