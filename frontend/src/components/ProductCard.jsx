// // // import React from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { imageURL } from '../store/productSlice.js';
// // // import './ProductCard.css';

// // // export default function ProductCard({ p }){
// // //   const img = p.images?.[0] ? imageURL(p.images[0]) : '';
// // //   return (
// // //     <div className="card">
// // //       <Link to={`/product/${p._id}`}><div className="thumb">{img ? <img src={img} alt={p.title}/> : <div className="ph">IMG</div>}</div></Link>
// // //       <div className="meta">
// // //         <div className="brand">{p.brand}</div>
// // //         <div className="title">{p.title}</div>
// // //         <div className="price">₹{p.price}</div>
// // //       </div>
// // //       <Link to={`/product/${p._id}`} className="btn">View</Link>
// // //     </div>
// // //   );
// // // }


// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // import { addItem } from "../store/cartSlice.js";
// // import { API_BASE } from "../api/http.js";
// // import "./ProductCard.css";

// // function safeImageUrl(p) {
// //   const src =
// //     p?.images?.[0] ||
// //     p?.image ||
// //     p?.thumbnail ||
// //     ""; // may be empty

// //   if (!src) return null;

// //   // If it's already http(s), use as-is
// //   if (/^https?:\/\//i.test(src)) return src;

// //   // If served by our backend uploads
// //   if (src.startsWith("/uploads")) return `${API_BASE}${src}`;

// //   // Otherwise treat as relative and prefix base
// //   return `${API_BASE}/${src.replace(/^\/+/, "")}`;
// // }

// // function PlaceholderSVG({ alt = "image" }) {
// //   return (
// //     <div className="pc-img ph">
// //       <svg
// //         viewBox="0 0 120 90"
// //         role="img"
// //         aria-label={alt}
// //         style={{ width: "100%", height: "100%" }}
// //       >
// //         <rect width="120" height="90" fill="#f3f4f6" />
// //         <circle cx="36" cy="36" r="12" fill="#e5e7eb" />
// //         <path d="M10 80 L48 46 L70 64 L92 50 L110 80 Z" fill="#e5e7eb" />
// //       </svg>
// //     </div>
// //   );
// // }

// // export default function ProductCard({ product }) {
// //   const dispatch = useDispatch();

// //   if (!product) return null;

// //   const url = safeImageUrl(product);
// //   const price = Number(product.price || 0);
// //   const old = Number(product.oldPrice || 0);
// //   const hasDiscount = old > price && price > 0;
// //   const off =
// //     hasDiscount ? Math.round(((old - price) / old) * 100).toString() : null;

// //   const onAdd = () => {
// //     // minimal cart shape
// //     dispatch(
// //       addItem({
// //         _id: product._id || product.id,
// //         title: product.title || product.name || "Product",
// //         price: price || 0,
// //         qty: 1,
// //         images: product.images || (product.image ? [product.image] : []),
// //         variants: product.variants || [],
// //         sku:
// //           product?.variants?.[0]?.sku ||
// //           product.sku ||
// //           `${(product._id || product.id || "SKU").toString().slice(-6)}`,
// //       })
// //     );
// //   };

// //   return (
// //     <div className="pc">
// //       <Link
// //         to={`/product/${product._id || product.id}`}
// //         className="pc-img"
// //         aria-label={product.title || "Product"}
// //       >
// //         {url ? <img src={url} alt={product.title || "product"} /> : <PlaceholderSVG alt={product.title} />}
// //       </Link>

// //       <div className="pc-body">
// //         <div className="pc-brand">{product.brand || ""}</div>
// //         <Link to={`/product/${product._id || product.id}`} className="pc-title">
// //           {product.title || product.name || "Product"}
// //         </Link>

// //         <div className="pc-priceRow">
// //           <span className="pc-price">₹{price || 0}</span>
// //           {hasDiscount && <span className="pc-old">₹{old}</span>}
// //           {off && <span className="pc-off">{off}% off</span>}
// //         </div>

// //         <button className="btn btn-cart" onClick={onAdd}>
// //           Add to Cart
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }


// import React from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addItem } from "../store/cartSlice.js";
// import { API_BASE } from "../api/http.js";
// import { toast } from "react-toastify";            // ✅ toast
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
//   const off = hasDiscount ? Math.round(((old - price) / old) * 100) : null;

//   const pid = product._id || product.id;
//   const title = product.title || product.name || "Product";

//   const onAdd = () => {
//     dispatch(
//       addItem({
//         _id: pid,
//         title,
//         price: price || 0,
//         qty: 1,
//         images: product.images || (product.image ? [product.image] : []),
//         variants: product.variants || [],
//         sku:
//           product?.variants?.[0]?.sku ||
//           product.sku ||
//           `${(pid || "SKU").toString().slice(-6)}`,
//       })
//     );

//     // ✅ toast
//     toast.success("Added to cart 🛒", { toastId: `add-${pid}` });
//   };

