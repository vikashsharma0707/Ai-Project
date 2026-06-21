// // // // // import React from "react";
// // // // // import { API_BASE } from "../api/http.js";

// // // // // // inline placeholder (no network)
// // // // // const PH =
// // // // //   "data:image/svg+xml;utf8," +
// // // // //   encodeURIComponent(
// // // // //     `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
// // // // //       <rect width="100%" height="100%" fill="#f3f4f6"/>
// // // // //       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
// // // // //         font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#9ca3af">IMG</text>
// // // // //     </svg>`
// // // // //   );

// // // // // const srcUrl = (u) => (!u ? PH : u.startsWith("/uploads") ? `${API_BASE}${u}` : u);

// // // // // export default function ProductCard({ p, onAdd = () => {} }) {
// // // // //   // If the product is missing, render nothing (avoids crashes)
// // // // //   if (!p || typeof p !== "object") return null;

// // // // //   const title = p.title || "Untitled";
// // // // //   const brand = p.brand || "";
// // // // //   const price = Number(p.price) || 0;
// // // // //   const cover = srcUrl(p.images?.[0]);

// // // // //   return (
// // // // //     <div className="card">
// // // // //       <img
// // // // //         src={cover}
// // // // //         alt={title}
// // // // //         style={{ width: "100%", height: 260, objectFit: "cover" }}
// // // // //         onError={(e) => (e.currentTarget.src = PH)}
// // // // //       />
// // // // //       <div className="p16">
// // // // //         {brand && <div className="muted">{brand}</div>}
// // // // //         <div className="title">{title}</div>
// // // // //         <div>₹{price}</div>
// // // // //         <button className="btn mt8" onClick={() => onAdd(p)}>Add to cart</button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import React from "react";
// // // // import { Link } from "react-router-dom";
// // // // import { useDispatch } from "react-redux";
// // // // import { addToCart } from "../store/cartSlice.js"; // ✅ correct action
// // // // import { API_BASE } from "../api/http.js";
// // // // import "./ProductCard.css";

// // // // function safeImageUrl(p) {
// // // //   const src = p?.images?.[0] || p?.image || p?.thumbnail || "";
// // // //   if (!src) return null;
// // // //   if (/^https?:\/\//i.test(src)) return src;
// // // //   if (src.startsWith("/uploads")) return `${API_BASE}${src}`;
// // // //   return `${API_BASE}/${src.replace(/^\/+/, "")}`;
// // // // }

// // // // function PlaceholderSVG({ alt = "image" }) {
// // // //   return (
// // // //     <div className="pc-img ph">
// // // //       <svg viewBox="0 0 120 90" role="img" aria-label={alt} style={{ width: "100%", height: "100%" }}>
// // // //         <rect width="120" height="90" fill="#f3f4f6" />
// // // //         <circle cx="36" cy="36" r="12" fill="#e5e7eb" />
// // // //         <path d="M10 80 L48 46 L70 64 L92 50 L110 80 Z" fill="#e5e7eb" />
// // // //       </svg>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default function ProductCard({ product }) {
// // // //   const dispatch = useDispatch();
// // // //   if (!product) return null;

// // // //   const url = safeImageUrl(product);
// // // //   const price = Number(product.price || 0);
// // // //   const old = Number(product.oldPrice || 0);
// // // //   const hasDiscount = old > price && price > 0;
// // // //   const off = hasDiscount ? Math.round(((old - price) / old) * 100).toString() : null;

// // // //   const onAdd = () => {
// // // //     // Keep payload shape consistent with your cart slice usage elsewhere
// // // //     dispatch(
// // // //       addToCart({
// // // //         ...product,
// // // //         qty: 1,
// // // //         images: product.images || (product.image ? [product.image] : []),
// // // //       })
// // // //     );
// // // //   };

// // // //   const pid = product._id || product.id;

// // // //   return (
// // // //     <div className="pc">
// // // //       <Link to={`/product/${pid}`} className="pc-img" aria-label={product.title || "Product"}>
// // // //         {url ? <img src={url} alt={product.title || "product"} /> : <PlaceholderSVG alt={product.title} />}
// // // //       </Link>

// // // //       <div className="pc-body">
// // // //         <div className="pc-brand">{product.brand || ""}</div>
// // // //         <Link to={`/product/${pid}`} className="pc-title">
// // // //           {product.title || product.name || "Product"}
// // // //         </Link>

// // // //         <div className="pc-priceRow">
// // // //           <span className="pc-price">₹{price || 0}</span>
// // // //           {hasDiscount && <span className="pc-old">₹{old}</span>}
// // // //           {off && <span className="pc-off">{off}% off</span>}
// // // //         </div>

