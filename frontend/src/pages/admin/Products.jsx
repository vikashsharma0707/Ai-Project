// // // // // import React, { useEffect } from 'react';
// // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // import { fetchProducts, deleteProduct } from '../../store/productSlice.js';
// // // // // import { Link } from 'react-router-dom';

// // // // // export default function Products(){
// // // // //   const dispatch = useDispatch();
// // // // //   const { list } = useSelector(s=>s.products);
// // // // //   useEffect(()=>{ dispatch(fetchProducts({ limit: 100 })); }, [dispatch]);

// // // // //   return (
// // // // //     <div>
// // // // //       <div className="row space">
// // // // //         <h2>Products</h2>
// // // // //         <Link className="btn" to="/admin/products/new">New</Link>
// // // // //       </div>
// // // // //       <table className="table">
// // // // //         <thead><tr><th>Title</th><th>Brand</th><th>Category</th><th>Price</th><th/></tr></thead>
// // // // //         <tbody>
// // // // //           {list.map(p=><tr key={p._id}>
// // // // //             <td>{p.title}</td><td>{p.brand}</td><td>{p.category}</td><td>₹{p.price}</td>
// // // // //             <td className="row gap">
// // // // //               <Link className="btn" to={`/admin/products/${p._id}`}>Edit</Link>
// // // // //               <button className="btn danger" onClick={()=>dispatch(deleteProduct(p._id)).then(()=>dispatch(fetchProducts({limit:100})))}>Delete</button>
// // // // //             </td>
// // // // //           </tr>)}
// // // // //         </tbody>
// // // // //       </table>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import React, { useEffect, useState } from 'react';
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import { fetchProducts, deleteProduct } from '../../store/productSlice.js';
// // // // import { Link } from 'react-router-dom';
// // // // import http from '../../api/http.js';

// // // // export default function Products(){
// // // //   const dispatch = useDispatch();
// // // //   const { list } = useSelector(s=>s.products);

// // // //   // row-wise suggestion state: { [productId]: {loading, data, error} }
// // // //   const [sugg, setSugg] = useState({});

// // // //   useEffect(()=>{ dispatch(fetchProducts({ limit: 100 })); }, [dispatch]);

// // // //   const suggest = async (p) => {
// // // //     setSugg(x => ({ ...x, [p._id]: { loading: true, data: null, error: "" }}));
// // // //     try {
// // // //       const { data } = await http.get(`/api/ai/price-suggest/${p._id}`);
// // // //       setSugg(x => ({ ...x, [p._id]: { loading: false, data, error: "" }}));
// // // //     } catch (e) {
// // // //       setSugg(x => ({ ...x, [p._id]: { loading: false, data: null, error: "Failed to fetch" }}));
// // // //     }
// // // //   };

// // // //   const apply = async (p) => {
// // // //     const data = sugg[p._id]?.data;
// // // //     if (!data?.suggested) return;
// // // //     setSugg(x => ({ ...x, [p._id]: { ...(x[p._id]||{}), loading: true }}));
// // // //     try {
// // // //       // ⚠️ Update endpoint ko apne backend ke hisaab se adjust karna:
// // // //       // Agar tumhare paas PUT /api/products/:id hai, to niche wali line ko usse replace kar do.
// // // //       await http.put(`/api/admin/products/${p._id}`, { price: data.suggested });
// // // //       await dispatch(fetchProducts({ limit: 100 }));
// // // //       setSugg(x => ({ ...x, [p._id]: { loading: false, data: { ...data, applied: true }, error: "" }}));
// // // //     } catch (e) {
// // // //       setSugg(x => ({ ...x, [p._id]: { loading: false, data, error: "Apply failed" }}));
// // // //     }
// // // //   };

