// // // // import React, { useEffect, useState } from 'react';
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import { fetchProduct, imageURL } from '../store/productSlice.js';
// // // // import { useParams } from 'react-router-dom';
// // // // import { addToCart } from '../store/cartSlice.js';
// // // // import RecoRail from '../components/RecoRail.jsx';
// // // // import ReviewSummary from '../components/ReviewSummary.jsx';

// // // // export default function ProductDetail(){
// // // //   const { id } = useParams();
// // // //   const dispatch = useDispatch();
// // // //   const p = useSelector(s=>s.products.current);
// // // //   const [sel, setSel] = useState({ size: '', color: '', sku: '', price: 0 });

// // // //   useEffect(()=>{ dispatch(fetchProduct(id)); }, [dispatch, id]);
// // // //   useEffect(()=>{ if (p?.variants?.length){ const v=p.variants[0]; setSel({ size:v.size, color:v.color, sku:v.sku, price:v.price||p.price }); }},[p]);

// // // //   if (!p) return null;
// // // //   const img = p.images?.[0] ? imageURL(p.images[0]) : '';

// // // //   return (
// // // //     <div className="row gap">
// // // //       <div style={{flex:'0 0 320px'}}>{img ? <img src={img} alt={p.title} style={{width:'100%'}}/> : <div className="ph">IMG</div>}</div>
// // // //       <div style={{flex:1}}>
// // // //         <h2>{p.title}</h2>
// // // //         <div>{p.brand} • {p.category}</div>
// // // //         <div className="price">₹{p.price}</div>
// // // //         <label>Size: <select value={sel.size} onChange={e=>{ const v = p.variants.find(x=>x.size===e.target.value); setSel({ ...sel, size:v.size, color:v.color, sku:v.sku, price:v.price||p.price }); }}>
// // // //           {p.variants.map(v => <option key={v.sku} value={v.size}>{v.size}</option>)}
// // // //         </select></label>
// // // //         <button className="btn" onClick={()=>dispatch(addToCart({ product:p._id, title:p.title, sku:sel.sku, size:sel.size, color:sel.color, image:img, price:sel.price||p.price }))}>Add to Cart</button>
// // // //         <p>{p.description}</p>
// // // //         <ReviewSummary productId={p._id}/>
// // // //       </div>
// // // //       <div style={{flexBasis:'100%'}}>
// // // //         <RecoRail productId={p._id}/>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import React, { useEffect, useMemo, useState } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { useDispatch } from "react-redux";
// // // import http from "../api/http.js";
// // // import { addToCart } from "../store/cartSlice.js";
// // // import "./ProductDetail.css";

// // // const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// // // const svgPlaceholder =
// // //   'data:image/svg+xml;utf8,' +
// // //   encodeURIComponent(
// // //     `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="#f2f2f2"/><text x="50%" y="50%" font-family="Arial" font-size="22" fill="#999" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>`
// // //   );

// // // const imgUrl = (src) => {
// // //   if (!src) return svgPlaceholder;
// // //   return src.startsWith("/uploads") ? `${API_BASE}${src}` : src;
// // // };

// // // const Star = ({ fill = 1 }) => (
// // //   <svg width="16" height="16" viewBox="0 0 20 20">
// // //     <defs>
// // //       <linearGradient id="g">
// // //         <stop offset={`${Math.max(0, Math.min(1, fill)) * 100}%`} stopColor="#16a34a" />
// // //         <stop offset={`${Math.max(0, Math.min(1, fill)) * 100}%`} stopColor="#e5e7eb" />
// // //       </linearGradient>
// // //     </defs>
// // //     <path
// // //       fill="url(#g)"
// // //       d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 .5 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
// // //     />
// // //   </svg>
// // // );

// // // export default function ProductDetail() {
// // //   const { id } = useParams();
// // //   const nav = useNavigate();
// // //   const dispatch = useDispatch();

// // //   const [loading, setLoading] = useState(true);
// // //   const [product, setProduct] = useState(null);
// // //   const [similar, setSimilar] = useState([]);
// // //   const [summary, setSummary] = useState("");
// // //   const [mainIdx, setMainIdx] = useState(0);
// // //   const [selectedColor, setSelectedColor] = useState("");
// // //   const [selectedSize, setSelectedSize] = useState("");
// // //   const [qty, setQty] = useState(1);
// // //   const [pincode, setPincode] = useState("");

// // //   useEffect(() => {
// // //     (async () => {
// // //       setLoading(true);
// // //       try {
// // //         const [{ data: p }, { data: rec }, { data: sum }] = await Promise.all([
// // //           http.get(`/api/products/${id}`),
// // //           http.get(`/api/ai/recommend?productId=${id}`),
// // //           http.get(`/api/ai/review-summary/${id}`)
// // //         ]);
// // //         setProduct(p);
// // //         setSimilar(Array.isArray(rec) ? rec : (rec.items || []));
// // //         setSummary(sum?.summary || "Customers find this product good value for money.");
// // //         // defaults
// // //         const colors = uniqueColors(p);
// // //         const sizes = uniqueSizes(p);
// // //         if (colors.length) setSelectedColor(colors[0]);
// // //         if (sizes.length) setSelectedSize(sizes[0]);
// // //       } catch (e) {
// // //         console.error(e);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     })();
// // //   }, [id]);