// // // //         <button className="btn btn-cart" onClick={onAdd}>
// // // //           Add to Cart
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import React from "react";
// // // import { Link } from "react-router-dom";
// // // import { useDispatch } from "react-redux";
// // // import { addToCart } from "../store/cartSlice.js";
// // // import { API_BASE } from "../api/http.js";
// // // import "./ProductCard.css";

// // // function safeImageUrl(p) {
// // //   const src = p?.images?.[0] || p?.image || p?.thumbnail || "";
// // //   if (!src) return null;
// // //   if (/^https?:\/\//i.test(src)) return src;
// // //   if (src.startsWith("/uploads")) return `${API_BASE}${src}`;
// // //   return `${API_BASE}/${src.replace(/^\/+/, "")}`;
// // // }

// // // function PlaceholderSVG({ alt = "image" }) {
// // //   return (
// // //     <div className="pc-img ph">
// // //       <svg
// // //         viewBox="0 0 120 90"
// // //         role="img"
// // //         aria-label={alt}
// // //         style={{ width: "100%", height: "100%" }}
// // //       >
// // //         <rect width="120" height="90" fill="#f3f4f6" />
// // //         <circle cx="36" cy="36" r="12" fill="#e5e7eb" />
// // //         <path
// // //           d="M10 80 L48 46 L70 64 L92 50 L110 80 Z"
// // //           fill="#e5e7eb"
// // //         />
// // //       </svg>
// // //     </div>
// // //   );
// // // }

// // // export default function ProductCard({ product }) {
// // //   const dispatch = useDispatch();
// // //   if (!product) return null;

// // //   const url = safeImageUrl(product);
// // //   const price = Number(product.price || 0);
// // //   const old = Number(product.oldPrice || 0);
// // //   const hasDiscount = old > price && price > 0;
// // //   const off = hasDiscount
// // //     ? Math.round(((old - price) / old) * 100).toString()
// // //     : null;

// // //   const onAdd = () => {
// // //     dispatch(
// // //       addToCart({
// // //         ...product,
// // //         qty: 1,
// // //         images: product.images || (product.image ? [product.image] : []),
// // //       })
// // //     );
// // //   };

// // //   const pid = product._id || product.id;

// // //   return (
// // //     <div className="pc">
// // //       <Link
// // //         to={`/product/${pid}`}
// // //         className="pc-img"
// // //         aria-label={product.title || "Product"}
// // //       >
// // //         {url ? (
// // //           <img src={url} alt={product.title || "product"} />
// // //         ) : (
// // //           <PlaceholderSVG alt={product.title} />
// // //         )}
// // //       </Link>

// // //       <div className="pc-body">
// // //         <div className="pc-brand">{product.brand || ""}</div>
// // //         <Link to={`/product/${pid}`} className="pc-title">
// // //           {product.title || product.name || "Product"}
// // //         </Link>

// // //         <div className="pc-priceRow">
// // //           <span className="pc-price">₹{price || 0}</span>
// // //           {hasDiscount && <span className="pc-old">₹{old}</span>}
// // //           {off && <span className="pc-off">{off}% off</span>}
// // //         </div>

// // //         <button className="btn btn-cart" onClick={onAdd}>
// // //           Add to Cart
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // import { addToCart } from "../store/cartSlice.js";
// // import { API_BASE } from "../api/http.js";

// // function safeImageUrl(p) {
// //   const src = p?.images?.[0] || p?.image || p?.thumbnail || "";
// //   if (!src) return null;
// //   if (/^https?:\/\//i.test(src)) return src;
// //   if (src.startsWith("/uploads")) return `${API_BASE}${src}`;
// //   return `${API_BASE}/${src.replace(/^\/+/, "")}`;
// // }

// // function PlaceholderSVG({ alt = "image" }) {
// //   return (
// //     <div className="w-full h-full flex items-center justify-center bg-slate-100">
// //       <svg
// //         viewBox="0 0 120 90"
// //         role="img"
// //         aria-label={alt}
// //         className="w-2/3 h-2/3 opacity-40"
// //       >
// //         <rect width="120" height="90" fill="#e2e8f0" />
// //         <circle cx="36" cy="36" r="12" fill="#cbd5e1" />
// //         <path d="M10 80 L48 46 L70 64 L92 50 L110 80 Z" fill="#cbd5e1" />
// //       </svg>
// //     </div>
// //   );
// // }

// // export default function ProductCard({ product }) {
// //   const dispatch = useDispatch();
// //   const [imgError, setImgError] = useState(false);
// //   const [added, setAdded] = useState(false);

// //   if (!product) return null;

// //   const url = safeImageUrl(product);
// //   const price = Number(product.price || 0);
// //   const old = Number(product.oldPrice || 0);
// //   const hasDiscount = old > price && price > 0;
// //   const off = hasDiscount
// //     ? Math.round(((old - price) / old) * 100)
// //     : null;