//   return (
//     <article className="pc" tabIndex={0}>
//       <Link to={`/product/${pid}`} className="pc-img" aria-label={title}>
//         {url ? <img src={url} alt={title} loading="lazy" /> : <PlaceholderSVG alt={title} />}
//         {off ? <span className="pc-badge">-{off}%</span> : null}
//       </Link>

//       <div className="pc-body">
//         <div className="pc-brand" title={product.brand || ""}>
//           {product.brand || "—"}
//         </div>

//         <Link to={`/product/${pid}`} className="pc-title" title={title}>
//           {title}
//         </Link>

//         <div className="pc-priceRow">
//           <span className="pc-price">₹{price || 0}</span>
//           {hasDiscount && <span className="pc-old">₹{old}</span>}
//           {hasDiscount && <span className="pc-off">{off}% off</span>}
//         </div>

//         <div className="pc-actions">
//           <button className="btn btn-cart" onClick={onAdd} aria-label="Add to Cart">
//             <span className="btn-icon" aria-hidden>🛒</span>
//             <span>Add to Cart</span>
//           </button>
//           <Link className="btn btn-ghost" to={`/product/${pid}`} aria-label="View Details">
//             View
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// ⬇️ cartSlice: if your action is named addItem, change the import accordingly.
import { addToCart } from "../store/cartSlice.js";
import { toggleWish, removeWish } from "../store/wishlistSlice.js"; // ✅ your slice
import { API_BASE } from "../api/http.js";
import { toast } from "react-toastify";
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
      <svg viewBox="0 0 120 90" role="img" aria-label={alt} style={{ width: "100%", height: "100%" }}>
        <rect width="120" height="90" fill="#f3f4f6" />
        <circle cx="36" cy="36" r="12" fill="#e5e7eb" />
        <path d="M10 80 L48 46 L70 64 L92 50 L110 80 Z" fill="#e5e7eb" />
      </svg>
    </div>
  );
}

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((s) => s.wishlist?.items || []);
  if (!product) return null;

  const pid = product._id || product.id;
  const title = product.title || product.name || "Product";
  const url = safeImageUrl(product);

  const price = Number(product.price || 0);
  const old = Number(product.oldPrice || 0);
  const hasDiscount = old > price && price > 0;
  const off = hasDiscount ? Math.round(((old - price) / old) * 100) : null;

  const isWished = wishlistItems.some((w) => (w._id || w.id) === pid);

  const onQuickAdd = () => {
    // NOTE: if your cart slice uses addItem instead of addToCart, just change the import.
    dispatch(
      addToCart({
        _id: pid,
        title,
        price: price || 0,
        qty: 1,
        images: product.images || (product.image ? [product.image] : []),
        variants: product.variants || [],
        sku: product?.variants?.[0]?.sku || product.sku || `${(pid || "SKU").toString().slice(-6)}`,
        brand: product.brand || "",
      })
    );
    toast.success("Added to cart 🛒", { toastId: `card-add-${pid}` });
  };

  const onToggleWish = () => {
    dispatch(toggleWish(product));
    if (isWished) toast.info("Removed from wishlist");
    else toast.success("Saved to wishlist ❤️", { toastId: `wish-${pid}` });
  };

  const onShare = async () => {
    const shareUrl = `${window.location.origin}/product/${pid}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text: title, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard");
      }
    } catch {
      // user cancelled share — ignore
    }
  };

  return (
    <article className="pc" tabIndex={0}>
      <div className="pc-media">
        <Link to={`/product/${pid}`} className="pc-img" aria-label={title}>
          {url ? <img src={url} alt={title} loading="lazy" /> : <PlaceholderSVG alt={title} />}
          {off ? <span className="pc-badge">-{off}%</span> : null}
        </Link>

        {/* top-right quick actions */}
        <div className="pc-topactions" aria-label="Quick actions">
          <button
            type="button"
            className={`ico-btn heart ${isWished ? "on" : ""}`}
            onClick={onToggleWish}
            title={isWished ? "Remove from Wishlist" : "Add to Wishlist"}
            aria-label={isWished ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            ♥
          </button>

          <button
            type="button"
            className="ico-btn cart"
            onClick={onQuickAdd}
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            🛒
          </button>

          <button
            type="button"
            className="ico-btn share"
            onClick={onShare}
            title="Share"
            aria-label="Share"
          >
            ↗
          </button>
        </div>
      </div>

      <div className="pc-body">
        <div className="pc-brand">{product.brand || ""}</div>
        <Link to={`/product/${pid}`} className="pc-title" title={title}>
          {title}
        </Link>

        <div className="pc-priceRow">
          <span className="pc-price">₹{price || 0}</span>
          {hasDiscount && <span className="pc-old">₹{old}</span>}
          {hasDiscount && <span className="pc-off">{off}% off</span>}
        </div>

        <div className="pc-actions">
          <button className="btn btn-cart" onClick={onQuickAdd}>
            <span className="btn-icon">🛒</span> Add to Cart
          </button>
          <Link className="btn btn-ghost" to={`/product/${pid}`}>View</Link>
        </div>
      </div>
    </article>
  );
}
