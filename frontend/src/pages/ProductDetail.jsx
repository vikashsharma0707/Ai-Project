



// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import http from "../api/http.js";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../store/cartSlice.js";
// import RecoRail from "../components/RecoRail.jsx";
// import ReviewSummary from "../components/ReviewSummary.jsx";
// import SizeAdvisor from "../components/SizeAdvisor.jsx";
// import "./ProductDetail.css";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
// const imgUrl = (src) => (src?.startsWith("/uploads") ? `${API_BASE}${src}` : (src || ""));

// export default function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [active, setActive] = useState(0);
//   const [qty, setQty] = useState(1);
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [showGuide, setShowGuide] = useState(false);
//   const [error, setError] = useState("");

//   const dispatch = useDispatch();
//   const nav = useNavigate();

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setError("");
//         const { data } = await http.get(`/api/products/${id}`);
//         if (!mounted) return;
//         setProduct(data);
//         // sensible defaults
//         const first = data?.variants?.[0];
//         setSelectedColor(first?.color || "default");
//         setSelectedSize(first?.size || (data?.variants?.length ? "" : "free"));
//       } catch (e) {
//         if (!mounted) return;
//         setError("Product load failed");
//       }
//     })();
//     return () => { mounted = false; };
//   }, [id]);

//   const colors = useMemo(() => {
//     const set = new Set((product?.variants || []).map(v => (v.color || "default")));
//     return [...set];
//   }, [product]);

//   const sizes = useMemo(() => {
//     const set = new Set((product?.variants || []).map(v => (v.size || "free")));
//     return [...set];
//   }, [product]);

//   const chosen =
//     product?.variants?.find(
//       v => (v.color || "default") === (selectedColor || "default") &&
//            (v.size || "free") === (selectedSize || "free")
//     ) || null;

//   const stock = Number(chosen?.stock ?? 0);
//   const sizeRequired = sizes.length > 0 && !["free","one size","onesize","free size"].includes((sizes[0]||"").toLowerCase());
//   const canBuy = (!sizeRequired || !!selectedSize) && stock > 0;

//   const add = () => {
//     if (sizeRequired && !selectedSize) {
//       setError("Please select a size");
//       return;
//     }
//     setError("");
//     dispatch(addToCart({
//       ...product,
//       sku: chosen?.sku || product?.variants?.[0]?.sku || 'SKU',
//       size: selectedSize || 'free',
//       color: selectedColor || 'default',
//       qty
//     }));
//   };

//   const buy = () => {
//     add();
//     // if validation failed, don't navigate
//     if (sizeRequired && !selectedSize) return;
//     if ((chosen?.stock ?? 0) <= 0) return;
//     nav("/checkout");
//   };

//   if (error && !product) {
//     return <div className="container"><p className="error">{error}</p></div>;
//   }
//   if (!product) return <div className="container"><p>Loading…</p></div>;

//   return (
//     <div className="container product-detail">
//       <div className="pd-grid">
//         {/* Gallery */}
//         <div className="pd-gallery">
//           <div className="pd-thumbs">
//             {(product.images || []).map((src, i) => (
//               <div key={i} className={`pd-thumb ${active===i?'active':''}`} onClick={()=>setActive(i)}>
//                 <img src={imgUrl(src)} alt={`${product.title} thumbnail ${i+1}`} />
//               </div>
//             ))}
//           </div>
//           <div className="pd-mainimg">
//             {product.images?.[active]
//               ? <img src={imgUrl(product.images[active])} alt={product.title}/>
//               : <div className="noimg">No Image</div>}
//           </div>
//         </div>

//         {/* Info */}
//         <div className="pd-info">
//           <div className="pd-breadcrumb">{(product.category || '').toUpperCase()} • {product.brand}</div>
//           <h1 className="pd-title">{product.title}</h1>

//           <div className="pd-rating">
//             <span className="pd-pill">{(product.ratingAvg || 0).toFixed(1)}★</span>
//             <span className="muted">{product.ratingCount || 0} ratings</span>
//           </div>

//           <div className="pd-priceRow">
//             <div className="pd-price">₹{product.price}</div>
//             {product.oldPrice ? <div className="pd-old">₹{product.oldPrice}</div> : null}
//             {product.oldPrice ? (
//               <div className="pd-discount">
//                 {Math.max(0, Math.round(100 - (product.price / product.oldPrice) * 100))}% off
//               </div>
//             ) : null}
//           </div>

//           {colors.length ? (
//             <div className="pd-section">
//               <div className="pd-label">Color</div>
//               <div className="pd-swatches">
//                 {colors.map(c => (
//                   <button key={c}
//                           className={`swatch ${selectedColor===c?'selected':''}`}
//                           onClick={()=>setSelectedColor(c)}>
//                     <span style={{background: c==='default'?'#f3f4f6': c}}/>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ) : null}