// //   const pid = product._id || product.id;

// //   const onAdd = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     dispatch(
// //       addToCart({
// //         ...product,
// //         qty: 1,
// //         images: product.images || (product.image ? [product.image] : []),
// //       })
// //     );
// //     setAdded(true);
// //     setTimeout(() => setAdded(false), 1800);
// //   };

// //   return (
// //     <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-indigo-100 flex flex-col">

// //       {/* ── Discount Badge ── */}
// //       {off && (
// //         <div className="absolute top-3 left-3 z-10">
// //           <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full tracking-wide shadow-sm">
// //             {off}% OFF
// //           </span>
// //         </div>
// //       )}

// //       {/* ── Wishlist Button ── */}
// //       <button
// //         aria-label="Wishlist"
// //         className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-rose-50 hover:text-rose-500 text-slate-400"
// //       >
// //         <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
// //         </svg>
// //       </button>

// //       {/* ── Image Block ── */}
// //       <Link
// //         to={`/product/${pid}`}
// //         aria-label={product.title || "Product"}
// //         className="block relative w-full aspect-[4/3] overflow-hidden bg-slate-50"
// //       >
// //         {url && !imgError ? (
// //           <img
// //             src={url}
// //             alt={product.title || "product"}
// //             onError={() => setImgError(true)}
// //             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
// //           />
// //         ) : (
// //           <PlaceholderSVG alt={product.title} />
// //         )}

// //         {/* Hover overlay */}
// //         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
// //       </Link>

// //       {/* ── Body ── */}
// //       <div className="flex flex-col flex-1 p-4 gap-2">

// //         {/* Brand */}
// //         {product.brand && (
// //           <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-500">
// //             {product.brand}
// //           </span>
// //         )}

// //         {/* Title */}
// //         <Link
// //           to={`/product/${pid}`}
// //           className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 hover:text-indigo-600 transition-colors duration-150"
// //         >
// //           {product.title || product.name || "Product"}
// //         </Link>

// //         {/* Star rating placeholder */}
// //         <div className="flex items-center gap-1">
// //           {[1,2,3,4,5].map((s) => (
// //             <svg key={s} className={`w-3 h-3 ${s <= 4 ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
// //               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //             </svg>
// //           ))}
// //           <span className="text-[11px] text-slate-400 ml-0.5">(128)</span>
// //         </div>

// //         {/* Spacer pushes price + button to bottom */}
// //         <div className="flex-1" />

// //         {/* Price Row */}
// //         <div className="flex items-baseline gap-2 mt-1">
// //           <span className="text-lg font-bold text-slate-900 tracking-tight">
// //             ₹{price.toLocaleString("en-IN")}
// //           </span>
// //           {hasDiscount && (
// //             <span className="text-xs text-slate-400 line-through">
// //               ₹{old.toLocaleString("en-IN")}
// //             </span>
// //           )}
// //         </div>

// //         {/* Add to Cart Button */}
// //         <button
// //           onClick={onAdd}
// //           className={`mt-2 w-full py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
// //             ${added
// //               ? "bg-emerald-500 text-white"
// //               : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white"
// //             }`}
// //         >
// //           {added ? (
// //             <>
// //               <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
// //               </svg>
// //               Added!
// //             </>
// //           ) : (
// //             <>
// //               <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
// //               </svg>
// //               Add to Cart
// //             </>
// //           )}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }




// return (
//   <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-200">

//     {off && (
//       <div className="absolute left-3 top-3 z-20">
//         <span className="rounded-full bg-gradient-to-r from-rose-500 to-red-600 px-3 py-1 text-[11px] font-bold text-white shadow-lg">
//           {off}% OFF
//         </span>
//       </div>
//     )}

//     <button
//       aria-label="Wishlist"
//       className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-rose-50 hover:text-rose-500"
//     >
//       <svg
//         className="h-5 w-5"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth={2}
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//         />
//       </svg>
//     </button>

//     <Link
//       to={`/product/${pid}`}
//       className="relative block overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 aspect-[4/3]"
//     >
//       {url && !imgError ? (
//         <img
//           src={url}
//           alt={product.title || "product"}
//           onError={() => setImgError(true)}
//           className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />
//       ) : (
//         <PlaceholderSVG alt={product.title} />
//       )}

//       <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
//     </Link>

//     <div className="flex flex-1 flex-col p-5">

//       {product.brand && (
//         <span className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-600">
//           {product.brand}
//         </span>
//       )}