// // //   const images = useMemo(() => {
// // //     const base = Array.isArray(product?.images) && product.images.length ? product.images : [""];
// // //     return base;
// // //   }, [product]);

// // //   const rating = Number(product?.ratingAvg || 4.3);
// // //   const ratingCount = Number(product?.ratingCount || 683);

// // //   const price = Number(product?.price || 0);
// // //   const oldPrice = Number(product?.oldPrice || (price ? Math.round(price / 0.75) : 0));
// // //   const discountPct = oldPrice && price ? Math.max(0, Math.round(((oldPrice - price) / oldPrice) * 100)) : 0;

// // //   const colorsForSize = (size) => {
// // //     if (!Array.isArray(product?.variants)) return uniqueColors(product);
// // //     const set = new Set(
// // //       product.variants.filter(v => (v.size || "free") === size).map(v => v.color || "default")
// // //     );
// // //     return Array.from(set);
// // //   };
// // //   const sizesForColor = (color) => {
// // //     if (!Array.isArray(product?.variants)) return uniqueSizes(product);
// // //     const set = new Set(
// // //       product.variants.filter(v => (v.color || "default") === color).map(v => v.size || "free")
// // //     );
// // //     return Array.from(set);
// // //   };

// // //   const sizes = useMemo(() => {
// // //     // if color chosen, filter by that color
// // //     return selectedColor ? sizesForColor(selectedColor) : uniqueSizes(product);
// // //   }, [product, selectedColor]);

// // //   const colors = useMemo(() => {
// // //     // if size chosen, filter by that size
// // //     return selectedSize ? colorsForSize(selectedSize) : uniqueColors(product);
// // //   }, [product, selectedSize]);

// // //   const deliveryEta = useMemo(() => {
// // //     const d = new Date();
// // //     d.setDate(d.getDate() + 3);
// // //     return d.toDateString();
// // //   }, [id]);

// // //   const onAdd = () => {
// // //     if (!product) return;
// // //     const chosen =
// // //       product.variants?.find(
// // //         (v) =>
// // //           (v.color || "default") === (selectedColor || "default") &&
// // //           (v.size || "free") === (selectedSize || "free")
// // //       ) || {};
// // //     dispatch(
// // //       addToCart({
// // //         ...product,
// // //         size: selectedSize || chosen.size || "free",
// // //         color: selectedColor || chosen.color || "default",
// // //         sku: chosen.sku || product.variants?.[0]?.sku || "SKU",
// // //         qty
// // //       })
// // //     );
// // //   };

// // //   const onBuyNow = () => {
// // //     onAdd();
// // //     nav("/checkout");
// // //   };

// // //   if (loading) return <div className="container"><p>Loading…</p></div>;
// // //   if (!product) return <div className="container"><p>Product not found.</p></div>;

// // //   return (
// // //     <div className="container product-detail">
// // //       <div className="pd-grid">
// // //         {/* Left: Gallery */}
// // //         <div className="pd-gallery">
// // //           <div className="pd-thumbs">
// // //             {images.map((src, i) => (
// // //               <button
// // //                 key={i}
// // //                 className={`pd-thumb ${i === mainIdx ? "active" : ""}`}
// // //                 onClick={() => setMainIdx(i)}
// // //                 aria-label={`image-${i+1}`}
// // //               >
// // //                 <img src={imgUrl(src)} alt={`thumb-${i}`} />
// // //               </button>
// // //             ))}
// // //           </div>
// // //           <div className="pd-mainimg">
// // //             <img src={imgUrl(images[mainIdx])} alt={product.title} />
// // //           </div>
// // //         </div>

// // //         {/* Right: Info */}
// // //         <div className="pd-info">
// // //           <div className="pd-breadcrumb">
// // //             {product.category ? `${product.category} → ` : ""}{product.brand || ""}
// // //           </div>

// // //           <h1 className="pd-title">{product.title}</h1>

// // //           <div className="pd-rating">
// // //             <span className="pd-pill">
// // //               <span className="pd-star">{rating.toFixed(1)}</span>
// // //               <svg width="12" height="12" viewBox="0 0 20 20" style={{marginLeft:4}}><path fill="#fff" d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 .5 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"/></svg>
// // //             </span>
// // //             <span className="muted"> {Intl.NumberFormat('en-IN').format(ratingCount)} ratings</span>
// // //           </div>

// // //           <div className="pd-priceRow">
// // //             <div className="pd-price">₹{price}</div>
// // //             {oldPrice ? <div className="pd-old">₹{oldPrice}</div> : null}
// // //             {discountPct ? <div className="pd-discount">{discountPct}% off</div> : null}
// // //           </div>

