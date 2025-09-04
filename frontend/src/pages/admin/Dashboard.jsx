// import React, { useEffect, useState } from 'react';
// import http from '../../api/http.js';
// import { ENDPOINTS } from '../../api/endpoints.js';

// export default function Dashboard(){
//   const [data, setData] = useState(null);
//   useEffect(()=>{ (async()=>{ const { data } = await http.get(ENDPOINTS.admin.stats); setData(data); })(); }, []);
//   if (!data) return null;
//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <div className="grid-cols-4">
//         <div className="tile">Total Products: {data.products}</div>
//         <div className="tile">Total Users: {data.users}</div>
//         <div className="tile">Total Orders: {data.orders}</div>
//         <div className="tile">Revenue: ₹{data.revenue}</div>
//       </div>
//       {!!data.lowStock?.length && <div className="panel">
//         <b>Low Stock</b>
//         <ul>{data.lowStock.map((x,i)=> <li key={i}>{x.title} - {x.sku} ({x.stock})</li>)}</ul>
//       </div>}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import http from "../../api/http.js";
import { ENDPOINTS } from "../../api/endpoints.js";
import "./Dashboard.css";

const nfmt = (n) =>
  typeof n === "number"
    ? n.toLocaleString("en-IN", { maximumFractionDigits: 0 })
    : n;

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await http.get(ENDPOINTS.admin.stats);
        setData(res.data);
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="ad-wrap">
      <header className="ad-head">
        <h2>Dashboard</h2>
        <p className="ad-sub">Overview of your store performance</p>
      </header>

      {loading && (
        <section className="ad-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="ad-tile shimmer" aria-hidden />
          ))}
        </section>
      )}

      {!loading && err && (
        <div className="ad-error" role="alert">
          <span>⚠️ {err}</span>
          <button className="btn btn-ghost" onClick={() => location.reload()}>
            Retry
          </button>
        </div>
      )}

      {!loading && data && (
        <>
          <section className="ad-grid">
            <article className="ad-tile">
              <div className="ad-icon" aria-hidden>🧺</div>
              <div className="ad-meta">
                <span className="ad-label">Total Products</span>
                <span className="ad-value">{nfmt(data.products)}</span>
              </div>
            </article>

            <article className="ad-tile">
              <div className="ad-icon" aria-hidden>👥</div>
              <div className="ad-meta">
                <span className="ad-label">Total Users</span>
                <span className="ad-value">{nfmt(data.users)}</span>
              </div>
            </article>

            <article className="ad-tile">
              <div className="ad-icon" aria-hidden>🧾</div>
              <div className="ad-meta">
                <span className="ad-label">Total Orders</span>
                <span className="ad-value">{nfmt(data.orders)}</span>
              </div>
            </article>

            <article className="ad-tile">
              <div className="ad-icon" aria-hidden>💰</div>
              <div className="ad-meta">
                <span className="ad-label">Revenue</span>
                <span className="ad-value">₹{nfmt(data.revenue)}</span>
              </div>
            </article>
          </section>

          {!!data.lowStock?.length && (
            <section className="ad-panel">
              <div className="ad-panel-head">
                <h3>Low Stock</h3>
                <span className="ad-chip">{data.lowStock.length}</span>
              </div>
              <div className="ad-table-wrap">
                <table className="ad-table">
                  <thead>
                    <tr>
                      <th style={{ width: "44%" }}>Product</th>
                      <th>SKU</th>
                      <th style={{ textAlign: "right" }}>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.lowStock.map((x, i) => (
                      <tr key={i}>
                        <td title={x.title}>{x.title}</td>
                        <td className="mono">{x.sku}</td>
                        <td className="right">
                          <span className="ad-stock-badge">{x.stock}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