//       <Link
//         to={`/product/${pid}`}
//         className="line-clamp-2 min-h-[48px] text-[15px] font-semibold leading-6 text-slate-800 transition-colors hover:text-indigo-600"
//       >
//         {product.title || product.name || "Product"}
//       </Link>

//       <div className="mt-3 flex items-center gap-2">
//         <div className="flex items-center rounded-full bg-amber-50 px-2 py-1">
//           {[1, 2, 3, 4, 5].map((s) => (
//             <svg
//               key={s}
//               className={`h-3.5 w-3.5 ${
//                 s <= 4 ? "text-amber-400" : "text-slate-300"
//               }`}
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//           ))}
//         </div>

//         <span className="text-xs font-medium text-slate-500">
//           4.2 (128 Reviews)
//         </span>
//       </div>

//       <div className="flex-1" />

//       <div className="mt-4 flex items-end gap-2">
//         <span className="text-2xl font-extrabold tracking-tight text-slate-900">
//           ₹{price.toLocaleString("en-IN")}
//         </span>

//         {hasDiscount && (
//           <span className="pb-1 text-sm text-slate-400 line-through">
//             ₹{old.toLocaleString("en-IN")}
//           </span>
//         )}
//       </div>

//       {hasDiscount && (
//         <span className="mt-1 text-sm font-semibold text-emerald-600">
//           You Save ₹{(old - price).toLocaleString("en-IN")}
//         </span>
//       )}

//       <button
//         onClick={onAdd}
//         className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl py-3 font-semibold transition-all duration-300
//         ${
//           added
//             ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
//             : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-xl hover:shadow-indigo-200"
//         }`}
//       >
//         {added ? (
//           <>
//             ✓ Added Successfully
//           </>
//         ) : (
//           <>
//             Add To Cart
//           </>
//         )}
//       </button>
//     </div>
//   </div>
// );


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice.js";
import { API_BASE } from "../api/http.js";

function safeImageUrl(p) {
  const src = p?.images?.[0] || p?.image || p?.thumbnail || "";
  if (!src) return null;
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/uploads")) return `${API_BASE}${src}`;
  return `${API_BASE}/${src.replace(/^\/+/, "")}`;
}

function PlaceholderSVG({ alt = "image" }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-100">
      <svg
        viewBox="0 0 120 90"
        role="img"
        aria-label={alt}
        className="w-2/3 h-2/3 opacity-40"
      >
        <rect width="120" height="90" fill="#e2e8f0" />
        <circle cx="36" cy="36" r="12" fill="#cbd5e1" />
        <path d="M10 80 L48 46 L70 64 L92 50 L110 80 Z" fill="#cbd5e1" />
      </svg>
    </div>
  );
}

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const url = safeImageUrl(product);
  const price = Number(product.price || 0);
  const old = Number(product.oldPrice || 0);
  const hasDiscount = old > price && price > 0;
  const off = hasDiscount
    ? Math.round(((old - price) / old) * 100)
    : null;

  const pid = product._id || product.id;

  const onAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        ...product,
        qty: 1,
        images: product.images || (product.image ? [product.image] : []),
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-indigo-100 flex flex-col">

      {/* ── Discount Badge ── */}
      {off && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full tracking-wide shadow-sm">
            {off}% OFF
          </span>
        </div>
      )}

      {/* ── Wishlist Button ── */}
      <button
        aria-label="Wishlist"
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-rose-50 hover:text-rose-500 text-slate-400"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* ── Image Block ── */}
      <Link
        to={`/product/${pid}`}
        aria-label={product.title || "Product"}
        className="block relative w-full aspect-[4/3] overflow-hidden bg-slate-50"
      >
        {url && !imgError ? (
          <img
            src={url}
            alt={product.title || "product"}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderSVG alt={product.title} />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </Link>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-2">

        {/* Brand */}
        {product.brand && (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-500">
            {product.brand}
          </span>
        )}

        {/* Title */}
        <Link
          to={`/product/${pid}`}
          className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 hover:text-indigo-600 transition-colors duration-150"
        >
          {product.title || product.name || "Product"}
        </Link>

        {/* Star rating placeholder */}
        <div className="flex items-center gap-1">
          {[1,2,3,4,5].map((s) => (
            <svg key={s} className={`w-3 h-3 ${s <= 4 ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[11px] text-slate-400 ml-0.5">(128)</span>
        </div>

        {/* Spacer pushes price + button to bottom */}
        <div className="flex-1" />

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-bold text-slate-900 tracking-tight">
            ₹{price.toLocaleString("en-IN")}
          </span>
          {hasDiscount && (
            <span className="text-xs text-slate-400 line-through">
              ₹{old.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAdd}
          className={`mt-2 w-full py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
            ${added
              ? "bg-emerald-500 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white"
            }`}
        >
          {added ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Added!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}