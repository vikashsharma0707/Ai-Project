// // // // import React, { useEffect } from 'react';
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import { fetchProducts, deleteProduct } from '../../store/productSlice.js';
// // // // import { Link } from 'react-router-dom';

// // // // export default function Products(){
// // // //   const dispatch = useDispatch();
// // // //   const { list } = useSelector(s=>s.products);
// // // //   useEffect(()=>{ dispatch(fetchProducts({ limit: 100 })); }, [dispatch]);

// // // //   return (
// // // //     <div>
// // // //       <div className="row space">
// // // //         <h2>Products</h2>
// // // //         <Link className="btn" to="/admin/products/new">New</Link>
// // // //       </div>
// // // //       <table className="table">
// // // //         <thead><tr><th>Title</th><th>Brand</th><th>Category</th><th>Price</th><th/></tr></thead>
// // // //         <tbody>
// // // //           {list.map(p=><tr key={p._id}>
// // // //             <td>{p.title}</td><td>{p.brand}</td><td>{p.category}</td><td>₹{p.price}</td>
// // // //             <td className="row gap">
// // // //               <Link className="btn" to={`/admin/products/${p._id}`}>Edit</Link>
// // // //               <button className="btn danger" onClick={()=>dispatch(deleteProduct(p._id)).then(()=>dispatch(fetchProducts({limit:100})))}>Delete</button>
// // // //             </td>
// // // //           </tr>)}
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

// // //   // row-wise suggestion state: { [productId]: {loading, data, error} }
// // //   const [sugg, setSugg] = useState({});

// // //   useEffect(()=>{ dispatch(fetchProducts({ limit: 100 })); }, [dispatch]);

// // //   const suggest = async (p) => {
// // //     setSugg(x => ({ ...x, [p._id]: { loading: true, data: null, error: "" }}));
// // //     try {
// // //       const { data } = await http.get(`/api/ai/price-suggest/${p._id}`);
// // //       setSugg(x => ({ ...x, [p._id]: { loading: false, data, error: "" }}));
// // //     } catch (e) {
// // //       setSugg(x => ({ ...x, [p._id]: { loading: false, data: null, error: "Failed to fetch" }}));
// // //     }
// // //   };

// // //   const apply = async (p) => {
// // //     const data = sugg[p._id]?.data;
// // //     if (!data?.suggested) return;
// // //     setSugg(x => ({ ...x, [p._id]: { ...(x[p._id]||{}), loading: true }}));
// // //     try {
// // //       // ⚠️ Update endpoint ko apne backend ke hisaab se adjust karna:
// // //       // Agar tumhare paas PUT /api/products/:id hai, to niche wali line ko usse replace kar do.
// // //       await http.put(`/api/admin/products/${p._id}`, { price: data.suggested });
// // //       await dispatch(fetchProducts({ limit: 100 }));
// // //       setSugg(x => ({ ...x, [p._id]: { loading: false, data: { ...data, applied: true }, error: "" }}));
// // //     } catch (e) {
// // //       setSugg(x => ({ ...x, [p._id]: { loading: false, data, error: "Apply failed" }}));
// // //     }
// // //   };

// // //   const msg = (p) => {
// // //     const s = sugg[p._id];
// // //     if (!s?.data) return null;
// // //     const d = s.data;
// // //     const sign = d.deltaPct >= 0 ? "+" : "";
// // //     return (
// // //       <div className="muted" style={{marginTop:6}}>
// // //         <b>{d.message}</b>
// // //         <div className="row" style={{gap:8, marginTop:6}}>
// // //           <button className="btn btn-buy" onClick={()=>apply(p)} disabled={s.loading || d.applied}>
// // //             {d.applied ? "Applied" : `Apply ₹${d.suggested}`}
// // //           </button>
// // //         </div>
// // //       </div>
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
// // //             <th>Price Suggestion</th>
// // //             <th/>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {list.map(p=>(
// // //             <tr key={p._id}>
// // //               <td>{p.title}</td>
// // //               <td>{p.brand}</td>
// // //               <td>{p.category}</td>
// // //               <td>₹{p.price}</td>
// // //               <td>
// // //                 <button
// // //                   className="btn"
// // //                   onClick={()=>suggest(p)}
// // //                   disabled={!!sugg[p._id]?.loading}
// // //                 >
// // //                   {sugg[p._id]?.loading ? "Calculating..." : "Suggest"}
// // //                 </button>
// // //                 {sugg[p._id]?.error && <div className="error" style={{marginTop:6}}>{sugg[p._id].error}</div>}
// // //                 {msg(p)}
// // //               </td>
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