//           {sizes.length ? (
//             <div className="pd-section">
//               <div className="pd-label">Size</div>
//               <div className="pd-sizes">
//                 {sizes.map((s) => (
//                   <button
//                     key={s}
//                     className={`sizebtn ${selectedSize === s ? "active" : ""}`}
//                     onClick={() => setSelectedSize(s)}
//                   >
//                     {String(s).toUpperCase()}
//                   </button>
//                 ))}
//                 <a className="sizechart" href="#"
//                    onClick={(e) => { e.preventDefault(); setShowGuide(true); }}>
//                   Size Chart
//                 </a>
//               </div>
//             </div>
//           ) : null}

//           {/* Size Advisor (fixed: product prop instead of undefined `p`) */}
//           <SizeAdvisor
//             product={product}
//             selectedSize={selectedSize}
//             onPick={(sz) => setSelectedSize(sz)}
//           />

//           <div className="pd-actions">
//             <div className="qty">
//               <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
//               <input
//                 inputMode="numeric"
//                 value={qty}
//                 onChange={(e)=> {
//                   const val = Number(e.target.value);
//                   setQty(Number.isFinite(val) && val > 0 ? Math.floor(val) : 1);
//                 }}
//               />
//               <button onClick={() => setQty((q) => q + 1)}>+</button>
//             </div>
//             <button className="btn btn-cart" onClick={add} disabled={!canBuy}>ADD TO CART</button>
//             <button className="btn btn-buy" onClick={buy} disabled={!canBuy}>BUY NOW</button>
//             <span className="muted">
//               {canBuy ? `In stock: ${stock}` : stock <= 0 ? `Out of stock` : `Select size`}
//             </span>
//           </div>

//           {error ? <p className="error" style={{marginTop:8}}>{error}</p> : null}

//           <div className="pd-section">
//             <div className="pd-label">Offers</div>
//             <ul className="pd-coupons">
//               <li>Free returns within 7 days</li>
//               <li>Cash on Delivery available</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* AI widgets */}
//       <div className="panel">
//         <h3>Review Summary</h3>
//         <ReviewSummary id={product._id} />
//       </div>

//       <div className="panel">
//         <h3>Similar Products</h3>
//         <RecoRail product={product}/>
//       </div>

