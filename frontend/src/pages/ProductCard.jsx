// // import React from "react";
// // import { API_BASE } from "../api/http.js";

// // // inline placeholder (no network)
// // const PH =
// //   "data:image/svg+xml;utf8," +
// //   encodeURIComponent(
// //     `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
// //       <rect width="100%" height="100%" fill="#f3f4f6"/>
// //       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
// //         font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#9ca3af">IMG</text>
// //     </svg>`
// //   );

// // const srcUrl = (u) => (!u ? PH : u.startsWith("/uploads") ? `${API_BASE}${u}` : u);

// // export default function ProductCard({ p, onAdd = () => {} }) {
// //   // If the product is missing, render nothing (avoids crashes)
// //   if (!p || typeof p !== "object") return null;

// //   const title = p.title || "Untitled";
// //   const brand = p.brand || "";
// //   const price = Number(p.price) || 0;
// //   const cover = srcUrl(p.images?.[0]);

// //   return (
// //     <div className="card">
// //       <img
// //         src={cover}
// //         alt={title}
// //         style={{ width: "100%", height: 260, objectFit: "cover" }}
// //         onError={(e) => (e.currentTarget.src = PH)}
// //       />
// //       <div className="p16">
// //         {brand && <div className="muted">{brand}</div>}
// //         <div className="title">{title}</div>
// //         <div>₹{price}</div>
// //         <button className="btn mt8" onClick={() => onAdd(p)}>Add to cart</button>
// //       </div>
// //     </div>
// //   );
// // }


// import React from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../store/cartSlice.js"; // ✅ correct action
// import { API_BASE } from "../api/http.js";
// import "./ProductCard.css";

// function safeImageUrl(p) {
//   const src = p?.images?.[0] || p?.image || p?.thumbnail || "";
//   if (!src) return null;
//   if (/^https?:\/\//i.test(src)) return src;
//   if (src.startsWith("/uploads")) return `${API_BASE}${src}`;
//   return `${API_BASE}/${src.replace(/^\/+/, "")}`;
// }

// function PlaceholderSVG({ alt = "image" }) {
//   return (
//     <div className="pc-img ph">
//       <svg viewBox="0 0 120 90" role="img" aria-label={alt} style={{ width: "100%", height: "100%" }}>
//         <rect width="120" height="90" fill="#f3f4f6" />
//         <circle cx="36" cy="36" r="12" fill="#e5e7eb" />
//         <path d="M10 80 L48 46 L70 64 L92 50 L110 80 Z" fill="#e5e7eb" />
//       </svg>
//     </div>
//   );
// }

// export default function ProductCard({ product }) {
//   const dispatch = useDispatch();
//   if (!product) return null;

//   const url = safeImageUrl(product);
//   const price = Number(product.price || 0);
//   const old = Number(product.oldPrice || 0);
//   const hasDiscount = old > price && price > 0;
//   const off = hasDiscount ? Math.round(((old - price) / old) * 100).toString() : null;

//   const onAdd = () => {
//     // Keep payload shape consistent with your cart slice usage elsewhere
//     dispatch(
//       addToCart({
//         ...product,
//         qty: 1,
//         images: product.images || (product.image ? [product.image] : []),
//       })
//     );
//   };

//   const pid = product._id || product.id;

//   return (
//     <div className="pc">
//       <Link to={`/product/${pid}`} className="pc-img" aria-label={product.title || "Product"}>
//         {url ? <img src={url} alt={product.title || "product"} /> : <PlaceholderSVG alt={product.title} />}
//       </Link>

//       <div className="pc-body">
//         <div className="pc-brand">{product.brand || ""}</div>
//         <Link to={`/product/${pid}`} className="pc-title">
//           {product.title || product.name || "Product"}
//         </Link>

//         <div className="pc-priceRow">
//           <span className="pc-price">₹{price || 0}</span>
//           {hasDiscount && <span className="pc-old">₹{old}</span>}
//           {off && <span className="pc-off">{off}% off</span>}
//         </div>

//         <button className="btn btn-cart" onClick={onAdd}>
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice.js";
import { API_BASE } from "../api/http.js";
import "./ProductCard.css";

function safeImageUrl(p) {
  const src = p?.images?.[0] || p?.image || p?.thumbnail || "";
  if (!src) return null;
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/uploads")) return `${API_BASE}${src}`;
  return `${API_BASE}/${src.replace(/^\/+/, "")}`;
}

function PlaceholderSVG({ alt = "image" }) {
  return (
    <div className="pc-img ph">
      <svg
        viewBox="0 0 120 90"
        role="img"
        aria-label={alt}
        style={{ width: "100%", height: "100%" }}
      >
        <rect width="120" height="90" fill="#f3f4f6" />
        <circle cx="36" cy="36" r="12" fill="#e5e7eb" />
        <path
          d="M10 80 L48 46 L70 64 L92 50 L110 80 Z"
          fill="#e5e7eb"
        />
      </svg>
    </div>
  );
}

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  if (!product) return null;

  const url = safeImageUrl(product);
  const price = Number(product.price || 0);
  const old = Number(product.oldPrice || 0);
  const hasDiscount = old > price && price > 0;
  const off = hasDiscount
    ? Math.round(((old - price) / old) * 100).toString()
    : null;

  const onAdd = () => {
    dispatch(
      addToCart({
        ...product,
        qty: 1,
        images: product.images || (product.image ? [product.image] : []),
      })
    );
  };

  const pid = product._id || product.id;

  return (
    <div className="pc">
      <Link
        to={`/product/${pid}`}
        className="pc-img"
        aria-label={product.title || "Product"}
      >
        {url ? (
          <img src={url} alt={product.title || "product"} />
        ) : (
          <PlaceholderSVG alt={product.title} />
        )}
      </Link>

      <div className="pc-body">
        <div className="pc-brand">{product.brand || ""}</div>
        <Link to={`/product/${pid}`} className="pc-title">
          {product.title || product.name || "Product"}
        </Link>

        <div className="pc-priceRow">
          <span className="pc-price">₹{price || 0}</span>
          {hasDiscount && <span className="pc-old">₹{old}</span>}
          {off && <span className="pc-off">{off}% off</span>}
        </div>

        <button className="btn btn-cart" onClick={onAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