// // // //   const msg = (p) => {
// // // //     const s = sugg[p._id];
// // // //     if (!s?.data) return null;
// // // //     const d = s.data;
// // // //     const sign = d.deltaPct >= 0 ? "+" : "";
// // // //     return (
// // // //       <div className="muted" style={{marginTop:6}}>
// // // //         <b>{d.message}</b>
// // // //         <div className="row" style={{gap:8, marginTop:6}}>
// // // //           <button className="btn btn-buy" onClick={()=>apply(p)} disabled={s.loading || d.applied}>
// // // //             {d.applied ? "Applied" : `Apply ₹${d.suggested}`}
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <div className="row space">
// // // //         <h2>Products</h2>
// // // //         <Link className="btn" to="/admin/products/new">New</Link>
// // // //       </div>
// // // //       <table className="table">
// // // //         <thead>
// // // //           <tr>
// // // //             <th>Title</th><th>Brand</th><th>Category</th><th>Price</th>
// // // //             <th>Price Suggestion</th>
// // // //             <th/>
// // // //           </tr>
// // // //         </thead>
// // // //         <tbody>
// // // //           {list.map(p=>(
// // // //             <tr key={p._id}>
// // // //               <td>{p.title}</td>
// // // //               <td>{p.brand}</td>
// // // //               <td>{p.category}</td>
// // // //               <td>₹{p.price}</td>
// // // //               <td>
// // // //                 <button
// // // //                   className="btn"
// // // //                   onClick={()=>suggest(p)}
// // // //                   disabled={!!sugg[p._id]?.loading}
// // // //                 >
// // // //                   {sugg[p._id]?.loading ? "Calculating..." : "Suggest"}
// // // //                 </button>
// // // //                 {sugg[p._id]?.error && <div className="error" style={{marginTop:6}}>{sugg[p._id].error}</div>}
// // // //                 {msg(p)}
// // // //               </td>
// // // //               <td className="row gap">
// // // //                 <Link className="btn" to={`/admin/products/${p._id}`}>Edit</Link>
// // // //                 <button
// // // //                   className="btn danger"
// // // //                   onClick={()=>dispatch(deleteProduct(p._id)).then(()=>dispatch(fetchProducts({limit:100})))}
// // // //                 >
// // // //                   Delete
// // // //                 </button>
// // // //               </td>
// // // //             </tr>
// // // //           ))}
// // // //         </tbody>
// // // //       </table>
// // // //     </div>
// // // //   );
// // // // }


// // // import React, { useEffect, useState } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { fetchProducts, deleteProduct } from '../../store/productSlice.js';
// // // import { Link } from 'react-router-dom';
// // // import http from '../../api/http.js';

// // // export default function Products(){
// // //   const dispatch = useDispatch();
// // //   const { list } = useSelector(s=>s.products);
// // //   const [sugg, setSugg] = useState({}); // { [id]: { loading, data, error } }

// // //   useEffect(()=>{ dispatch(fetchProducts({ limit: 100 })); }, [dispatch]);

// // //   const suggest = async (p) => {
// // //     setSugg(x => ({ ...x, [p._id]: { loading: true, data: null, error: "" }}));
// // //     try {
// // //       const { data } = await http.get(`/api/ai/price-suggest/${p._id}`);
// // //       setSugg(x => ({ ...x, [p._id]: { loading: false, data, error: "" }}));
// // //     } catch (e) {
// // //       const msg = e?.response?.data?.error || "Failed to fetch";
// // //       setSugg(x => ({ ...x, [p._id]: { loading: false, data: null, error: msg }}));
// // //     }
// // //   };

// // //   const apply = async (p) => {
// // //     const s = sugg[p._id];
// // //     const suggested = s?.data?.suggested;
// // //     if (!suggested) return;

// // //     setSugg(x => ({ ...x, [p._id]: { ...(x[p._id]||{}), loading: true, error: "" }}));
// // //     try {
// // //       // ✅ Use your actual update route (most projects: /api/products/:id)
// // //       await http.put(`/api/products/${p._id}`, { price: suggested });
// // //       await dispatch(fetchProducts({ limit: 100 }));
// // //       setSugg(x => ({ ...x, [p._id]: { loading: false, data: { ...s.data, applied: true }, error: "" }}));
// // //     } catch (e) {
// // //       const status = e?.response?.status;
// // //       const msg =
// // //         status === 404 ? "Endpoint not found: PUT /api/products/:id" :
// // //         status === 401 || status === 403 ? "Unauthorized (login as admin)" :
// // //         (e?.response?.data?.error || "Apply failed");
// // //       setSugg(x => ({ ...x, [p._id]: { loading: false, data: s?.data, error: msg }}));
// // //     }
// // //   };

