

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { visual } from '../store/aiSlice.js';
// import ProductCard from './ProductCard.jsx';

// export default function VisualSearch({ defaultCategory = 'women' }) {
//   const [cat, setCat] = useState(defaultCategory);
//   const [file, setFile] = useState(null);
//   const dispatch = useDispatch();
//   const visualState = useSelector(s => s.ai.visual);

//   // Backend may return either an array of products OR { items: [...] }
//   const products = Array.isArray(visualState)
//     ? visualState
//     : (visualState?.items || []);

//   const onFind = async () => {
//     // Supports both category-only and image+category
//     await dispatch(visual(file ? { category: cat, file } : cat));
//   };

//   return (
//     <div className="panel">
//       <h2>Visual Search</h2>
//       <div className="row gap" style={{ flexWrap: 'wrap' }}>
//         <select value={cat} onChange={e=>setCat(e.target.value)}>
//           <option value="men">Men</option>
//           <option value="women">Women</option>
//           <option value="kids">Kids</option>
//           <option value="">All</option>
//         </select>
//         <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
//         <button className="btn" onClick={onFind}>Find Similar</button>
//       </div>

//       <div className="grid" style={{ marginTop: 12 }}>
//         {products.map(p => <ProductCard key={p._id} p={p} />)}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { visual } from "../store/aiSlice.js";
import ProductCard from "./ProductCard.jsx";
import "./VisualSearch.css"; // नया CSS

export default function VisualSearch({ defaultCategory = "women" }) {
  const [cat, setCat] = useState(defaultCategory);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const visualState = useSelector((s) => s.ai.visual);

  // Backend may return either an array of products OR { items: [...] }
  const products = Array.isArray(visualState)
    ? visualState
    : visualState?.items || [];

  const onFind = async () => {
    await dispatch(visual(file ? { category: cat, file } : cat));
  };

  return (
    <div className="panel visual-panel">
      <h2 className="vs-title">🔎 Visual Search</h2>
      <p className="vs-sub">Upload an image or pick a category to find similar products</p>

      <div className="vs-controls">
        <select
          className="vs-select"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="">All</option>
        </select>

        <label className="vs-upload">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          {file ? file.name : "Choose Image"}
        </label>

        <button className="btn vs-btn" onClick={onFind}>
          Find Similar
        </button>
      </div>

      <div className="grid vs-results">
        {products.map((p) => (
          <ProductCard key={p._id} p={p} />
        ))}
      </div>
    </div>
  );
}