// // //           {/* Colors */}
// // //           {colors.length ? (
// // //             <div className="pd-section">
// // //               <div className="pd-label">Color</div>
// // //               <div className="pd-swatches">
// // //                 {colors.map((c) => (
// // //                   <button
// // //                     key={c}
// // //                     className={`swatch ${selectedColor === c ? "selected" : ""}`}
// // //                     onClick={() => setSelectedColor(c)}
// // //                     title={c}
// // //                   >
// // //                     <span style={{ background: colorToCss(c) }} />
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           ) : null}

// // //           {/* Sizes */}
// // //           {sizes.length ? (
// // //             <div className="pd-section">
// // //               <div className="pd-label">Size</div>
// // //               <div className="pd-sizes">
// // //                 {sizes.map((s) => (
// // //                   <button
// // //                     key={s}
// // //                     className={`sizebtn ${selectedSize === s ? "active" : ""}`}
// // //                     onClick={() => setSelectedSize(s)}
// // //                   >
// // //                     {s.toUpperCase()}
// // //                   </button>
// // //                 ))}
// // //                 <a className="sizechart" href="#" onClick={(e)=>e.preventDefault()}>Size Chart</a>
// // //               </div>
// // //             </div>
// // //           ) : null}

// // //           {/* Qty + Actions */}
// // //           <div className="pd-actions">
// // //             <div className="qty">
// // //               <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
// // //               <input
// // //                 value={qty}
// // //                 onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
// // //               />
// // //               <button onClick={() => setQty(q => q + 1)}>+</button>
// // //             </div>
// // //             <button className="btn btn-cart" onClick={onAdd}>ADD TO CART</button>
// // //             <button className="btn btn-buy" onClick={onBuyNow}>BUY NOW</button>
// // //           </div>

// // //           {/* Coupons */}
// // //           <div className="pd-section">
// // //             <div className="pd-label">Coupons for you</div>
// // //             <ul className="pd-coupons">
// // //               <li>Special Price: Get extra 20% off up to ₹100 on 2 items (price inclusive)</li>
// // //               <li>Bank Offer: 5% cashback on Axis Bank Credit Card up to ₹750</li>
// // //               <li>Bank Offer: 10% up to ₹750 on HDFC Bank Credit Card (Min. Value: ₹3000)</li>
// // //             </ul>
// // //           </div>

// // //           {/* Delivery / Services */}
// // //           <div className="pd-section">
// // //             <div className="pd-label">Delivery</div>
// // //             <div className="pd-delivery">
// // //               <div className="pin">
// // //                 <input
// // //                   placeholder="Enter delivery pincode"
// // //                   value={pincode}
// // //                   onChange={(e)=>setPincode(e.target.value.replace(/[^\d]/g,''))}
// // //                   maxLength={6}
// // //                 />
// // //                 <button className="btn outline" onClick={()=>{}}>Check</button>
// // //               </div>
// // //               <div className="muted">Delivery by <b>{deliveryEta}</b></div>
// // //             </div>
// // //             <div className="pd-services">
// // //               <span>✅ Quality checked</span>
// // //               <span>↩️ 10-day return policy</span>
// // //               <span>💬 Seller: {product.brand || "Verified"}</span>
// // //               <span>💵 Cash on Delivery available</span>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Product details */}
// // //       <div className="panel" style={{marginTop:16}}>
// // //         <h3>Product Details</h3>
// // //         <p className="muted">{product.description || "Premium quality product with great comfort and fit."}</p>
// // //       </div>

// // //       {/* Ratings & Reviews */}
// // //       <div className="panel" style={{marginTop:16}}>
// // //         <div className="pd-reviews-header">
// // //           <h3>Ratings & Reviews</h3>
// // //           <div className="pd-stars">
// // //             {[0,1,2,3,4].map(i => <Star key={i} fill={Math.min(1, Math.max(0, rating - i))} />)}
// // //             <span style={{marginLeft:8}}>{rating.toFixed(1)} • {Intl.NumberFormat('en-IN').format(ratingCount)} ratings</span>
// // //           </div>
// // //         </div>

// // //         <div className="pd-reviewchips">
// // //           <Chip label="Fabric Quality" />
// // //           <Chip label="Colour" />
// // //           <Chip label="Style" />
// // //           <Chip label="Comfort" />
// // //           <Chip label="Stitching Quality" />
// // //         </div>