// // //   const renderSuggCell = (p) => {
// // //     const s = sugg[p._id];
// // //     return (
// // //       <>
// // //         <button
// // //           className="btn"
// // //           onClick={()=>suggest(p)}
// // //           disabled={!!s?.loading}
// // //         >
// // //           {s?.loading ? "Calculating..." : "Suggest"}
// // //         </button>

// // //         {s?.error && <div className="error" style={{marginTop:6}}>{s.error}</div>}

// // //         {s?.data && (
// // //           <div style={{marginTop:6}}>
// // //             <div className="muted"><b>{s.data.message}</b></div>
// // //             <div className="row" style={{gap:8, marginTop:6}}>
// // //               <button
// // //                 className="btn btn-buy"
// // //                 onClick={()=>apply(p)}
// // //                 disabled={s.loading || s.data.applied || s.data.suggested === p.price}
// // //               >
// // //                 {s.data.applied ? "Applied" : `Apply ₹${s.data.suggested}`}
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </>
// // //     );
// // //   };

// // //   return (
// // //     <div>
// // //       <div className="row space">
// // //         <h2>Products</h2>
// // //         <Link className="btn" to="/admin/products/new">New</Link>
// // //       </div>

// // //       <table className="table">
// // //         <thead>
// // //           <tr>
// // //             <th>Title</th><th>Brand</th><th>Category</th><th>Price</th>
// // //             <th>Price Suggestion</th><th/>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {list.map(p=>(
// // //             <tr key={p._id}>
// // //               <td>{p.title}</td>
// // //               <td>{p.brand}</td>
// // //               <td>{p.category}</td>
// // //               <td>₹{p.price}</td>
// // //               <td>{renderSuggCell(p)}</td>
// // //               <td className="row gap">
// // //                 <Link className="btn" to={`/admin/products/${p._id}`}>Edit</Link>
// // //                 <button
// // //                   className="btn danger"
// // //                   onClick={()=>dispatch(deleteProduct(p._id)).then(()=>dispatch(fetchProducts({limit:100})))}
// // //                 >
// // //                   Delete
// // //                 </button>
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // }


// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchProducts, deleteProduct } from "../../store/productSlice.js";
// // import { Link } from "react-router-dom";
// // import http from "../../api/http.js";
// // import "./Products.css";

// // export default function Products() {
// //   const dispatch = useDispatch();
// //   const { list } = useSelector((s) => s.products);
// //   const [sugg, setSugg] = useState({}); // { [id]: { loading, data, error } }

// //   useEffect(() => {
// //     dispatch(fetchProducts({ limit: 100 }));
// //   }, [dispatch]);

// //   const suggest = async (p) => {
// //     setSugg((x) => ({ ...x, [p._id]: { loading: true, data: null, error: "" } }));
// //     try {
// //       const { data } = await http.get(`/api/ai/price-suggest/${p._id}`);
// //       setSugg((x) => ({ ...x, [p._id]: { loading: false, data, error: "" } }));
// //     } catch (e) {
// //       const msg = e?.response?.data?.error || "Failed to fetch";
// //       setSugg((x) => ({ ...x, [p._id]: { loading: false, data: null, error: msg } }));
// //     }
// //   };

// //   const apply = async (p) => {
// //     const s = sugg[p._id];
// //     const suggested = s?.data?.suggested;
// //     if (!suggested) return;

// //     setSugg((x) => ({ ...x, [p._id]: { ...(x[p._id] || {}), loading: true, error: "" } }));
// //     try {
// //       await http.put(`/api/products/${p._id}`, { price: suggested });
// //       await dispatch(fetchProducts({ limit: 100 }));
// //       setSugg((x) => ({
// //         ...x,
// //         [p._id]: { loading: false, data: { ...s.data, applied: true }, error: "" },
// //       }));
// //     } catch (e) {
// //       const status = e?.response?.status;
// //       const msg =
// //         status === 404
// //           ? "Endpoint not found: PUT /api/products/:id"
// //           : status === 401 || status === 403
// //           ? "Unauthorized (login as admin)"
// //           : e?.response?.data?.error || "Apply failed";
// //       setSugg((x) => ({ ...x, [p._id]: { loading: false, data: s?.data, error: msg } }));
// //     }
// //   };

