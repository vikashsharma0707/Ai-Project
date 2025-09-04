// // import React, { useEffect, useState } from 'react';
// // import http from '../../api/http.js';
// // import { ENDPOINTS } from '../../api/endpoints.js';

// // export default function AdminOrders(){
// //   const [list, setList] = useState([]);
// //   const load = async()=>{ const { data } = await http.get(ENDPOINTS.orders.base); setList(data); };
// //   useEffect(()=>{ load(); }, []);

// //   const update = async (id, status)=>{
// //     await http.put(`${ENDPOINTS.orders.base}/${id}/status`, { status });
// //     await load();
// //   };

// //   const statuses = ['pending','processing','shipped','delivered','cancelled'];
// //   return (
// //     <div>
// //       <h2>Orders</h2>
// //       {list.map(o => <div key={o._id} className="panel">
// //         <div className="row space"><b>#{o._id.slice(-6)}</b><span>User: {o.user?.name} ({o.user?.email})</span></div>
// //         <ul>{o.items.map((i,idx)=> <li key={idx}>{i.title} ({i.sku}) x{i.qty} = ₹{i.price*i.qty}</li>)}</ul>
// //         <div className="row gap">
// //           <span>Status:</span>
// //           <select value={o.status} onChange={e=>update(o._id, e.target.value)}>
// //             {statuses.map(s => <option key={s} value={s}>{s}</option>)}
// //           </select>
// //           <b>Total ₹{o.total}</b>
// //         </div>
// //       </div>)}
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import http from "../../api/http.js";
// import { ENDPOINTS } from "../../api/endpoints.js";
// import "./Orders.css";

// const nfmt = (n) =>
//   typeof n === "number"
//     ? n.toLocaleString("en-IN", { maximumFractionDigits: 0 })
//     : n;

// export default function Orders() {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   const load = async () => {
//     try {
//       setLoading(true);
//       const { data } = await http.get(ENDPOINTS.orders.base);
//       setList(data || []);
//       setErr("");
//     } catch (e) {
//       setErr(e?.response?.data?.message || "Failed to load orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { load(); }, []);

//   const update = async (id, status) => {
//     try {
//       await http.put(`${ENDPOINTS.orders.base}/${id}/status`, { status });
//       await load();
//     } catch (e) {
//       alert(e?.response?.data?.message || "Update failed");
//     }
//   };

//   const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

//   return (
//     <div className="ao-wrap">
//       <header className="ao-head">
//         <h2>Orders</h2>
//         <p className="muted">Manage order status and review line items</p>
//       </header>

//       {loading && (
//         <div className="ao-list">
//           {[1, 2, 3].map((i) => (
//             <article key={i} className="ao-card shimmer" aria-hidden />
//           ))}
//         </div>
//       )}

//       {!loading && err && (
//         <div className="ao-error" role="alert">
//           <span>⚠️ {err}</span>
//           <button className="btn btn-ghost" onClick={load}>Retry</button>
//         </div>
//       )}

//       {!loading && !err && (
//         <>
//           {!list.length ? (
//             <div className="empty">
//               <div className="empty-box">No orders yet.</div>
//             </div>
//           ) : (
//             <div className="ao-list">
//               {list.map((o) => (
//                 <article key={o._id} className="ao-card">
//                   <div className="ao-card-head">
//                     <div className="ao-id">
//                       <b>#{(o._id || "").slice(-6)}</b>
//                       <span className={`badge ${o.status}`}>{o.status}</span>
//                     </div>
//                     <div className="ao-user">
//                       <span className="muted">User:</span>{" "}
//                       <b>{o.user?.name || "—"}</b>{" "}
//                       <span className="muted">({o.user?.email || "—"})</span>
//                     </div>
//                   </div>

//                   <div className="ao-items-wrap">
//                     <table className="ao-items">
//                       <thead>
//                         <tr>
//                           <th>Item</th>
//                           <th>SKU</th>
//                           <th className="right">Qty</th>
//                           <th className="right">Price</th>
//                           <th className="right">Subtotal</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {o.items?.map((i, idx) => (
//                           <tr key={idx}>
//                             <td className="ellipsis" title={i.title}>{i.title}</td>
//                             <td className="mono">{i.sku}</td>
//                             <td className="right">{i.qty}</td>
//                             <td className="right">₹{nfmt(i.price)}</td>
//                             <td className="right">₹{nfmt(i.price * i.qty)}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="ao-foot">
//                     <div className="ao-status">
//                       <label htmlFor={`st-${o._id}`}>Status</label>
//                       <select
//                         id={`st-${o._id}`}
//                         value={o.status}
//                         onChange={(e) => update(o._id, e.target.value)}
//                       >
//                         {statuses.map((s) => (
//                           <option key={s} value={s}>{s}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="ao-total">
//                       <span className="muted">Total</span>
//                       <b>₹{nfmt(o.total)}</b>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }




import React, { useEffect, useMemo, useState } from "react";
import http from "../../api/http.js";
import { ENDPOINTS } from "../../api/endpoints.js";
import "./Orders.css";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

const nfmt = (n) =>
  typeof n === "number"
    ? n.toLocaleString("en-IN", { maximumFractionDigits: 0 })
    : n;

