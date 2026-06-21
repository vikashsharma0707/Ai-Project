// // // import React, { useEffect, useState } from 'react';
// // // import http from '../api/http.js';
// // // import { ENDPOINTS } from '../api/endpoints.js';
// // // import { getSocket } from '../utils/socket.js';

// // // export default function Orders(){
// // //   const [list, setList] = useState([]);
// // //   const load = async()=>{ const { data } = await http.get(ENDPOINTS.orders.mine); setList(data); };
// // //   useEffect(()=>{ load(); const s=getSocket(); s.on('order:status', ({orderId,status})=>{ setList(x=>x.map(o=>o._id===orderId?{...o,status}:o));}); return ()=>{ getSocket().off('order:status'); };},[]);
// // //   return (
// // //     <div>
// // //       <h2>My Orders</h2>
// // //       {list.map(o => <div key={o._id} className="panel">
// // //         <div className="row space"><b>#{o._id.slice(-6)}</b><span>Status: <b>{o.status}</b></span></div>
// // //         <ul>{o.items.map((i,idx)=> <li key={idx}>{i.title} x{i.qty} = ₹{i.price*i.qty}</li>)}</ul>
// // //         <div className="row space"><span>Total</span><b>₹{o.total}</b></div>
// // //       </div>)}
// // //     </div>
// // //   );
// // // }


// // import React, { useEffect, useState } from "react";
// // import http from "../api/http.js";
// // import { useNavigate } from "react-router-dom";

// // export default function Orders(){
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const nav = useNavigate();

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const { data } = await http.get("/api/orders/mine");
// //         setOrders(data);
// //       } catch (err) {
// //         if (err?.response?.status === 401) nav("/profile");
// //       } finally {
// //         setLoading(false);
// //       }
// //     })();
// //   }, [nav]);

// //   if (loading) return <p>Loading…</p>;

// //   return (
// //     <div>
// //       <h2>My Orders</h2>
// //       {orders.length === 0 ? (
// //         <p>No orders yet.</p>
// //       ) : (
// //         <table className="table">
// //           <thead>
// //             <tr><th>#</th><th>Items</th><th>Total</th><th>Status</th></tr>
// //           </thead>
// //           <tbody>
// //             {orders.map((o, i) => (
// //               <tr key={o._id}>
// //                 <td>{i + 1}</td>
// //                 <td>{o.items.map(it => `${it.title} x${it.qty}`).join(", ")}</td>
// //                 <td>₹{o.total}</td>
// //                 <td>{o.status}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // }




// import React, { useEffect, useMemo, useState } from "react";
// import http from "../api/http.js";
// import { useNavigate } from "react-router-dom";
// import "./Orders.css";

// const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];
// const nfmt = (n) =>
//   typeof n === "number"
//     ? n.toLocaleString("en-IN", { maximumFractionDigits: 0 })
//     : n;

// export default function Orders() {
//   const nav = useNavigate();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   // UI state
//   const [status, setStatus] = useState("");
//   const [q, setQ] = useState("");
//   const [expanded, setExpanded] = useState({}); // { [orderId]: true }
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);

//   const load = async () => {
//     try {
//       setLoading(true);
//       setErr("");
//       const { data } = await http.get("/api/orders/mine");
//       setOrders(Array.isArray(data) ? data : []);
//       setPage(1);
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         nav("/profile");
//         return;
//       }
//       setErr(err?.response?.data?.message || "Failed to load your orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { load(); }, []); // eslint-disable-line

//   const filtered = useMemo(() => {
//     const s = (status || "").toLowerCase();
//     const query = (q || "").trim().toLowerCase();

//     return orders.filter((o) => {
//       const matchesStatus = !s || o.status?.toLowerCase() === s;
//       if (!matchesStatus) return false;

//       if (!query) return true;
//       const id = (o._id || "").toLowerCase();
//       const anyItem = (o.items || []).some(
//         (i) =>
//           (i.title || "").toLowerCase().includes(query) ||
//           (i.sku || "").toLowerCase().includes(query)
//       );
//       return id.includes(query) || anyItem;
//     });
//   }, [orders, status, q]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
//   const safePage = Math.min(page, totalPages);
//   const start = (safePage - 1) * pageSize;
//   const pageItems = filtered.slice(start, start + pageSize);

//   const toggle = (id) => setExpanded((m) => ({ ...m, [id]: !m[id] }));

//   return (
//     <div className="mo-wrap">
//       <header className="mo-head">
//         <div>
//           <h2>My Orders</h2>
//           <p className="muted">Track your purchases, status and details</p>
//         </div>
//         <div className="mo-head-actions">
//           <button className="btn btn-ghost" onClick={load} aria-label="Refresh">
//             ⟳ Refresh
//           </button>
//         </div>
//       </header>