// //   const renderSuggCell = (p) => {
// //     const s = sugg[p._id];
// //     return (
// //       <>
// //         <button className="btn btn-primary" onClick={() => suggest(p)} disabled={!!s?.loading}>
// //           {s?.loading ? "Calculating..." : "Suggest"}
// //         </button>

// //         {s?.error && (
// //           <div className="error mt6" role="alert">
// //             {s.error}
// //           </div>
// //         )}

// //         {s?.data && (
// //           <div className="mt6">
// //             <div className="muted">
// //               <b>{s.data.message}</b>
// //             </div>
// //             <div className="row gap mt6">
// //               <button
// //                 className="btn btn-success"
// //                 onClick={() => apply(p)}
// //                 disabled={s.loading || s.data.applied || s.data.suggested === p.price}
// //               >
// //                 {s.data.applied ? "Applied" : `Apply ₹${s.data.suggested}`}
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </>
// //     );
// //   };

// //   return (
// //     <div className="pg-wrap">
// //       <div className="row space page-head">
// //         <div>
// //           <h2 className="title">Products</h2>
// //           <p className="sub">Manage catalog, pricing & AI suggestions</p>
// //         </div>
// //         <Link className="btn btn-dark" to="/admin/products/new">
// //           New
// //         </Link>
// //       </div>

// //       <div className="table-wrap">
// //         <table className="table">
// //           <thead>
// //             <tr>
// //               <th>Title</th>
// //               <th>Brand</th>
// //               <th>Category</th>
// //               <th className="right">Price</th>
// //               <th>Price Suggestion</th>
// //               <th className="right">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {list.map((p) => (
// //               <tr key={p._id}>
// //                 <td className="ellipsis" title={p.title}>
// //                   {p.title}
// //                 </td>
// //                 <td className="ellipsis" title={p.brand}>
// //                   {p.brand}
// //                 </td>
// //                 <td className="ellipsis" title={p.category}>
// //                   {p.category}
// //                 </td>
// //                 <td className="right">₹{p.price}</td>
// //                 <td>{renderSuggCell(p)}</td>
// //                 <td className="right">
// //                   <div className="actions">
// //                     <Link className="btn btn-light" to={`/admin/products/${p._id}`}>
// //                       Edit
// //                     </Link>
// //                     <button
// //                       className="btn btn-danger"
// //                       onClick={() =>
// //                         dispatch(deleteProduct(p._id)).then(() =>
// //                           dispatch(fetchProducts({ limit: 100 }))
// //                         )
// //                       }
// //                     >
// //                       Delete
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             ))}
// //             {!list.length && (
// //               <tr>
// //                 <td colSpan="6" className="muted center">
// //                   No products found.
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }





// // frontend/src/pages/Admin/Products.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts, deleteProduct } from "../../store/productSlice.js";
// import { Link } from "react-router-dom";
// import http from "../../api/http.js";
// import "./Products.css";

// export default function Products() {
//   const dispatch = useDispatch();
//   const { list = [] } = useSelector((s) => s.products);

//   // AI price suggest state: { [id]: { loading, data, error } }
//   const [sugg, setSugg] = useState({});

//   // ---------- Filters ----------
//   const [q, setQ] = useState("");
//   const [brand, setBrand] = useState("");
//   const [category, setCategory] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [sort, setSort] = useState("price_asc");
//   const [pageSize, setPageSize] = useState(10);
//   const [page, setPage] = useState(1);

//   // Load products
//   useEffect(() => {
//     dispatch(fetchProducts({ limit: 100 }));
//   }, [dispatch]);

//   // Derived filter options
//   const brands = useMemo(() => {
//     const s = new Set();
//     list.forEach((p) => p?.brand && s.add(p.brand));
//     return Array.from(s).sort((a, b) => a.localeCompare(b));
//   }, [list]);

