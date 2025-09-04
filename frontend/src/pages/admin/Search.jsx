// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../../store/productSlice.js';
// import { Link } from 'react-router-dom';

// export default function AdminSearch(){
//   const dispatch = useDispatch();
//   const { list } = useSelector(s=>s.products);
//   const [q, setQ] = useState('');
//   const [brand, setBrand] = useState('');
//   const [category, setCategory] = useState('');

//   const run = () => dispatch(fetchProducts({ q, brand, category, limit: 200 }));

//   useEffect(()=>{ run(); }, []); // initial

//   return (
//     <div>
//       <div className="row gap">
//         <input placeholder="Search text" value={q} onChange={e=>setQ(e.target.value)} />
//         <input placeholder="Brand" value={brand} onChange={e=>setBrand(e.target.value)} />
//         <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
//         <button className="btn" onClick={run}>Search</button>
//       </div>

//       <table className="table" style={{marginTop:12}}>
//         <thead>
//           <tr><th>#</th><th>Title</th><th>Brand</th><th>Category</th><th>Price</th><th/></tr>
//         </thead>
//         <tbody>
//           {list.map((p,i)=>(
//             <tr key={p._id}>
//               <td>{i+1}</td>
//               <td>{p.title}</td>
//               <td>{p.brand}</td>
//               <td>{p.category}</td>
//               <td>₹{p.price}</td>
//               <td><Link className="btn" to={`/admin/products/${p._id}`}>Edit</Link></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productSlice.js";
import { Link } from "react-router-dom";
import "./Search.css";

export default function Search() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.products);
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const run = () => dispatch(fetchProducts({ q, brand, category, limit: 200 }));

  useEffect(() => { run(); /* initial */ }, []); // eslint-disable-line

  const onEnter = (e) => { if (e.key === "Enter") run(); };
  const onClear = () => { setQ(""); setBrand(""); setCategory(""); dispatch(fetchProducts({ limit: 200 })); };

  return (
    <div className="as-wrap">
      <header className="as-head">
        <h2>Search Products</h2>
        <p className="muted">Filter by text, brand and category</p>
      </header>

      <div className="as-bar">
        <div className="as-field">
          <label>Search</label>
          <input
            placeholder="e.g. shirt, cotton"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onEnter}
          />
        </div>

        <div className="as-field">
          <label>Brand</label>
          <input
            placeholder="e.g. Adidas"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            onKeyDown={onEnter}
          />
        </div>

        <div className="as-field">
          <label>Category</label>
          <input
            placeholder="e.g. mens"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onKeyDown={onEnter}
          />
        </div>

        <div className="as-actions">
          <button className="btn btn-dark" onClick={run} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
          <button className="btn btn-light" onClick={onClear} disabled={loading}>
            Clear
          </button>
        </div>
      </div>

      <div className="as-summary">
        <span className="chip">{list.length}</span>
        <span className="muted">result(s)</span>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th style={{width: 60}}>#</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Category</th>
              <th className="right">Price</th>
              <th className="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p, i) => (
              <tr key={p._id}>
                <td className="mono">{i + 1}</td>
                <td className="ellipsis" title={p.title}>{p.title}</td>
                <td className="ellipsis" title={p.brand}>{p.brand}</td>
                <td className="ellipsis" title={p.category}>{p.category}</td>
                <td className="right">₹{p.price}</td>
                <td className="right">
                  <Link className="btn btn-light" to={`/admin/products/${p._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
            {!list.length && !loading && (
              <tr>
                <td colSpan="6" className="center muted">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