// // //         <div className="pd-revgrid">
// // //           <div className="pd-rev-block">
// // //             <h4>What our customers felt</h4>
// // //             <p className="muted">{summary}</p>
// // //           </div>
// // //           <div className="pd-rev-block">
// // //             <h4>Images uploaded by customers</h4>
// // //             <div className="pd-photo-grid">
// // //               {images.slice(0,5).map((src,i)=>(
// // //                 <img key={i} src={imgUrl(src)} alt={`cust-${i}`} />
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Similar products */}
// // //       <div className="panel" style={{marginTop:16}}>
// // //         <div className="row" style={{justifyContent:"space-between", alignItems:"center"}}>
// // //           <h3>Similar Products</h3>
// // //           <button className="btn outline" onClick={()=>nav("/shop")}>View all</button>
// // //         </div>
// // //         <div className="pd-sim-grid">
// // //           {similar.map((p)=>(
// // //             <article key={p._id} className="pd-sim-card">
// // //               <img src={imgUrl(p.images?.[0])} alt={p.title} />
// // //               <div className="title">{p.title}</div>
// // //               <div className="price">₹{p.price}</div>
// // //               <div className="row gap">
// // //                 <button className="btn sm" onClick={()=>dispatch(addToCart({...p, qty:1}))}>Add to Cart</button>
// // //                 <button className="btn sm outline" onClick={()=>nav(`/product/${p._id}`)}>View</button>
// // //               </div>
// // //             </article>
// // //           ))}
// // //           {!similar.length && <p className="muted">No similar items right now.</p>}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* helpers */
// // // function uniqueColors(p){
// // //   if (!Array.isArray(p?.variants)) return [];
// // //   const s = new Set(p.variants.map(v => v.color || "default"));
// // //   return Array.from(s);
// // // }
// // // function uniqueSizes(p){
// // //   if (!Array.isArray(p?.variants)) return [];
// // //   const s = new Set(p.variants.map(v => v.size || "free"));
// // //   return Array.from(s);
// // // }
// // // function colorToCss(name){
// // //   const n = (name||"").toLowerCase();
// // //   const map = {
// // //     black:"#111", white:"#fff", blue:"#2563eb", red:"#ef4444", green:"#16a34a",
// // //     maroon:"#6b0d0d", grey:"#9ca3af", gray:"#9ca3af", brown:"#8b5e34",
// // //     navy:"#0f172a", yellow:"#eab308", orange:"#f97316", default:"#ddd"
// // //   };
// // //   return map[n] || name || "#ddd";
// // // }
// // // function Chip({ label }){
// // //   return <span className="chip">{label}</span>;
// // // }


// // import React, { useEffect, useMemo, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import http from "../api/http.js";
// // import { addToCart } from "../store/cartSlice.js";
// // import "./ProductDetail.css";

// // const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// // const svgPlaceholder =
// //   "data:image/svg+xml;utf8," +
// //   encodeURIComponent(
// //     `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="#f2f2f2"/><text x="50%" y="50%" font-family="Arial" font-size="22" fill="#999" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>`
// //   );

// // const imgUrl = (src) => {
// //   if (!src) return svgPlaceholder;
// //   return src.startsWith("/uploads") ? `${API_BASE}${src}` : src;
// // };

// // const Star = ({ fill = 1, size = 16 }) => (
// //   <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
// //     <defs>
// //       <linearGradient id="g">
// //         <stop offset={`${Math.max(0, Math.min(1, fill)) * 100}%`} stopColor="#16a34a" />
// //         <stop offset={`${Math.max(0, Math.min(1, fill)) * 100}%`} stopColor="#e5e7eb" />
// //       </linearGradient>
// //     </defs>
// //     <path
// //       fill="url(#g)"
// //       d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 .5 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
// //     />
// //   </svg>
// // );

// // /* helpers */
// // function uniqueColors(p) {
// //   if (!Array.isArray(p?.variants)) return [];
// //   const s = new Set(p.variants.map((v) => v.color || "default"));
// //   return Array.from(s);
// // }
// // function uniqueSizes(p) {
// //   if (!Array.isArray(p?.variants)) return [];
// //   const s = new Set(p.variants.map((v) => v.size || "free"));
// //   return Array.from(s);
// // }
// // function colorToCss(name) {
// //   const n = (name || "").toLowerCase();
// //   const map = {
// //     black: "#111",
// //     white: "#fff",
// //     blue: "#2563eb",
// //     red: "#ef4444",
// //     green: "#16a34a",
// //     maroon: "#6b0d0d",
// //     grey: "#9ca3af",
// //     gray: "#9ca3af",
// //     brown: "#8b5e34",
// //     navy: "#0f172a",
// //     yellow: "#eab308",
// //     orange: "#f97316",
// //     default: "#ddd",
// //   };
// //   return map[n] || name || "#ddd";
// // }

// // export default function ProductDetail() {
// //   const { id } = useParams();
// //   const nav = useNavigate();
// //   const dispatch = useDispatch();
// //   const { me } = useSelector((s) => s.user);

// //   // product
// //   const [loading, setLoading] = useState(true);
// //   const [product, setProduct] = useState(null);
// //   const [similar, setSimilar] = useState([]);
// //   const [summary, setSummary] = useState("");

// //   // gallery / selections
// //   const [mainIdx, setMainIdx] = useState(0);
// //   const [selectedColor, setSelectedColor] = useState("");
// //   const [selectedSize, setSelectedSize] = useState("");
// //   const [qty, setQty] = useState(1);
// //   const [pincode, setPincode] = useState("");