//   const categories = useMemo(() => {
//     const s = new Set();
//     list.forEach((p) => p?.category && s.add(p.category));
//     return Array.from(s).sort((a, b) => a.localeCompare(b));
//   }, [list]);

//   // Filter + sort + paginate
//   const filtered = useMemo(() => {
//     const ql = q.trim().toLowerCase();
//     let arr = list.filter((p) => {
//       if (ql) {
//         const blob = `${p.title || ""} ${p.brand || ""} ${p.category || ""}`.toLowerCase();
//         if (!blob.includes(ql)) return false;
//       }
//       if (brand && p.brand !== brand) return false;
//       if (category && p.category !== category) return false;

//       const price = Number(p.price) || 0;
//       if (minPrice !== "" && price < Number(minPrice)) return false;
//       if (maxPrice !== "" && price > Number(maxPrice)) return false;

//       return true;
//     });

//     arr.sort((a, b) => {
//       const pa = Number(a.price) || 0;
//       const pb = Number(b.price) || 0;
//       if (sort === "price_asc") return pa - pb;
//       if (sort === "price_desc") return pb - pa;
//       if (sort === "title_asc") return (a.title || "").localeCompare(b.title || "");
//       if (sort === "title_desc") return (b.title || "").localeCompare(a.title || "");
//       return 0;
//     });

//     return arr;
//   }, [list, q, brand, category, minPrice, maxPrice, sort]);

//   // Reset page when filters change
//   useEffect(() => { setPage(1); }, [q, brand, category, minPrice, maxPrice, sort, pageSize]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
//   const pageData = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return filtered.slice(start, start + pageSize);
//   }, [filtered, page, pageSize]);

//   const clearFilters = () => {
//     setQ(""); setBrand(""); setCategory("");
//     setMinPrice(""); setMaxPrice("");
//     setSort("price_asc"); setPage(1);
//   };

//   // ---------- AI Suggest ----------
//   const suggest = async (p) => {
//     setSugg((x) => ({ ...x, [p._id]: { loading: true, data: null, error: "" } }));
//     try {
//       const { data } = await http.get(`/api/ai/price-suggest/${p._id}`);
//       setSugg((x) => ({ ...x, [p._id]: { loading: false, data, error: "" } }));
//     } catch (e) {
//       const msg = e?.response?.data?.error || "Failed to fetch";
//       setSugg((x) => ({ ...x, [p._id]: { loading: false, data: null, error: msg } }));
//     }
//   };

//   const apply = async (p) => {
//     const s = sugg[p._id];
//     const suggested = s?.data?.suggested;
//     if (!suggested) return;

//     setSugg((x) => ({ ...x, [p._id]: { ...(x[p._id] || {}), loading: true, error: "" } }));
//     try {
//       await http.put(`/api/products/${p._id}`, { price: suggested });
//       await dispatch(fetchProducts({ limit: 100 }));
//       setSugg((x) => ({
//         ...x,
//         [p._id]: { loading: false, data: { ...s.data, applied: true }, error: "" },
//       }));
//     } catch (e) {
//       const status = e?.response?.status;
//       const msg =
//         status === 404
//           ? "Endpoint not found: PUT /api/products/:id"
//           : status === 401 || status === 403
//           ? "Unauthorized (login as admin)"
//           : e?.response?.data?.error || "Apply failed";
//       setSugg((x) => ({ ...x, [p._id]: { loading: false, data: s?.data, error: msg } }));
//     }
//   };

//   const renderSuggCell = (p) => {
//     const s = sugg[p._id];
//     return (
//       <>
//         <button className="btn btn-primary" onClick={() => suggest(p)} disabled={!!s?.loading}>
//           {s?.loading ? "Calculating..." : "Suggest"}
//         </button>

//         {s?.error && (
//           <div className="error mt6" role="alert">
//             {s.error}
//           </div>
//         )}

//         {s?.data && (
//           <div className="mt6">
//             <div className="muted">
//               <b>{s.data.message}</b>
//             </div>
//             <div className="row gap mt6">
//               <button
//                 className="btn btn-success"
//                 onClick={() => apply(p)}
//                 disabled={s.loading || s.data.applied || s.data.suggested === p.price}
//               >
//                 {s.data.applied ? "Applied" : `Apply ₹${s.data.suggested}`}
//               </button>
//             </div>
//           </div>
//         )}
//       </>
//     );
//   };