//       {/* Size guide modal */}
//       {showGuide && (
//         <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,.4)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50}}
//              onClick={()=>setShowGuide(false)}>
//           <div className="panel" style={{width:520}} onClick={e=>e.stopPropagation()}>
//             <h3>Size Guide</h3>
//             <table className="table">
//               <thead><tr><th>Size</th><th>Chest (in)</th><th>Length (in)</th></tr></thead>
//               <tbody>
//                 <tr><td>S</td><td>36-38</td><td>26</td></tr>
//                 <tr><td>M</td><td>38-40</td><td>27</td></tr>
//                 <tr><td>L</td><td>40-42</td><td>28</td></tr>
//                 <tr><td>XL</td><td>42-44</td><td>29</td></tr>
//               </tbody>
//             </table>
//             <div className="row" style={{justifyContent:"flex-end"}}>
//               <button className="btn" onClick={()=>setShowGuide(false)}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// frontend/src/pages/ProductDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import http from "../api/http.js";
import { addToCart } from "../store/cartSlice.js";
import RecoRail from "../components/RecoRail.jsx";
import ReviewSummary from "../components/ReviewSummary.jsx";
import SizeAdvisor from "../components/SizeAdvisor.jsx";
import VirtualTryOn from "../components/VirtualTryOn.jsx";
import "./ProductDetail.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const imgUrl = (src) => (src?.startsWith("/uploads") ? `${API_BASE}${src}` : (src || ""));

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setError("");
        const { data } = await http.get(`/api/products/${id}`);
        if (!mounted) return;
        setProduct(data);
        const first = data?.variants?.[0];
        setSelectedColor(first?.color || "default");
        setSelectedSize(first?.size || (data?.variants?.length ? "" : "free"));
      } catch (e) {
        if (!mounted) return;
        setError("Product load failed");
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const colors = useMemo(() => {
    const set = new Set((product?.variants || []).map(v => (v.color || "default")));
    return [...set];
  }, [product]);

  const sizes = useMemo(() => {
    const set = new Set((product?.variants || []).map(v => (v.size || "free")));
    return [...set];
  }, [product]);

  const chosen = product?.variants?.find(
    v => (v.color || "default") === (selectedColor || "default") &&
         (v.size || "free") === (selectedSize || "free")
  ) || null;

  const stock = Number(chosen?.stock ?? 0);
  const sizeRequired = sizes.length > 0 && !["free","one size","onesize","free size"].includes((sizes[0]||"").toLowerCase());
  const canBuy = (!sizeRequired || !!selectedSize) && stock > 0;

  const add = () => {
    if (sizeRequired && !selectedSize) {
      setError("Please select a size");
      return;
    }
    setError("");
    dispatch(addToCart({
      ...product,
      sku: chosen?.sku || product?.variants?.[0]?.sku || 'SKU',
      size: selectedSize || 'free',
      color: selectedColor || 'default',
      qty
    }));
  };

  const buy = () => {
    add();
    if (sizeRequired && !selectedSize) return;
    if ((chosen?.stock ?? 0) <= 0) return;
    nav("/checkout");
  };

  if (error && !product) return <div className="container"><p className="error">{error}</p></div>;
  if (!product) return <div className="container"><p>Loading…</p></div>;

  return (
    <div className="container product-detail">
      <div className="pd-grid">
        {/* Gallery */}
        <div className="pd-gallery">
          <div className="pd-thumbs">
            {(product.images || []).map((src, i) => (
              <div key={i} className={`pd-thumb ${active===i?'active':''}`} onClick={()=>setActive(i)}>
                <img src={imgUrl(src)} alt={`${product.title} thumbnail ${i+1}`} />
              </div>
            ))}
          </div>
          <div className="pd-mainimg">
            {product.images?.[active]
              ? <img src={imgUrl(product.images[active])} alt={product.title}/>
              : <div className="noimg">No Image</div>}
          </div>
        </div>

        {/* Info */}
        <div className="pd-info">
          <div className="pd-breadcrumb">{(product.category || '').toUpperCase()} • {product.brand}</div>
          <h1 className="pd-title">{product.title}</h1>

          <div className="pd-rating">
            <span className="pd-pill">{(product.ratingAvg || 0).toFixed(1)}★</span>
            <span className="muted">{product.ratingCount || 0} ratings</span>
          </div>

          <div className="pd-priceRow">
            <div className="pd-price">₹{product.price}</div>
            {product.oldPrice ? <div className="pd-old">₹{product.oldPrice}</div> : null}
            {product.oldPrice ? (
              <div className="pd-discount">
                {Math.max(0, Math.round(100 - (product.price / product.oldPrice) * 100))}% off
              </div>
            ) : null}
          </div>

          {colors.length ? (
            <div className="pd-section">
              <div className="pd-label">Color</div>
              <div className="pd-swatches">
                {colors.map(c => (
                  <button key={c}
                          className={`swatch ${selectedColor===c?'selected':''}`}
                          onClick={()=>setSelectedColor(c)}>
                    <span style={{background: c==='default'?'#f3f4f6': c}}/>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {sizes.length ? (
            <div className="pd-section">
              <div className="pd-label">Size</div>
              <div className="pd-sizes">
                {sizes.map((s) => (
                  <button
                    key={s}
                    className={`sizebtn ${selectedSize === s ? "active" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {String(s).toUpperCase()}
                  </button>
                ))}
                <a className="sizechart" href="#"
                   onClick={(e) => { e.preventDefault(); setShowGuide(true); }}>
                  Size Chart
                </a>
              </div>
            </div>
          ) : null}

          <SizeAdvisor
            product={product}
            selectedSize={selectedSize}
            onPick={(sz) => setSelectedSize(sz)}
          />

          {/* Virtual Try-On */}
          <VirtualTryOn product={product} />

          <div className="pd-actions">
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <input
                inputMode="numeric"
                value={qty}
                onChange={(e)=> {
                  const val = Number(e.target.value);
                  setQty(Number.isFinite(val) && val > 0 ? Math.floor(val) : 1);
                }}
              />
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="btn btn-cart" onClick={add} disabled={!canBuy}>ADD TO CART</button>
            <button className="btn btn-buy" onClick={buy} disabled={!canBuy}>BUY NOW</button>
            <span className="muted">
              {canBuy ? `In stock: ${stock}` : stock <= 0 ? `Out of stock` : `Select size`}
            </span>
          </div>

          {error ? <p className="error" style={{marginTop:8}}>{error}</p> : null}

          <div className="pd-section">
            <div className="pd-label">Offers</div>
            <ul className="pd-coupons">
              <li>Free returns within 7 days</li>
              <li>Cash on Delivery available</li>
            </ul>
          </div>
        </div>
      </div>

      {/* AI widgets */}
      <div className="panel">
        <h3>Review Summary</h3>
        <ReviewSummary id={product._id} />
      </div>

      <div className="panel">
        <h3>Similar Products</h3>
        <RecoRail product={product}/>
      </div>

      {/* Size guide modal */}
      {showGuide && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,.4)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50}}
             onClick={()=>setShowGuide(false)}>
          <div className="panel" style={{width:520}} onClick={e=>e.stopPropagation()}>
            <h3>Size Guide</h3>
            <table className="table">
              <thead><tr><th>Size</th><th>Chest (in)</th><th>Length (in)</th></tr></thead>
              <tbody>
                <tr><td>S</td><td>36-38</td><td>26</td></tr>
                <tr><td>M</td><td>38-40</td><td>27</td></tr>
                <tr><td>L</td><td>40-42</td><td>28</td></tr>
                <tr><td>XL</td><td>42-44</td><td>29</td></tr>
              </tbody>
            </table>
            <div className="row" style={{justifyContent:"flex-end"}}>
              <button className="btn" onClick={()=>setShowGuide(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}