// //   // reviews
// //   const [reviews, setReviews] = useState([]);
// //   const [stats, setStats] = useState({ count: 0, avg: 0, dist: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } });
// //   const [eligible, setEligible] = useState(false);
// //   const [myRating, setMyRating] = useState(0);
// //   const [myComment, setMyComment] = useState("");

// //   useEffect(() => {
// //     (async () => {
// //       setLoading(true);
// //       try {
// //         const [{ data: p }, { data: rec }, { data: sum }, { data: rev }] = await Promise.all([
// //           http.get(`/api/products/${id}`),
// //           http.get(`/api/ai/recommend?productId=${id}`),
// //           http.get(`/api/ai/review-summary/${id}`),
// //           http.get(`/api/products/${id}/reviews`),
// //         ]);
// //         setProduct(p);
// //         setSimilar(Array.isArray(rec) ? rec : rec.items || []);
// //         setSummary(sum?.summary || "Customers find this product good value for money.");
// //         setReviews(rev?.reviews || []);
// //         setStats(rev?.stats || { count: 0, avg: 0, dist: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } });

// //         const colors = uniqueColors(p);
// //         const sizes = uniqueSizes(p);
// //         if (colors.length) setSelectedColor(colors[0]);
// //         if (sizes.length) setSelectedSize(sizes[0]);
// //       } catch (e) {
// //         console.error(e);
// //       } finally {
// //         setLoading(false);
// //       }
// //     })();
// //   }, [id]);

// //   // review eligibility
// //   useEffect(() => {
// //     if (!me?._id) return setEligible(false);
// //     (async () => {
// //       try {
// //         const { data } = await http.get(`/api/products/${id}/reviews/eligible`);
// //         setEligible(!!data.eligible);
// //       } catch {
// //         setEligible(false);
// //       }
// //     })();
// //   }, [id, me?._id]);

// //   const images = useMemo(() => {
// //     const base = Array.isArray(product?.images) && product.images.length ? product.images : [""];
// //     return base;
// //   }, [product]);

// //   const rating = Number(product?.ratingAvg || stats.avg || 0);
// //   const ratingCount = Number(product?.ratingCount || stats.count || 0);
// //   const price = Number(product?.price || 0);
// //   const oldPrice = Number(product?.oldPrice || (price ? Math.round(price / 0.75) : 0));
// //   const discountPct =
// //     oldPrice && price ? Math.max(0, Math.round(((oldPrice - price) / oldPrice) * 100)) : 0;

// //   const colorsForSize = (size) => {
// //     if (!Array.isArray(product?.variants)) return uniqueColors(product);
// //     const set = new Set(
// //       product.variants.filter((v) => (v.size || "free") === size).map((v) => v.color || "default")
// //     );
// //     return Array.from(set);
// //   };
// //   const sizesForColor = (color) => {
// //     if (!Array.isArray(product?.variants)) return uniqueSizes(product);
// //     const set = new Set(
// //       product.variants.filter((v) => (v.color || "default") === color).map((v) => v.size || "free")
// //     );
// //     return Array.from(set);
// //   };

// //   const sizes = useMemo(
// //     () => (selectedColor ? sizesForColor(selectedColor) : uniqueSizes(product)),
// //     [product, selectedColor]
// //   );
// //   const colors = useMemo(
// //     () => (selectedSize ? colorsForSize(selectedSize) : uniqueColors(product)),
// //     [product, selectedSize]
// //   );

// //   const deliveryEta = useMemo(() => {
// //     const d = new Date();
// //     d.setDate(d.getDate() + 3);
// //     return d.toDateString();
// //   }, [id]);

// //   const onAdd = () => {
// //     if (!product) return;
// //     const chosen =
// //       product.variants?.find(
// //         (v) =>
// //           (v.color || "default") === (selectedColor || "default") &&
// //           (v.size || "free") === (selectedSize || "free")
// //       ) || {};
// //     dispatch(
// //       addToCart({
// //         ...product,
// //         size: selectedSize || chosen.size || "free",
// //         color: selectedColor || chosen.color || "default",
// //         sku: chosen.sku || product.variants?.[0]?.sku || "SKU",
// //         qty,
// //       })
// //     );
// //   };

// //   const onBuyNow = () => {
// //     onAdd();
// //     nav("/checkout");
// //   };

// //   const submitReview = async (e) => {
// //     e.preventDefault();
// //     if (!me?._id) return nav("/profile");
// //     if (!eligible) return alert("Only verified buyers can review this product.");
// //     if (!myRating) return alert("Please select rating 1-5.");

// //     await http.post(`/api/products/${id}/reviews`, { rating: myRating, comment: myComment });
// //     setMyRating(0);
// //     setMyComment("");
// //     const { data } = await http.get(`/api/products/${id}/reviews`);
// //     setReviews(data.reviews || []);
// //     setStats(data.stats || stats);
// //   };

// //   if (loading) return <div className="container"><p>Loading…</p></div>;
// //   if (!product) return <div className="container"><p>Product not found.</p></div>;