//   return (
//     <div className="pg-wrap">
//       {/* Header */}
//       <div className="row space page-head">
//         <div>
//           <h2 className="title">Products</h2>
//           <p className="sub">Manage catalog, pricing & AI suggestions</p>
//         </div>
//         <Link className="btn btn-dark" to="/admin/products/new">
//           New
//         </Link>
//       </div>

//       {/* Filters */}
//       <section className="flt-wrap">
//         <div className="flt-grid">
//           <div className="flt-field">
//             <label>Search</label>
//             <input
//               type="text"
//               placeholder="Title, brand or category…"
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//             />
//           </div>

//           <div className="flt-field">
//             <label>Brand</label>
//             <select value={brand} onChange={(e) => setBrand(e.target.value)}>
//               <option value="">All</option>
//               {brands.map((b) => (
//                 <option key={b} value={b}>{b}</option>
//               ))}
//             </select>
//           </div>

//           <div className="flt-field">
//             <label>Category</label>
//             <select value={category} onChange={(e) => setCategory(e.target.value)}>
//               <option value="">All</option>
//               {categories.map((c) => (
//                 <option key={c} value={c}>{c}</option>
//               ))}
//             </select>
//           </div>

//           <div className="flt-row">
//             <div className="flt-field">
//               <label>Min ₹</label>
//               <input
//                 type="number"
//                 min="0"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(e.target.value)}
//                 placeholder="0"
//               />
//             </div>
//             <div className="flt-field">
//               <label>Max ₹</label>
//               <input
//                 type="number"
//                 min="0"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//                 placeholder="50000"
//               />
//             </div>
//           </div>

//           <div className="flt-field">
//             <label>Sort by</label>
//             <select value={sort} onChange={(e) => setSort(e.target.value)}>
//               <option value="price_asc">Price (low → high)</option>
//               <option value="price_desc">Price (high → low)</option>
//               <option value="title_asc">Title (A → Z)</option>
//               <option value="title_desc">Title (Z → A)</option>
//             </select>
//           </div>

//           <div className="flt-field">
//             <label>Page size</label>
//             <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
//               {[10, 20, 50, 100].map((n) => (
//                 <option key={n} value={n}>{n}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="flt-actions">
//           <div className="muted">
//             Showing <b>{pageData.length}</b> of <b>{filtered.length}</b> (Total: {list.length})
//           </div>
//           <div className="row gap">
//             <button className="btn" onClick={clearFilters}>Reset</button>
//           </div>
//         </div>
//       </section>

//       {/* Table */}
//       <div className="table-wrap">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Brand</th>
//               <th>Category</th>
//               <th className="right">Price</th>
//               <th>Price Suggestion</th>
//               <th className="right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pageData.map((p) => (
//               <tr key={p._id}>
//                 <td className="ellipsis" title={p.title}>{p.title}</td>
//                 <td className="ellipsis" title={p.brand}>{p.brand}</td>
//                 <td className="ellipsis" title={p.category}>{p.category}</td>
//                 <td className="right">₹{p.price}</td>
//                 <td>{renderSuggCell(p)}</td>
//                 <td className="right">
//                   <div className="actions">
//                     <Link className="btn btn-light" to={`/admin/products/${p._id}`}>
//                       Edit
//                     </Link>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() =>
//                         dispatch(deleteProduct(p._id)).then(() =>
//                           dispatch(fetchProducts({ limit: 100 }))
//                         )
//                       }
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}

//             {!pageData.length && (
//               <tr>
//                 <td colSpan="6" className="muted center">No products found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="pager">
//         <button
//           className="btn"
//           disabled={page <= 1}
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//         >
//           ‹ Prev
//         </button>
//         <div className="pager-info">Page <b>{page}</b> of <b>{totalPages}</b></div>
//         <button
//           className="btn"
//           disabled={page >= totalPages}
//           onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//         >
//           Next ›
//         </button>
//       </div>
//     </div>
//   );
// }




