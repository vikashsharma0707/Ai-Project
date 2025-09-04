



// // src/pages/Shop.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import http from "../api/http";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../store/cartSlice";
// import { Link } from "react-router-dom";
// import "../assets/css/shop.css"; // make sure this exists (from my previous message)

// const priceRanges = [
//   { label: "Any", value: "any" },
//   { label: "Under ₹500", value: "u500", min: 0, max: 499 },
//   { label: "₹500 – ₹1000", value: "500_1000", min: 500, max: 1000 },
//   { label: "₹1000 – ₹2000", value: "1000_2000", min: 1000, max: 2000 },
//   { label: "₹2000+", value: "2000p", min: 2000 },
// ];

// const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "free"];

// export default function Shop() {
//   const [loading, setLoading] = useState(true);
//   const [all, setAll] = useState([]);
//   const [q, setQ] = useState("");
//   const [brand, setBrand] = useState("");
//   const [category, setCategory] = useState("");
//   const [size, setSize] = useState("");
//   const [price, setPrice] = useState("any");
//   const [sort, setSort] = useState("featured");
//   const [perPage, setPerPage] = useState(40);
//   const [page, setPage] = useState(1);

//   const dispatch = useDispatch();

//   const fetchBase = async (params = {}) => {
//     setLoading(true);
//     try {
//       const query = new URLSearchParams({
//         limit: 200,
//         ...(params.q ? { q: params.q } : {}),
//         ...(params.brand ? { brand: params.brand } : {}),
//         ...(params.category ? { category: params.category } : {}),
//       }).toString();

//       const { data } = await http.get(`/api/products?${query}`);
//       const items = Array.isArray(data) ? data : data.items || [];
//       setAll(items);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBase({ q, brand, category });
//   }, [q, brand, category]);

//   const brands = useMemo(() => {
//     const s = new Set();
//     all.forEach((p) => p.brand && s.add(p.brand));
//     return Array.from(s).sort();
//   }, [all]);

//   const categories = useMemo(() => {
//     const s = new Set();
//     all.forEach((p) => p.category && s.add(p.category));
//     return Array.from(s).sort();
//   }, [all]);

//   const filtered = useMemo(() => {
//     const pr = priceRanges.find((r) => r.value === price) || priceRanges[0];
//     let list = all.filter((p) => {
//       const passPrice =
//         pr.value === "any"
//           ? true
//           : typeof pr.min === "number" && typeof pr.max === "number"
//           ? p.price >= pr.min && p.price <= pr.max
//           : typeof pr.min === "number"
//           ? p.price >= pr.min
//           : true;

//       const passSize = !size
//         ? true
//         : Array.isArray(p.variants) &&
//           p.variants.some(
//             (v) => (v.size || "").toLowerCase() === size.toLowerCase()
//           );

//       const passName = q
//         ? (p.title || "").toLowerCase().includes(q.toLowerCase())
//         : true;

//       return passPrice && passSize && passName;
//     });

//     if (sort === "priceAsc") list.sort((a, b) => a.price - b.price);
//     else if (sort === "priceDesc") list.sort((a, b) => b.price - a.price);
//     else if (sort === "newest")
//       list.sort(
//         (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
//       );
//     else
//       list.sort(
//         (a, b) =>
//           (b.ratingAvg || 0) - (a.ratingAvg || 0) ||
//           (b.ratingCount || 0) - (a.ratingCount || 0)
//       );

//     return list;
//   }, [all, price, size, sort, q]);

//   const pages = Math.max(1, Math.ceil(filtered.length / perPage));
//   const curPage = Math.min(page, pages);
//   const start = (curPage - 1) * perPage;
//   const visible = filtered.slice(start, start + perPage);

//   const clearAll = () => {
//     setQ("");
//     setBrand("");
//     setCategory("");
//     setSize("");
//     setPrice("any");
//     setSort("featured");
//     setPerPage(40);
//     setPage(1);
//   };

//   const add = (p) => dispatch(addToCart({ ...p, qty: 1 }));

//   const imgSrc = (p) => {
//     const url = p.images?.[0];
//     if (!url) return "";
//     if (url.startsWith("/uploads")) {
//       return (import.meta.env.VITE_API_BASE || "") + url;
//     }
//     return url;
//   };

//   return (
//     <div className="shop-wrap">
//       <h2>Featured Categories</h2>

//       {/* Top toolbar */}
//       <div className="row gap" style={{ justifyContent: "space-between", marginBottom: 12 }}>
//         <div className="row gap">
//           <input
//             type="search"
//             placeholder="Search by name…"
//             value={q}
//             onChange={(e) => {
//               setQ(e.target.value);
//               setPage(1);
//             }}
//           />
//         </div>