// //   return (
// //     <div className="container product-detail">
// //       <div className="pd-grid">
// //         {/* Gallery */}
// //         <div className="pd-gallery">
// //           <div className="pd-thumbs">
// //             {images.map((src, i) => (
// //               <button
// //                 key={i}
// //                 className={`pd-thumb ${i === mainIdx ? "active" : ""}`}
// //                 onClick={() => setMainIdx(i)}
// //                 aria-label={`image-${i + 1}`}
// //               >
// //                 <img src={imgUrl(src)} alt={`thumb-${i}`} />
// //               </button>
// //             ))}
// //           </div>
// //           <div className="pd-mainimg">
// //             <img src={imgUrl(images[mainIdx])} alt={product.title} />
// //           </div>
// //         </div>

// //         {/* Info */}
// //         <div className="pd-info">
// //           <div className="pd-breadcrumb">
// //             {product.category ? `${product.category} → ` : ""} {product.brand || ""}
// //           </div>

// //           <h1 className="pd-title">{product.title}</h1>

// //           <div className="pd-rating">
// //             <span className="pd-pill">
// //               <span className="pd-star">{rating.toFixed(1)}</span>
// //               <svg width="12" height="12" viewBox="0 0 20 20" style={{ marginLeft: 4 }}>
// //                 <path
// //                   fill="#fff"
// //                   d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 .5 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
// //                 />
// //               </svg>
// //             </span>
// //             <span className="muted">
// //               {" "}
// //               {Intl.NumberFormat("en-IN").format(ratingCount)} ratings
// //             </span>
// //           </div>

// //           <div className="pd-priceRow">
// //             <div className="pd-price">₹{price}</div>
// //             {oldPrice ? <div className="pd-old">₹{oldPrice}</div> : null}
// //             {discountPct ? <div className="pd-discount">{discountPct}% off</div> : null}
// //           </div>

// //           {/* Color */}
// //           {colors.length ? (
// //             <div className="pd-section">
// //               <div className="pd-label">Color</div>
// //               <div className="pd-swatches">
// //                 {colors.map((c) => (
// //                   <button
// //                     key={c}
// //                     className={`swatch ${selectedColor === c ? "selected" : ""}`}
// //                     onClick={() => setSelectedColor(c)}
// //                     title={c}
// //                   >
// //                     <span style={{ background: colorToCss(c) }} />
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           ) : null}

// //           {/* Size */}
// //           {sizes.length ? (
// //             <div className="pd-section">
// //               <div className="pd-label">Size</div>
// //               <div className="pd-sizes">
// //                 {sizes.map((s) => (
// //                   <button
// //                     key={s}
// //                     className={`sizebtn ${selectedSize === s ? "active" : ""}`}
// //                     onClick={() => setSelectedSize(s)}
// //                   >
// //                     {s.toUpperCase()}
// //                   </button>
// //                 ))}
// //                 <a className="sizechart" href="#" onClick={(e) => e.preventDefault()}>
// //                   Size Chart
// //                 </a>
// //               </div>
// //             </div>
// //           ) : null}

// //           {/* Actions */}
// //           <div className="pd-actions">
// //             <div className="qty">
// //               <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
// //               <input
// //                 value={qty}
// //                 onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
// //               />
// //               <button onClick={() => setQty((q) => q + 1)}>+</button>
// //             </div>
// //             <button className="btn btn-cart" onClick={onAdd}>
// //               ADD TO CART
// //             </button>
// //             <button className="btn btn-buy" onClick={onBuyNow}>
// //               BUY NOW
// //             </button>
// //           </div>

// //           {/* Coupons */}
// //           <div className="pd-section">
// //             <div className="pd-label">Coupons for you</div>
// //             <ul className="pd-coupons">
// //               <li>Special Price: Get extra 20% off up to ₹100 on 2 items (price inclusive)</li>
// //               <li>Bank Offer: 5% cashback on Axis Bank Credit Card up to ₹750</li>
// //               <li>Bank Offer: 10% up to ₹750 on HDFC Bank Credit Card (Min. Value: ₹3000)</li>
// //             </ul>
// //           </div>

// //           {/* Delivery / Services */}
// //           <div className="pd-section">
// //             <div className="pd-label">Delivery</div>
// //             <div className="pd-delivery">
// //               <div className="pin">
// //                 <input
// //                   placeholder="Enter delivery pincode"
// //                   value={pincode}
// //                   onChange={(e) => setPincode(e.target.value.replace(/[^\d]/g, ""))}
// //                   maxLength={6}
// //                 />
// //                 <button className="btn outline" onClick={() => {}}>
// //                   Check
// //                 </button>
// //               </div>
// //               <div className="muted">
// //                 Delivery by <b>{deliveryEta}</b>
// //               </div>
// //             </div>
// //             <div className="pd-services">
// //               <span>✅ Quality checked</span>
// //               <span>↩️ 10-day return policy</span>
// //               <span>💬 Seller: {product.brand || "Verified"}</span>
// //               <span>💵 Cash on Delivery available</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Product details */}
// //       <div className="panel" style={{ marginTop: 16 }}>
// //         <h3>Product Details</h3>
// //         <p className="muted">
// //           {product.description || "Premium quality product with great comfort and fit."}
// //         </p>
// //       </div>