// // import React, { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchProducts, deleteProduct } from '../../store/productSlice.js';
// // import { Link } from 'react-router-dom';
// // import http from '../../api/http.js';

// // export default function Products(){
// //   const dispatch = useDispatch();
// //   const { list } = useSelector(s=>s.products);
// //   const [sugg, setSugg] = useState({}); // { [id]: { loading, data, error } }

// //   useEffect(()=>{ dispatch(fetchProducts({ limit: 100 })); }, [dispatch]);

// //   const suggest = async (p) => {
// //     setSugg(x => ({ ...x, [p._id]: { loading: true, data: null, error: "" }}));
// //     try {
// //       const { data } = await http.get(`/api/ai/price-suggest/${p._id}`);
// //       setSugg(x => ({ ...x, [p._id]: { loading: false, data, error: "" }}));
// //     } catch (e) {
// //       const msg = e?.response?.data?.error || "Failed to fetch";
// //       setSugg(x => ({ ...x, [p._id]: { loading: false, data: null, error: msg }}));
// //     }
// //   };

// //   const apply = async (p) => {
// //     const s = sugg[p._id];
// //     const suggested = s?.data?.suggested;
// //     if (!suggested) return;

// //     setSugg(x => ({ ...x, [p._id]: { ...(x[p._id]||{}), loading: true, error: "" }}));
// //     try {
// //       // ✅ Use your actual update route (most projects: /api/products/:id)
// //       await http.put(`/api/products/${p._id}`, { price: suggested });
// //       await dispatch(fetchProducts({ limit: 100 }));
// //       setSugg(x => ({ ...x, [p._id]: { loading: false, data: { ...s.data, applied: true }, error: "" }}));
// //     } catch (e) {
// //       const status = e?.response?.status;
// //       const msg =
// //         status === 404 ? "Endpoint not found: PUT /api/products/:id" :
// //         status === 401 || status === 403 ? "Unauthorized (login as admin)" :
// //         (e?.response?.data?.error || "Apply failed");
// //       setSugg(x => ({ ...x, [p._id]: { loading: false, data: s?.data, error: msg }}));
// //     }
// //   };

// //   const renderSuggCell = (p) => {
// //     const s = sugg[p._id];
// //     return (
// //       <>
// //         <button
// //           className="btn"
// //           onClick={()=>suggest(p)}
// //           disabled={!!s?.loading}
// //         >
// //           {s?.loading ? "Calculating..." : "Suggest"}
// //         </button>

// //         {s?.error && <div className="error" style={{marginTop:6}}>{s.error}</div>}

// //         {s?.data && (
// //           <div style={{marginTop:6}}>
// //             <div className="muted"><b>{s.data.message}</b></div>
// //             <div className="row" style={{gap:8, marginTop:6}}>
// //               <button
// //                 className="btn btn-buy"
// //                 onClick={()=>apply(p)}
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
// //     <div>
// //       <div className="row space">
// //         <h2>Products</h2>
// //         <Link className="btn" to="/admin/products/new">New</Link>
// //       </div>

// //       <table className="table">
// //         <thead>
// //           <tr>
// //             <th>Title</th><th>Brand</th><th>Category</th><th>Price</th>
// //             <th>Price Suggestion</th><th/>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {list.map(p=>(
// //             <tr key={p._id}>
// //               <td>{p.title}</td>
// //               <td>{p.brand}</td>
// //               <td>{p.category}</td>
// //               <td>₹{p.price}</td>
// //               <td>{renderSuggCell(p)}</td>
// //               <td className="row gap">
// //                 <Link className="btn" to={`/admin/products/${p._id}`}>Edit</Link>
// //                 <button
// //                   className="btn danger"
// //                   onClick={()=>dispatch(deleteProduct(p._id)).then(()=>dispatch(fetchProducts({limit:100})))}
// //                 >
// //                   Delete
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts, deleteProduct } from "../../store/productSlice.js";
// import { Link } from "react-router-dom";
// import http from "../../api/http.js";
// import "./Products.css";

