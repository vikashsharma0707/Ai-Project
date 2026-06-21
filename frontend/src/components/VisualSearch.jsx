


// // import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { visual } from "../store/aiSlice.js";
// // import ProductCard from "./ProductCard.jsx";
// // import "./VisualSearch.css"; // नया CSS

// // export default function VisualSearch({ defaultCategory = "women" }) {
// //   const [cat, setCat] = useState(defaultCategory);
// //   const [file, setFile] = useState(null);
// //   const dispatch = useDispatch();
// //   const visualState = useSelector((s) => s.ai.visual);

// //   // Backend may return either an array of products OR { items: [...] }
// //   const products = Array.isArray(visualState)
// //     ? visualState
// //     : visualState?.items || [];

// //   const onFind = async () => {
// //     await dispatch(visual(file ? { category: cat, file } : cat));
// //   };

// //   return (
// //     <div className="panel visual-panel">
// //       <h2 className="vs-title">🔎 Visual Search</h2>
// //       <p className="vs-sub">Upload an image or pick a category to find similar products</p>

// //       <div className="vs-controls">
// //         <select
// //           className="vs-select"
// //           value={cat}
// //           onChange={(e) => setCat(e.target.value)}
// //         >
// //           <option value="men">Men</option>
// //           <option value="women">Women</option>
// //           <option value="kids">Kids</option>
// //           <option value="">All</option>
// //         </select>

// //         <label className="vs-upload">
// //           <input
// //             type="file"
// //             accept="image/*"
// //             onChange={(e) => setFile(e.target.files?.[0] || null)}
// //           />
// //           {file ? file.name : "Choose Image"}
// //         </label>

// //         <button className="btn vs-btn" onClick={onFind}>
// //           Find Similar
// //         </button>
// //       </div>

// //       <div className="grid vs-results">
// //         {products.map((p) => (
// //           <ProductCard key={p._id} p={p} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }




// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { visual } from "../store/aiSlice.js";
// import ProductCard from "./ProductCard.jsx";
// import "./VisualSearch.css";

// export default function VisualSearch({ defaultCategory = "women" }) {
//   const [cat, setCat] = useState(defaultCategory);
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const dispatch = useDispatch();
//   const visualState = useSelector((s) => s.ai.visual || []);
//   const loading = useSelector((s) => s.ai.loading?.visual || false);

//   const products = Array.isArray(visualState) ? visualState : visualState?.items || [];

//   const onFileChange = (e) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//     }
//   };

//   const onFind = async () => {
//     if (!file && !cat) {
//       alert("Please upload an image or select category");
//       return;
//     }
//     await dispatch(visual(file ? { category: cat, file } : cat));
//   };

//   return (
//     <div className="panel visual-panel">
//       <h2 className="vs-title">🔎 Visual Search</h2>
//       <p className="vs-sub">Upload photo or choose category to find similar fashion</p>

//       {preview && (
//         <div className="image-preview">
//           <img src={preview} alt="Preview" />
//         </div>
//       )}

//       <div className="vs-controls">
//         <select
//           className="vs-select"
//           value={cat}
//           onChange={(e) => setCat(e.target.value)}
//         >
//           <option value="men">Men</option>
//           <option value="women">Women</option>
//           <option value="kids">Kids</option>
//           <option value="">All Categories</option>
//         </select>

//         <label className="vs-upload">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={onFileChange}
//           />
//           {file ? file.name.substring(0, 25) + "..." : "Choose Image"}
//         </label>

//         <button className="btn vs-btn" onClick={onFind} disabled={loading}>
//           {loading ? "Searching..." : "Find Similar Products"}
//         </button>
//       </div>

//       {products.length > 0 && (
//         <div className="vs-results">
//           <h3>Similar Products ({products.length})</h3>
//           <div className="grid">
//             {products.map((p) => (
//               <ProductCard key={p._id} p={p} />
//             ))}
//           </div>
//         </div>
//       )}

//       {products.length === 0 && !loading && (
//         <p className="no-results">No similar products found. Try another image.</p>
//       )}
//     </div>
//   );
// }





import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { visual } from "../store/aiSlice.js";
import ProductCard from "./ProductCard.jsx";

export default function VisualSearch({ defaultCategory = "women" }) {
  const [cat, setCat] = useState(defaultCategory);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const visualState = useSelector((s) => s.ai.visual || []);
  const loading = useSelector((s) => s.ai.loading?.visual || false);

  const products = Array.isArray(visualState) ? visualState : visualState?.items || [];

  const onFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const onFind = async () => {
    if (!file && !cat) {
      alert("Please upload an image or select a category");
      return;
    }
    setSearched(true);
    await dispatch(visual({ category: cat, file }));
  };

  return (
    <div className="bg-white border border-[#15171c]/10 rounded-sm p-7">
      <span className="block text-[11px] font-bold tracking-[0.3em] uppercase text-[#AD8A4D] mb-1.5">
        AI Powered
      </span>
      <h2 className="text-2xl font-bold tracking-tight text-[#15171c] mb-1.5">Visual Search</h2>
      <p className="text-sm text-[#15171c]/60 mb-6">
        Upload a photo or pick a category to find similar fashion
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px_auto] gap-3 items-stretch">
        {/* Upload */}
        <label
          className="flex items-center gap-2.5 border-[1.5px] border-dashed border-[#15171c]/25 rounded-sm px-3.5 min-h-[48px] cursor-pointer
            transition-colors duration-200 hover:border-[#AD8A4D] hover:bg-[#AD8A4D]/5
            focus-within:outline focus-within:outline-2 focus-within:outline-[#AD8A4D] focus-within:outline-offset-1"
        >
          <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
          {preview ? (
            <img src={preview} alt="Your upload" className="w-8 h-8 rounded-sm object-cover flex-shrink-0" />
          ) : (
            <span className="text-lg">📷</span>
          )}
          <span className="text-sm text-[#15171c] whitespace-nowrap overflow-hidden text-ellipsis">
            {file ? file.name.slice(0, 22) + (file.name.length > 22 ? "…" : "") : "Choose an image"}
          </span>
        </label>

        {/* Category */}
        <select
          className="border-[1.5px] border-[#15171c]/15 rounded-sm px-3 text-sm text-[#15171c] bg-white cursor-pointer
            focus:outline focus:outline-2 focus:outline-[#AD8A4D] focus:outline-offset-1"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="">All Categories</option>
        </select>

        {/* Submit */}
        <button
          onClick={onFind}
          disabled={loading}
          className="bg-[#15171c] text-white rounded-sm px-6 text-sm font-semibold tracking-wide whitespace-nowrap
            flex items-center justify-center gap-2
            transition-all duration-200 enabled:hover:bg-[#2a2d36] enabled:active:scale-[0.97]
            disabled:bg-[#15171c]/30 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Searching…
            </>
          ) : (
            "Find Similar Products"
          )}
        </button>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-sm bg-[#15171c]/10 animate-pulse" />
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && products.length > 0 && (
        <div className="mt-7">
          <h3 className="text-[15px] font-semibold text-[#15171c] mb-3.5">
            Similar Products ({products.length})
          </h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
            {products.map((p) => (
              // FIX: ProductCard expects a `product` prop, not `p` — the
              // previous `p={p}` meant ProductCard rendered with no data
              // at all even when results came back fine.
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state — only after an actual search, not on first load */}
      {!loading && searched && products.length === 0 && (
        <div className="text-center py-10 px-5 text-[#15171c]/55">
          <span className="block text-2xl mb-2">🔍</span>
          <p>No similar products found. Try a clearer photo or a different category.</p>
        </div>
      )}
    </div>
  );
}