//       {/* Filters */}
//       <section className="mo-filters" aria-label="Order filters">
//         <div className="mo-fgrid">
//           <div className="mo-field">
//             <label htmlFor="flt-status">Status</label>
//             <select
//               id="flt-status"
//               value={status}
//               onChange={(e) => { setStatus(e.target.value); setPage(1); }}
//             >
//               <option value="">All</option>
//               {STATUSES.map((s) => (
//                 <option key={s} value={s}>{s}</option>
//               ))}
//             </select>
//           </div>

//           <div className="mo-field mo-span-2">
//             <label htmlFor="flt-search">Search</label>
//             <input
//               id="flt-search"
//               type="text"
//               value={q}
//               onChange={(e) => { setQ(e.target.value); setPage(1); }}
//               placeholder="Order ID / item title / SKU…"
//             />
//           </div>

//           <div className="mo-field">
//             <label htmlFor="flt-size">Rows / page</label>
//             <select
//               id="flt-size"
//               value={pageSize}
//               onChange={(e) => { setPageSize(Number(e.target.value) || 5); setPage(1); }}
//             >
//               {[5, 10, 20].map((n) => <option key={n} value={n}>{n}</option>)}
//             </select>
//           </div>

//           <div className="mo-field mo-actions">
//             <button className="btn" onClick={() => { setStatus(""); setQ(""); setPage(1); }}>
//               Clear
//             </button>
//             <button className="btn btn-primary" onClick={load}>
//               Apply
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Error */}
//       {!!err && (
//         <div className="mo-error" role="alert">
//           <span>⚠️ {err}</span>
//           <button className="btn btn-ghost" onClick={load}>Retry</button>
//         </div>
//       )}

//       {/* Loading */}
//       {loading && (
//         <div className="mo-list">
//           {[1,2].map((i) => <article key={i} className="mo-card shimmer" aria-hidden />)}
//         </div>
//       )}

//       {/* Empty */}
//       {!loading && !err && !filtered.length && (
//         <div className="empty">
//           <div className="empty-box">No matching orders.</div>
//         </div>
//       )}

//       {/* List */}
//       {!loading && !err && !!filtered.length && (
//         <>
//           <div className="mo-list">
//             {pageItems.map((o) => {
//               const shortId = (o._id || "").slice(-6);
//               const created = o.createdAt ? new Date(o.createdAt).toLocaleString() : "";
//               const itemsCount = o.items?.reduce((a, c) => a + (c.qty || 0), 0) || 0;

//               return (
//                 <article key={o._id} className="mo-card">
//                   <div className="mo-row space">
//                     <div className="mo-id">
//                       <b>#{shortId || "------"}</b>
//                       <span className={`badge ${o.status}`}>{o.status}</span>
//                       {created && <span className="muted">• {created}</span>}
//                     </div>

//                     <div className="mo-total">
//                       <span className="muted">Total</span>
//                       <b>₹{nfmt(o.total)}</b>
//                     </div>
//                   </div>

//                   <div className="mo-row wrap gap">
//                     <div className="muted">
//                       <b>{itemsCount}</b> item{o.items?.length > 1 ? "s" : ""}
//                     </div>
//                     <button
//                       className="btn btn-ghost"
//                       onClick={() => toggle(o._id)}
//                       aria-expanded={!!expanded[o._id]}
//                       aria-controls={`items-${o._id}`}
//                     >
//                       {expanded[o._id] ? "Hide items" : "View items"}
//                     </button>
//                   </div>

//                   {expanded[o._id] && (
//                     <div
//                       id={`items-${o._id}`}
//                       className="mo-items-wrap"
//                       role="region"
//                       aria-label={`Items for order ${shortId}`}
//                     >
//                       <table className="mo-items">
//                         <thead>
//                           <tr>
//                             <th>Item</th>
//                             <th>SKU</th>
//                             <th className="right">Qty</th>
//                             <th className="right">Price</th>
//                             <th className="right">Subtotal</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {(o.items || []).map((i, idx) => (
//                             <tr key={idx}>
//                               <td className="ellipsis" title={i.title}>{i.title}</td>
//                               <td className="mono">{i.sku}</td>
//                               <td className="right">{i.qty}</td>
//                               <td className="right">₹{nfmt(i.price)}</td>
//                               <td className="right">₹{nfmt((i.price || 0) * (i.qty || 0))}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </article>
//               );
//             })}
//           </div>

//           {/* Pagination */}
//           <nav className="pager" aria-label="Pagination">
//             <button
//               className="btn"
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={safePage <= 1}
//             >
//               ← Prev
//             </button>
//             <div className="pager-info">
//               Page <b>{safePage}</b> of <b>{totalPages}</b> • {filtered.length} order(s)
//             </div>
//             <button
//               className="btn"
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={safePage >= totalPages}
//             >
//               Next →
//             </button>
//           </nav>
//         </>
//       )}
//     </div>
//   );
// }