// export default function Products() {
//   const dispatch = useDispatch();
//   const { list } = useSelector((s) => s.products);
//   const [sugg, setSugg] = useState({}); // { [id]: { loading, data, error } }

//   useEffect(() => {
//     dispatch(fetchProducts({ limit: 100 }));
//   }, [dispatch]);

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
//       <div className="row space page-head">
//         <div>
//           <h2 className="title">Products</h2>
//           <p className="sub">Manage catalog, pricing & AI suggestions</p>
//         </div>
//         <Link className="btn btn-dark" to="/admin/products/new">
//           New
//         </Link>
//       </div>

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
//             {list.map((p) => (
//               <tr key={p._id}>
//                 <td className="ellipsis" title={p.title}>
//                   {p.title}
//                 </td>
//                 <td className="ellipsis" title={p.brand}>
//                   {p.brand}
//                 </td>
//                 <td className="ellipsis" title={p.category}>
//                   {p.category}
//                 </td>
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
//             {!list.length && (
//               <tr>
//                 <td colSpan="6" className="muted center">
//                   No products found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
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
import "./Products.css";

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
      <>
        <button className="btn btn-primary" onClick={() => suggest(p)} disabled={!!s?.loading}>
          {s?.loading ? "Calculating..." : "Suggest"}
        </button>

        {s?.error && (
          <div className="error mt6" role="alert">
            {s.error}
          </div>
        )}

        {s?.data && (
          <div className="mt6">
            <div className="muted">
              <b>{s.data.message}</b>
            </div>
            <div className="row gap mt6">
              <button
                className="btn btn-success"
                onClick={() => apply(p)}
                disabled={s.loading || s.data.applied || s.data.suggested === p.price}
              >
                {s.data.applied ? "Applied" : `Apply ₹${s.data.suggested}`}
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="pg-wrap">
      {/* Header */}
      <div className="row space page-head">
        <div>
          <h2 className="title">Products</h2>
          <p className="sub">Manage catalog, pricing & AI suggestions</p>
        </div>
        <Link className="btn btn-dark" to="/admin/products/new">
          New
        </Link>
      </div>

      {/* Filters */}
      <section className="flt-wrap">
        <div className="flt-grid">
          <div className="flt-field">
            <label>Search</label>
            <input
              type="text"
              placeholder="Title, brand or category…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="flt-field">
            <label>Brand</label>
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">All</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="flt-field">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flt-row">
            <div className="flt-field">
              <label>Min ₹</label>
              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="flt-field">
              <label>Max ₹</label>
              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="50000"
              />
            </div>
          </div>

          <div className="flt-field">
            <label>Sort by</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="price_asc">Price (low → high)</option>
              <option value="price_desc">Price (high → low)</option>
              <option value="title_asc">Title (A → Z)</option>
              <option value="title_desc">Title (Z → A)</option>
            </select>
          </div>

          <div className="flt-field">
            <label>Page size</label>
            <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flt-actions">
          <div className="muted">
            Showing <b>{pageData.length}</b> of <b>{filtered.length}</b> (Total: {list.length})
          </div>
          <div className="row gap">
            <button className="btn" onClick={clearFilters}>Reset</button>
          </div>
        </div>
      </section>

      {/* Table */}
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Brand</th>
              <th>Category</th>
              <th className="right">Price</th>
              <th>Price Suggestion</th>
              <th className="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((p) => (
              <tr key={p._id}>
                <td className="ellipsis" title={p.title}>{p.title}</td>
                <td className="ellipsis" title={p.brand}>{p.brand}</td>
                <td className="ellipsis" title={p.category}>{p.category}</td>
                <td className="right">₹{p.price}</td>
                <td>{renderSuggCell(p)}</td>
                <td className="right">
                  <div className="actions">
                    <Link className="btn btn-light" to={`/admin/products/${p._id}`}>
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
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
                <td colSpan="6" className="muted center">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pager">
        <button
          className="btn"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          ‹ Prev
        </button>
        <div className="pager-info">Page <b>{page}</b> of <b>{totalPages}</b></div>
        <button
          className="btn"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next ›
        </button>
      </div>
    </div>
  );
}