// //       {/* Ratings & Reviews */}
// //       <div className="panel" style={{ marginTop: 16 }}>
// //         <div className="pd-reviews-header">
// //           <h3>Ratings & Reviews</h3>
// //           <div className="pd-stars">
// //             {[0, 1, 2, 3, 4].map((i) => (
// //               <Star key={i} fill={Math.min(1, Math.max(0, rating - i))} />
// //             ))}
// //             <span style={{ marginLeft: 8 }}>
// //               {rating.toFixed(1)} • {Intl.NumberFormat("en-IN").format(ratingCount)} reviews
// //             </span>
// //           </div>
// //         </div>

// //         {/* Distribution bars */}
// //         <div className="pd-distribution">
// //           {[5, 4, 3, 2, 1].map((n) => {
// //             const total = stats?.count || 0;
// //             const count = stats?.dist?.[n] || 0;
// //             const pct = total ? (count / total) * 100 : 0;
// //             return (
// //               <div className="pd-dist-row" key={n}>
// //                 <span className="muted">{n} Stars</span>
// //                 <div className="pd-bar">
// //                   <span style={{ width: `${pct}%` }} />
// //                 </div>
// //                 <span className="muted">{count}</span>
// //               </div>
// //             );
// //           })}
// //         </div>

// //         <div className="pd-reviewchips">
// //           <span className="chip">Fabric Quality</span>
// //           <span className="chip">Colour</span>
// //           <span className="chip">Style</span>
// //           <span className="chip">Comfort</span>
// //           <span className="chip">Stitching Quality</span>
// //         </div>

// //         {/* AI short summary */}
// //         <div className="pd-revgrid">
// //           <div className="pd-rev-block">
// //             <h4>What our customers felt</h4>
// //             <p className="muted">{summary}</p>
// //           </div>
// //           <div className="pd-rev-block">
// //             <h4>Images uploaded by customers</h4>
// //             <div className="pd-photo-grid">
// //               {images.slice(0, 5).map((src, i) => (
// //                 <img key={i} src={imgUrl(src)} alt={`cust-${i}`} />
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         <hr style={{ margin: "12px 0" }} />

// //         <h4>Customer Reviews</h4>
// //         <div className="pd-review-list">
// //           {reviews.length === 0 && <p className="muted">No reviews yet.</p>}
// //           {reviews.map((r) => (
// //             <div key={r._id} className="pd-review-item">
// //               <div className="row" style={{ gap: 8, alignItems: "center" }}>
// //                 <strong>{r.user?.name || "User"}</strong>
// //                 <span className="chip">{r.rating}★</span>
// //                 <span className="muted">{new Date(r.createdAt).toLocaleDateString()}</span>
// //               </div>
// //               {r.comment ? <p style={{ margin: "4px 0 0" }}>{r.comment}</p> : null}
// //             </div>
// //           ))}
// //         </div>

// //         <hr style={{ margin: "12px 0" }} />

// //         <h4>Rate This Product</h4>
// //         {!me?._id && (
// //           <p className="muted">
// //             Please{" "}
// //             <a onClick={() => nav("/profile")} href="#">
// //               login
// //             </a>{" "}
// //             to review.
// //           </p>
// //         )}
// //         {me?._id && !eligible && (
// //           <p className="muted">Only verified buyers can review this product.</p>
// //         )}

// //         {me?._id && eligible && (
// //           <form onSubmit={submitReview} className="pd-rate-form">
// //             <label>Rating (1-5)</label>
// //             <select value={myRating} onChange={(e) => setMyRating(Number(e.target.value))}>
// //               <option value={0}>Select</option>
// //               {[1, 2, 3, 4, 5].map((n) => (
// //                 <option key={n} value={n}>
// //                   {n}
// //                 </option>
// //               ))}
// //             </select>
// //             <label>Comment</label>
// //             <textarea
// //               value={myComment}
// //               onChange={(e) => setMyComment(e.target.value)}
// //               rows={3}
// //               placeholder="Share your experience"
// //             />
// //             <button className="btn" type="submit">
// //               Submit Review
// //             </button>
// //           </form>
// //         )}
// //       </div>

// //       {/* Similar products */}
// //       <div className="panel" style={{ marginTop: 16 }}>
// //         <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
// //           <h3>Similar Products</h3>
// //           <button className="btn outline" onClick={() => nav("/shop")}>
// //             View all
// //           </button>
// //         </div>
// //         <div className="pd-sim-grid">
// //           {similar.map((p) => (
// //             <article key={p._id} className="pd-sim-card">
// //               <img src={imgUrl(p.images?.[0])} alt={p.title} />
// //               <div className="title">{p.title}</div>
// //               <div className="price">₹{p.price}</div>
// //               <div className="row gap">
// //                 <button className="btn sm" onClick={() => dispatch(addToCart({ ...p, qty: 1 }))}>
// //                   Add to Cart
// //                 </button>
// //                 <button className="btn sm outline" onClick={() => nav(`/product/${p._id}`)}>
// //                   View
// //                 </button>
// //               </div>
// //             </article>
// //           ))}
// //           {!similar.length && <p className="muted">No similar items right now.</p>}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import http from "../api/http.js";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../store/cartSlice.js";
// import RecoRail from "../components/RecoRail.jsx";
// import ReviewSummary from "../components/ReviewSummary.jsx";
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