//         <div className="row gap">
//           <label>
//             Sort by:&nbsp;
//             <select value={sort} onChange={(e) => setSort(e.target.value)}>
//               <option value="featured">Featured Items</option>
//               <option value="priceAsc">Price: Low to High</option>
//               <option value="priceDesc">Price: High to Low</option>
//               <option value="newest">Newest</option>
//             </select>
//           </label>
//           <label>
//             Show:&nbsp;
//             <select
//               value={perPage}
//               onChange={(e) => {
//                 setPerPage(Number(e.target.value));
//                 setPage(1);
//               }}
//             >
//               <option value={12}>12 items</option>
//               <option value={24}>24 items</option>
//               <option value={40}>40 items</option>
//             </select>
//           </label>
//         </div>
//       </div>

//       <div className="row" style={{ alignItems: "flex-start", gap: 16 }}>
//         {/* Sidebar */}
//         <aside className="panel" style={{ width: 280 }}>
//           <h4>Filter by</h4>
//           <button className="link" onClick={clearAll} style={{ marginBottom: 10 }}>
//             Clear all
//           </button>

//           <div className="col gap">
//             <label>Price Range</label>
//             <select
//               value={price}
//               onChange={(e) => {
//                 setPrice(e.target.value);
//                 setPage(1);
//               }}
//             >
//               {priceRanges.map((r) => (
//                 <option key={r.value} value={r.value}>
//                   {r.label}
//                 </option>
//               ))}
//             </select>

//             <label>Size</label>
//             <select
//               value={size}
//               onChange={(e) => {
//                 setSize(e.target.value);
//                 setPage(1);
//               }}
//             >
//               <option value="">Select Size</option>
//               {SIZES.map((s) => (
//                 <option key={s} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>

//             <label>Category</label>
//             <select
//               value={category}
//               onChange={(e) => {
//                 setCategory(e.target.value);
//                 setPage(1);
//               }}
//             >
//               <option value="">Select Category</option>
//               {categories.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>

//             <label>Brand</label>
//             <select
//               value={brand}
//               onChange={(e) => {
//                 setBrand(e.target.value);
//                 setPage(1);
//               }}
//             >
//               <option value="">Select Brand</option>
//               {brands.map((b) => (
//                 <option key={b} value={b}>
//                   {b}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </aside>

//         {/* Grid */}
//         <section style={{ flex: 1 }}>
//           <div style={{ marginBottom: 8 }}>
//             <b>{filtered.length}</b> items found
//           </div>

//           {loading ? (
//             <p className="muted">Loading…</p>
//           ) : (
//             <div className="grid">
//               {visible.map((p) => (
//                 <article key={p._id} className="card">
//                   <Link to={`/product/${p._id}`}>
//                     {imgSrc(p) ? (
//                       <img src={imgSrc(p)} alt={p.title} />
//                     ) : (
//                       <div style={{ height: 220, background: "#f3f4f6" }} />
//                     )}
//                   </Link>
//                   <div className="card-body">
//                     <h4 className="truncate">{p.title}</h4>
//                     <div className="muted">Price: ₹{p.price}</div>
//                     <div className="row gap" style={{ marginTop: 8, flexWrap: "wrap" }}>
//                       <button className="btn" onClick={() => add(p)}>
//                         Add to Cart
//                       </button>
//                       <Link className="btn outline" to={`/product/${p._id}`}>
//                         View
//                       </Link>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           )}

//           {/* Pagination */}
//           {pages > 1 && (
//             <div className="row gap" style={{ marginTop: 12, flexWrap: "wrap" }}>
//               <button
//                 className="btn outline"
//                 disabled={curPage === 1}
//                 onClick={() => setPage((p) => Math.max(1, p - 1))}
//               >
//                 Prev
//               </button>

//               {Array.from({ length: pages }).map((_, i) => (
//                 <button
//                   key={i}
//                   className={`btn ${curPage === i + 1 ? "" : "outline"}`}
//                   onClick={() => setPage(i + 1)}
//                   aria-current={curPage === i + 1 ? "page" : undefined}
//                 >
//                   {i + 1}
//                 </button>
//               ))}

//               <button
//                 className="btn outline"
//                 disabled={curPage === pages}
//                 onClick={() => setPage((p) => Math.min(pages, p + 1))}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }


// src/pages/Shop.jsx
import React, { useEffect, useMemo, useState } from "react";
import http from "../api/http";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";
import "../assets/css/shop.css";

// 🔔 Toasts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const priceRanges = [
  { label: "Any", value: "any" },
  { label: "Under ₹500", value: "u500", min: 0, max: 499 },
  { label: "₹500 – ₹1000", value: "500_1000", min: 500, max: 1000 },
  { label: "₹1000 – ₹2000", value: "1000_2000", min: 1000, max: 2000 },
  { label: "₹2000+", value: "2000p", min: 2000 },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "free"];