// frontend/src/pages/Admin/Products.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../store/productSlice.js";
import { Link } from "react-router-dom";
import http from "../../api/http.js";

export default function Products() {
  const dispatch = useDispatch();
  const { list = [] } = useSelector((s) => s.products);

  // AI price suggest state: { [id]: { loading, data, error } }
  const [sugg, setSugg] = useState({});

  // ---------- Filters ----------
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("price_asc");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  // Load products
  useEffect(() => {
    dispatch(fetchProducts({ limit: 100 }));
  }, [dispatch]);

  // Derived filter options
  const brands = useMemo(() => {
    const s = new Set();
    list.forEach((p) => p?.brand && s.add(p.brand));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [list]);

  const categories = useMemo(() => {
    const s = new Set();
    list.forEach((p) => p?.category && s.add(p.category));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [list]);

  // Filter + sort + paginate
  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    let arr = list.filter((p) => {
      if (ql) {
        const blob = `${p.title || ""} ${p.brand || ""} ${p.category || ""}`.toLowerCase();
        if (!blob.includes(ql)) return false;
      }
      if (brand && p.brand !== brand) return false;
      if (category && p.category !== category) return false;

      const price = Number(p.price) || 0;
      if (minPrice !== "" && price < Number(minPrice)) return false;
      if (maxPrice !== "" && price > Number(maxPrice)) return false;

      return true;
    });

    arr.sort((a, b) => {
      const pa = Number(a.price) || 0;
      const pb = Number(b.price) || 0;
      if (sort === "price_asc") return pa - pb;
      if (sort === "price_desc") return pb - pa;
      if (sort === "title_asc") return (a.title || "").localeCompare(b.title || "");
      if (sort === "title_desc") return (b.title || "").localeCompare(a.title || "");
      return 0;
    });

    return arr;
  }, [list, q, brand, category, minPrice, maxPrice, sort]);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [q, brand, category, minPrice, maxPrice, sort, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const clearFilters = () => {
    setQ(""); setBrand(""); setCategory("");
    setMinPrice(""); setMaxPrice("");
    setSort("price_asc"); setPage(1);
  };

  // ---------- AI Suggest ----------
  const suggest = async (p) => {
    setSugg((x) => ({ ...x, [p._id]: { loading: true, data: null, error: "" } }));
    try {
      const { data } = await http.get(`/api/ai/price-suggest/${p._id}`);
      setSugg((x) => ({ ...x, [p._id]: { loading: false, data, error: "" } }));
    } catch (e) {
      const msg = e?.response?.data?.error || "Failed to fetch";
      setSugg((x) => ({ ...x, [p._id]: { loading: false, data: null, error: msg } }));
    }
  };

  const apply = async (p) => {
    const s = sugg[p._id];
    const suggested = s?.data?.suggested;
    if (!suggested) return;

    setSugg((x) => ({ ...x, [p._id]: { ...(x[p._id] || {}), loading: true, error: "" } }));
    try {
      await http.put(`/api/products/${p._id}`, { price: suggested });
      await dispatch(fetchProducts({ limit: 100 }));
      setSugg((x) => ({
        ...x,
        [p._id]: { loading: false, data: { ...s.data, applied: true }, error: "" },
      }));
    } catch (e) {
      const status = e?.response?.status;
      const msg =
        status === 404
          ? "Endpoint not found: PUT /api/products/:id"
          : status === 401 || status === 403
          ? "Unauthorized (login as admin)"
          : e?.response?.data?.error || "Apply failed";
      setSugg((x) => ({ ...x, [p._id]: { loading: false, data: s?.data, error: msg } }));
    }
  };

  const renderSuggCell = (p) => {
    const s = sugg[p._id];
    return (
      <div className="min-w-[160px]">
        <button
          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={() => suggest(p)}
          disabled={!!s?.loading}
        >
          {s?.loading ? "Calculating..." : "Suggest"}
        </button>

        {s?.error && (
          <div
            role="alert"
            className="mt-2 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-md px-2 py-1"
          >
            {s.error}
          </div>
        )}

        {s?.data && (
          <div className="mt-2">
            <div className="text-xs text-neutral-500">
              <span className="font-semibold text-neutral-700">{s.data.message}</span>
            </div>
            <div className="flex gap-2 mt-1.5">
              <button
                className="px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={() => apply(p)}
                disabled={s.loading || s.data.applied || s.data.suggested === p.price}
              >
                {s.data.applied ? "Applied ✓" : `Apply ₹${s.data.suggested}`}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const selectCls =
    "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow";
  const inputCls = selectCls;
  const labelCls = "block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">Products</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage catalog, pricing & AI suggestions</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center justify-center rounded-lg bg-neutral-900 text-white text-sm font-semibold px-4 py-2.5 hover:bg-neutral-800 transition-colors shadow-sm"
        >
          + New Product
        </Link>
      </div>

      {/* Filters */}
      <section className="bg-white border border-neutral-200 rounded-xl shadow-sm p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className={labelCls}>Search</label>
            <input
              type="text"
              className={inputCls}
              placeholder="Title, brand or category…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls}>Brand</label>
            <select className={selectCls} value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">All</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Category</label>
            <select className={selectCls} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Min ₹</label>
              <input
                type="number"
                min="0"
                className={inputCls}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <label className={labelCls}>Max ₹</label>
              <input
                type="number"
                min="0"
                className={inputCls}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Sort by</label>
            <select className={selectCls} value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="price_asc">Price (low → high)</option>
              <option value="price_desc">Price (high → low)</option>
              <option value="title_asc">Title (A → Z)</option>
              <option value="title_desc">Title (Z → A)</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Page size</label>
            <select
              className={selectCls}
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 pt-4 border-t border-neutral-100">
          <div className="text-sm text-neutral-500">
            Showing <span className="font-semibold text-neutral-800">{pageData.length}</span> of{" "}
            <span className="font-semibold text-neutral-800">{filtered.length}</span>{" "}
            (Total: {list.length})
          </div>
          <button
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors w-fit"
            onClick={clearFilters}
          >
            Reset Filters
          </button>
        </div>
      </section>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="text-left font-semibold text-neutral-600 uppercase text-xs tracking-wide px-4 py-3">
                  Title
                </th>
                <th className="text-left font-semibold text-neutral-600 uppercase text-xs tracking-wide px-4 py-3">
                  Brand
                </th>
                <th className="text-left font-semibold text-neutral-600 uppercase text-xs tracking-wide px-4 py-3">
                  Category
                </th>
                <th className="text-right font-semibold text-neutral-600 uppercase text-xs tracking-wide px-4 py-3">
                  Price
                </th>
                <th className="text-left font-semibold text-neutral-600 uppercase text-xs tracking-wide px-4 py-3">
                  Price Suggestion
                </th>
                <th className="text-right font-semibold text-neutral-600 uppercase text-xs tracking-wide px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {pageData.map((p) => (
                <tr key={p._id} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="px-4 py-3 max-w-[220px] truncate text-neutral-800 font-medium" title={p.title}>
                    {p.title}
                  </td>
                  <td className="px-4 py-3 max-w-[140px] truncate text-neutral-600" title={p.brand}>
                    {p.brand}
                  </td>
                  <td className="px-4 py-3 max-w-[140px] truncate text-neutral-600" title={p.category}>
                    {p.category}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-neutral-900">₹{p.price}</td>
                  <td className="px-4 py-3">{renderSuggCell(p)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/products/${p._id}`}
                        className="px-3 py-1.5 text-xs font-semibold rounded-md border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        className="px-3 py-1.5 text-xs font-semibold rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                        onClick={() =>
                          dispatch(deleteProduct(p._id)).then(() =>
                            dispatch(fetchProducts({ limit: 100 }))
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!pageData.length && (
                <tr>
                  <td colSpan="6" className="text-center text-neutral-400 py-10">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-5">
        <button
          className="px-4 py-2 text-sm font-semibold rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          ‹ Prev
        </button>
        <div className="text-sm text-neutral-500">
          Page <span className="font-semibold text-neutral-800">{page}</span> of{" "}
          <span className="font-semibold text-neutral-800">{totalPages}</span>
        </div>
        <button
          className="px-4 py-2 text-sm font-semibold rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next ›
        </button>
      </div>
    </div>
  );
}