import React, { useEffect, useMemo, useState } from "react";
import http from "../api/http.js";
import { useNavigate } from "react-router-dom";
import "./Orders.css";                    // Keep your existing CSS

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

const nfmt = (n) =>
  typeof n === "number"
    ? n.toLocaleString("en-IN", { maximumFractionDigits: 0 })
    : n;

export default function Orders() {
  const nav = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Filters
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setErr("");
      const { data } = await http.get("/api/orders/mine");
      setOrders(Array.isArray(data) ? data : []);
      setPage(1);
    } catch (error) {
      if (error?.response?.status === 401) {
        nav("/profile");
        return;
      }
      setErr(error?.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const s = (status || "").toLowerCase();
    const query = (q || "").trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus = !s || order.status?.toLowerCase() === s;
      if (!matchesStatus) return false;

      if (!query) return true;

      const orderId = (order._id || "").toLowerCase();
      const matchesSearch = 
        orderId.includes(query) ||
        (order.items || []).some((item) =>
          (item.title || "").toLowerCase().includes(query) ||
          (item.sku || "").toLowerCase().includes(query)
        );

      return matchesSearch;
    });
  }, [orders, status, q]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + pageSize);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mo-wrap">
      <header className="mo-head">
        <div>
          <h2>My Orders</h2>
          <p className="muted">Track your purchases, status, and payment details</p>
        </div>
        <button className="btn btn-ghost" onClick={loadOrders}>
          ⟳ Refresh
        </button>
      </header>

      {/* Filters */}
      <section className="mo-filters">
        <div className="mo-fgrid">
          <div className="mo-field">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            >
              <option value="">All Status</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="mo-field mo-span-2">
            <label>Search</label>
            <input
              type="text"
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Order ID, Product name, SKU..."
            />
          </div>

          <div className="mo-field">
            <label>Rows per page</label>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            >
              {[5, 10, 20].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="mo-field mo-actions">
            <button className="btn" onClick={() => { setStatus(""); setQ(""); setPage(1); }}>
              Clear
            </button>
            <button className="btn btn-primary" onClick={loadOrders}>
              Apply
            </button>
          </div>
        </div>
      </section>

      {err && (
        <div className="mo-error">
          ⚠️ {err}
          <button className="btn btn-ghost" onClick={loadOrders}>Retry</button>
        </div>
      )}

      {loading && <div className="loading">Loading your orders...</div>}

      {!loading && !err && filteredOrders.length === 0 && (
        <div className="empty">
          <p>No orders found.</p>
        </div>
      )}

      {!loading && filteredOrders.length > 0 && (
        <>
          <div className="mo-list">
            {paginatedOrders.map((order) => {
              const shortId = order._id?.slice(-8) || "N/A";
              const created = order.createdAt
                ? new Date(order.createdAt).toLocaleDateString("en-IN")
                : "";

              const totalItems = order.items?.reduce((sum, i) => sum + (i.qty || 0), 0) || 0;

              return (
                <article key={order._id} className="mo-card">
                  <div className="mo-row space">
                    <div>
                      <b>#{shortId}</b>
                      <span className={`badge ${order.status}`}>{order.status}</span>
                      {created && <span className="muted"> • {created}</span>}
                    </div>

                    <div className="mo-total">
                      <span className="muted">Total</span>
                      <b>₹{nfmt(order.total)}</b>
                      {order.discountApplied > 0 && (
                        <span className="discount">(-₹{nfmt(order.discountApplied)})</span>
                      )}
                    </div>
                  </div>

                  <div className="mo-row wrap gap">
                    <div>
                      <strong>{totalItems}</strong> item{totalItems > 1 ? "s" : ""} • 
                      <span className="muted"> {order.paymentMethod?.toUpperCase() || "COD"}</span>
                    </div>

                    <button
                      className="btn btn-ghost"
                      onClick={() => toggleExpand(order._id)}
                    >
                      {expanded[order._id] ? "Hide Details" : "View Items"}
                    </button>
                  </div>

                  {expanded[order._id] && (
                    <div className="mo-items-wrap">
                      <table className="mo-items">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Size</th>
                            <th className="right">Qty</th>
                            <th className="right">Price</th>
                            <th className="right">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items?.map((item, idx) => (
                            <tr key={idx}>
                              <td>{item.title}</td>
                              <td className="mono">{item.sku}</td>
                              <td>{item.size}</td>
                              <td className="right">{item.qty}</td>
                              <td className="right">₹{nfmt(item.price)}</td>
                              <td className="right">₹{nfmt(item.price * item.qty)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {order.agentAdvice && (
                        <div className="agent-note">
                          <strong>AI Suggestion:</strong> {order.agentAdvice}
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          <nav className="pager">
            <button
              className="btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
            >
              ← Prev
            </button>
            <span>
              Page <b>{currentPage}</b> of {totalPages}
            </span>
            <button
              className="btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
            >
              Next →
            </button>
          </nav>
        </>
      )}
    </div>
  );
}