export default function Shop() {
  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState([]);
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("any");
  const [sort, setSort] = useState("featured");
  const [perPage, setPerPage] = useState(40);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const fetchBase = async (params = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        limit: 200,
        ...(params.q ? { q: params.q } : {}),
        ...(params.brand ? { brand: params.brand } : {}),
        ...(params.category ? { category: params.category } : {}),
      }).toString();

      const { data } = await http.get(`/api/products?${query}`);
      const items = Array.isArray(data) ? data : data.items || [];
      setAll(items);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBase({ q, brand, category });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, brand, category]);

  const brands = useMemo(() => {
    const s = new Set();
    all.forEach((p) => p.brand && s.add(p.brand));
    return Array.from(s).sort();
  }, [all]);

  const categories = useMemo(() => {
    const s = new Set();
    all.forEach((p) => p.category && s.add(p.category));
    return Array.from(s).sort();
  }, [all]);

  const filtered = useMemo(() => {
    const pr = priceRanges.find((r) => r.value === price) || priceRanges[0];
    let list = all.filter((p) => {
      const passPrice =
        pr.value === "any"
          ? true
          : typeof pr.min === "number" && typeof pr.max === "number"
          ? p.price >= pr.min && p.price <= pr.max
          : typeof pr.min === "number"
          ? p.price >= pr.min
          : true;

      const passSize = !size
        ? true
        : Array.isArray(p.variants) &&
          p.variants.some(
            (v) => (v.size || "").toLowerCase() === size.toLowerCase()
          );

      const passName = q
        ? (p.title || "").toLowerCase().includes(q.toLowerCase())
        : true;

      return passPrice && passSize && passName;
    });

    if (sort === "priceAsc") list.sort((a, b) => a.price - b.price);
    else if (sort === "priceDesc") list.sort((a, b) => b.price - a.price);
    else if (sort === "newest")
      list.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    else
      list.sort(
        (a, b) =>
          (b.ratingAvg || 0) - (a.ratingAvg || 0) ||
          (b.ratingCount || 0) - (a.ratingCount || 0)
      );

    return list;
  }, [all, price, size, sort, q]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const curPage = Math.min(page, pages);
  const start = (curPage - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);

  const clearAll = () => {
    setQ("");
    setBrand("");
    setCategory("");
    setSize("");
    setPrice("any");
    setSort("featured");
    setPerPage(40);
    setPage(1);
    toast.info("Filters cleared");
  };

  const add = (p) => {
    dispatch(addToCart({ ...p, qty: 1 }));
    toast.success("Added to cart");
  };

  const imgSrc = (p) => {
    const url = p.images?.[0];
    if (!url) return "";
    if (url.startsWith("/uploads")) {
      return (import.meta.env.VITE_API_BASE || "") + url;
    }
    return url;
    };

  return (
    <div className="shop-wrap">
      {/* Toast container */}
      <ToastContainer
        position="top-center"
        autoClose={1400}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <h2>Featured Categories</h2>

      {/* Top toolbar */}
      <div className="row gap" style={{ justifyContent: "space-between", marginBottom: 12 }}>
        <div className="row gap">
          <input
            type="search"
            placeholder="Search by name…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="row gap">
          <label>
            Sort by:&nbsp;
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured Items</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </label>
          <label>
            Show:&nbsp;
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={12}>12 items</option>
              <option value={24}>24 items</option>
              <option value={40}>40 items</option>
            </select>
          </label>
        </div>
      </div>

      <div className="row" style={{ alignItems: "flex-start", gap: 16 }}>
        {/* Sidebar */}
        <aside className="panel" style={{ width: 280 }}>
          <h4>Filter by</h4>
          <button className="link" onClick={clearAll} style={{ marginBottom: 10 }}>
            Clear all
          </button>

          <div className="col gap">
            <label>Price Range</label>
            <select
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setPage(1);
              }}
            >
              {priceRanges.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>

            <label>Size</label>
            <select
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Select Size</option>
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <label>Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label>Brand</label>
            <select
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Select Brand</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Grid */}
        <section style={{ flex: 1 }}>
          <div style={{ marginBottom: 8 }}>
            <b>{filtered.length}</b> items found
          </div>

          {loading ? (
            <p className="muted">Loading…</p>
          ) : (
            <div className="grid">
              {visible.map((p) => (
                <article key={p._id} className="card">
                  <Link to={`/product/${p._id}`}>
                    {imgSrc(p) ? (
                      <img src={imgSrc(p)} alt={p.title} />
                    ) : (
                      <div style={{ height: 220, background: "#f3f4f6" }} />
                    )}
                  </Link>
                  <div className="card-body">
                    <h4 className="truncate">{p.title}</h4>
                    <div className="muted">Price: ₹{p.price}</div>
                    <div className="row gap" style={{ marginTop: 8, flexWrap: "wrap" }}>
                      <button className="btn" onClick={() => add(p)}>
                        Add to Cart
                      </button>
                      <Link className="btn outline" to={`/product/${p._id}`}>
                        View
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="row gap" style={{ marginTop: 12, flexWrap: "wrap" }}>
              <button
                className="btn outline"
                disabled={curPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>

              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  className={`btn ${curPage === i + 1 ? "" : "outline"}`}
                  onClick={() => setPage(i + 1)}
                  aria-current={curPage === i + 1 ? "page" : undefined}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="btn outline"
                disabled={curPage === pages}
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