export default function Orders() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // UI state
  const [status, setStatus] = useState("");     // filter
  const [q, setQ] = useState("");               // search
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await http.get(ENDPOINTS.orders.base);
      setList(Array.isArray(data) ? data : []);
      setErr("");
      setPage(1); // reset to first page on reload
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const update = async (id, next) => {
    try {
      await http.put(`${ENDPOINTS.orders.base}/${id}/status`, { status: next });
      // Optimistic UI
      setList((prev) => prev.map((o) => (o._id === id ? { ...o, status: next } : o)));
    } catch (e) {
      alert(e?.response?.data?.message || "Update failed");
    }
  };

  // ---------- Derived data ----------
  const filtered = useMemo(() => {
    const s = (status || "").trim().toLowerCase();
    const query = (q || "").trim().toLowerCase();

    return list.filter((o) => {
      const matchesStatus = !s || o.status?.toLowerCase() === s;
      if (!matchesStatus) return false;

      if (!query) return true;
      const id = (o._id || "").toLowerCase();
      const user = (o.user?.name || "").toLowerCase();
      const email = (o.user?.email || "").toLowerCase();
      const anyItem = (o.items || []).some((i) =>
        (i.title || "").toLowerCase().includes(query) ||
        (i.sku || "").toLowerCase().includes(query)
      );
      return (
        id.includes(query) ||
        user.includes(query) ||
        email.includes(query) ||
        anyItem
      );
    });
  }, [list, status, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const sliceStart = (pageSafe - 1) * pageSize;
  const pageItems = filtered.slice(sliceStart, sliceStart + pageSize);

  // ---------- UI ----------
  return (
    <div className="ao-wrap">
      <header className="ao-head">
        <div>
          <h2>Orders</h2>
          <p className="muted">Manage order status, search, and review line items</p>
        </div>
        <div className="ao-head-actions">
          <button className="btn btn-ghost" onClick={load} aria-label="Refresh orders">
            ⟳ Refresh
          </button>
        </div>
      </header>

      {/* Filters */}
      <section className="ao-filters" aria-label="Order filters">
        <div className="ao-fgrid">
          <div className="ao-field">
            <label htmlFor="flt-status">Status</label>
            <select
              id="flt-status"
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            >
              <option value="">All</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="ao-field ao-span-2">
            <label htmlFor="flt-search">Search</label>
            <input
              id="flt-search"
              type="text"
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Order ID / customer / email / item / SKU…"
            />
          </div>

          <div className="ao-field">
            <label htmlFor="flt-size">Rows / page</label>
            <select
              id="flt-size"
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value) || 5); setPage(1); }}
            >
              {[5, 10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div className="ao-field ao-actions">
            <button className="btn" onClick={() => { setStatus(""); setQ(""); setPage(1); }}>
              Clear
            </button>
            <button className="btn btn-primary" onClick={load}>
              Apply
            </button>
          </div>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <div className="ao-list" aria-live="polite">
          {[1, 2, 3].map((i) => (
            <article key={i} className="ao-card shimmer" aria-hidden />
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && err && (
        <div className="ao-error" role="alert">
          <span>⚠️ {err}</span>
          <button className="btn btn-ghost" onClick={load}>Retry</button>
        </div>
      )}

      {/* Empty */}
      {!loading && !err && !filtered.length && (
        <div className="empty">
          <div className="empty-box">No matching orders.</div>
        </div>
      )}

      {/* List */}
      {!loading && !err && !!filtered.length && (
        <>
          <div className="ao-list">
            {pageItems.map((o) => {
              const shortId = (o._id || "").slice(-6);
              const created = o.createdAt ? new Date(o.createdAt).toLocaleString() : "";
              return (
                <article key={o._id} className="ao-card">
                  <div className="ao-card-head">
                    <div className="ao-id">
                      <b>#{shortId || "------"}</b>
                      <span className={`badge ${o.status}`}>{o.status}</span>
                      {created && <span className="muted">• {created}</span>}
                    </div>
                    <div className="ao-user">
                      <span className="muted">User:</span>{" "}
                      <b>{o.user?.name || "—"}</b>{" "}
                      <span className="muted">({o.user?.email || "—"})</span>
                    </div>
                  </div>

                  <div className="ao-items-wrap" role="region" aria-label={`Order ${shortId} items`}>
                    <table className="ao-items">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>SKU</th>
                          <th className="right">Qty</th>
                          <th className="right">Price</th>
                          <th className="right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(o.items || []).map((i, idx) => (
                          <tr key={idx}>
                            <td className="ellipsis" title={i.title}>{i.title}</td>
                            <td className="mono">{i.sku}</td>
                            <td className="right">{i.qty}</td>
                            <td className="right">₹{nfmt(i.price)}</td>
                            <td className="right">₹{nfmt((i.price || 0) * (i.qty || 0))}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="ao-foot">
                    <div className="ao-status">
                      <label htmlFor={`st-${o._id}`}>Status</label>
                      <select
                        id={`st-${o._id}`}
                        value={o.status}
                        onChange={(e) => update(o._id, e.target.value)}
                        aria-label={`Update status for order ${shortId}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="ao-total">
                      <span className="muted">Total</span>
                      <b>₹{nfmt(o.total)}</b>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          <nav className="pager" aria-label="Pagination">
            <button
              className="btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={pageSafe <= 1}
            >
              ← Prev
            </button>
            <div className="pager-info">
              Page <b>{pageSafe}</b> of <b>{totalPages}</b> • {filtered.length} orders
            </div>
            <button
              className="btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={pageSafe >= totalPages}
            >
              Next →
            </button>
          </nav>
        </>
      )}
    </div>
  );
}