//   const dispatch = useDispatch();
//   const nav = useNavigate();

//   useEffect(() => {
//     (async () => {
//       const { data } = await http.get(`/api/products/${id}`);
//       setProduct(data);
//       if (data?.variants?.[0]) {
//         setSelectedColor(data.variants[0].color || "default");
//         setSelectedSize(data.variants[0].size || "free");
//       }
//     })();
//   }, [id]);

//   const colors = useMemo(() => {
//     const set = new Set((product?.variants || []).map(v => v.color || "default"));
//     return [...set];
//   }, [product]);

//   const sizes = useMemo(() => {
//     const set = new Set((product?.variants || []).map(v => v.size || "free"));
//     return [...set];
//   }, [product]);

//   const chosen =
//     product?.variants?.find(
//       v => (v.color || "default") === (selectedColor || "default") &&
//            (v.size || "free") === (selectedSize || "free")
//     ) || {};
//   const stock = Number(chosen.stock ?? 0);
//   const canBuy = stock > 0;

//   const add = () => {
//     dispatch(addToCart({
//       ...product,
//       sku: chosen.sku || product.variants?.[0]?.sku || 'SKU',
//       size: selectedSize || 'free',
//       color: selectedColor || 'default',
//       qty
//     }));
//   };

//   const buy = () => {
//     add();
//     nav("/checkout");
//   };

//   if (!product) return <div className="container"><p>Loading…</p></div>;

//   return (
//     <div className="container product-detail">
//       <div className="pd-grid">
//         {/* Gallery */}
//         <div className="pd-gallery">
//           <div className="pd-thumbs">
//             {(product.images || []).map((src, i) => (
//               <div key={i} className={`pd-thumb ${active===i?'active':''}`} onClick={()=>setActive(i)}>
//                 <img src={imgUrl(src)} alt="" />
//               </div>
//             ))}
//           </div>
//           <div className="pd-mainimg">
//             {product.images?.[active] ? <img src={imgUrl(product.images[active])} alt={product.title}/> : <div className="noimg">No Image</div>}
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
//             {product.oldPrice ? <div className="pd-discount">
//               {Math.max(0, Math.round(100 - (product.price / product.oldPrice) * 100))}% off
//             </div> : null}
//           </div>

//           {colors.length ? (
//             <div className="pd-section">
//               <div className="pd-label">Color</div>
//               <div className="pd-swatches">
//                 {colors.map(c => (
//                   <button key={c} className={`swatch ${selectedColor===c?'selected':''}`} onClick={()=>setSelectedColor(c)}>
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
//                     {s.toUpperCase()}
//                   </button>
//                 ))}
//                 <a className="sizechart" href="#" onClick={(e) => { e.preventDefault(); setShowGuide(true); }}>
//                   Size Chart
//                 </a>
//               </div>
//             </div>
//           ) : null}

//           <div className="pd-actions">
//             <div className="qty">
//               <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
//               <input value={qty} onChange={(e)=>setQty(Math.max(1, Number(e.target.value||1)))} />
//               <button onClick={() => setQty((q) => q + 1)}>+</button>
//             </div>
//             <button className="btn btn-cart" onClick={add} disabled={!canBuy}>ADD TO CART</button>
//             <button className="btn btn-buy" onClick={buy} disabled={!canBuy}>BUY NOW</button>
//             <span className="muted">{canBuy ? `In stock: ${stock}` : `Out of stock`}</span>
//           </div>

//           <div className="pd-section">
//             <div className="pd-label">Offers</div>
//             <ul className="pd-coupons">
//               <li>Free returns within 7 days</li>
//               <li>Cash on Delivery available</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* AI widgets if you already use them */}
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



import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../api/http.js";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice.js";
import RecoRail from "../components/RecoRail.jsx";
import ReviewSummary from "../components/ReviewSummary.jsx";
import SizeAdvisor from "../components/SizeAdvisor.jsx";
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
        // sensible defaults
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

  const chosen =
    product?.variants?.find(
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
    // if validation failed, don't navigate
    if (sizeRequired && !selectedSize) return;
    if ((chosen?.stock ?? 0) <= 0) return;
    nav("/checkout");
  };

  if (error && !product) {
    return <div className="container"><p className="error">{error}</p></div>;
  }
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

          {/* Size Advisor (fixed: product prop instead of undefined `p`) */}
          <SizeAdvisor
            product={product}
            selectedSize={selectedSize}
            onPick={(sz) => setSelectedSize(sz)}
          />

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
