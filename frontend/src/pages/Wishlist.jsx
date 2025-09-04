// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { removeWish } from "../store/wishlistSlice.js";
// import { addToCart } from "../store/cartSlice.js";
// import { useNavigate } from "react-router-dom";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
// const imgUrl = (src) => (src?.startsWith("/uploads") ? `${API_BASE}${src}` : (src || ""));

// export default function Wishlist() {
//   const { items } = useSelector(s => s.wishlist);
//   const dispatch = useDispatch();
//   const nav = useNavigate();

//   return (
//     <div className="container">
//       <h2>My Wishlist</h2>
//       {!items.length && <p>No items saved.</p>}

//       <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))", gap:12}}>
//         {items.map(p => (
//           <div key={p._id} className="pd-sim-card">
//             <img src={imgUrl(p.images?.[0])} alt={p.title}/>
//             <div className="title">{p.title}</div>
//             <div className="price">₹{p.price}</div>
//             <div className="row gap">
//               <button className="btn sm" onClick={() => dispatch(addToCart({ ...p, qty:1 }))}>Add to Cart</button>
//               <button className="btn sm outline" onClick={() => nav(`/product/${p._id}`)}>View</button>
//               <button className="btn sm outline" onClick={() => dispatch(removeWish(p._id))}>Remove</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeWish } from "../store/wishlistSlice.js";
import { addToCart } from "../store/cartSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Wishlist.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function safeImage(src) {
  if (!src) return null;
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/uploads")) return `${API_BASE}${src}`;
  return `${API_BASE}/${src.replace(/^\/+/, "")}`;
}

function Placeholder() {
  return (
    <div className="wl-img ph" aria-label="No image">
      <svg viewBox="0 0 120 90" width="100%" height="100%" role="img" aria-hidden="true">
        <rect width="120" height="90" fill="#f3f4f6" />
        <circle cx="38" cy="36" r="12" fill="#e5e7eb" />
        <path d="M10 80 L48 46 L70 64 L92 50 L110 80 Z" fill="#e5e7eb" />
      </svg>
    </div>
  );
}

export default function Wishlist() {
  const { items } = useSelector((s) => s.wishlist);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const total = useMemo(
    () => items.reduce((s, i) => s + (Number(i.price) || 0), 0),
    [items]
  );

  const onAdd = (p) => {
    dispatch(addToCart({ ...p, qty: 1 }));
    toast.success("Added to cart 🛒", { toastId: `wish-add-${p._id}` });
  };

  const onRemove = (id) => {
    dispatch(removeWish(id));
    toast.info("Removed from wishlist");
  };

  return (
    <div className="wl-wrap container">
      <header className="wl-head">
        <h2>My Wishlist</h2>
        <div className="wl-meta">
          <span className="chip">{items.length}</span>
          <span className="muted">item(s)</span>
          {!!items.length && (
            <span className="muted total">• Total MRP: <b>₹{total.toLocaleString("en-IN")}</b></span>
          )}
        </div>
      </header>

      {!items.length ? (
        <div className="wl-empty">
          <div className="wl-empty-box">
            ❤️ Your wishlist is empty. <button className="link-btn" onClick={() => nav("/shop")}>Browse products</button>
          </div>
        </div>
      ) : (
        <div className="wl-grid">
          {items.map((p) => {
            const url = safeImage(p?.images?.[0] || p?.image || p?.thumbnail);
            return (
              <article className="wl-card" key={p._id}>
                <div className="wl-img">
                  {url ? <img src={url} alt={p.title || "Product"} loading="lazy" /> : <Placeholder />}
                </div>
                <div className="wl-body">
                  <div className="wl-title" title={p.title}>{p.title}</div>
                  <div className="wl-price">₹{Number(p.price || 0).toLocaleString("en-IN")}</div>
                  <div className="wl-actions">
                    <button className="btn btn-dark" onClick={() => onAdd(p)}>
                      🛒 Add to Cart
                    </button>
                    <button className="btn btn-light" onClick={() => nav(`/product/${p._id}`)}>
                      View
                    </button>
                    <button className="btn btn-danger" onClick={() => onRemove(p._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
