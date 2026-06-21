// // // import React, { useEffect, useState } from 'react';
// // // import http from '../../api/http.js';
// // // import { ENDPOINTS } from '../../api/endpoints.js';

// // // export default function Dashboard(){
// // //   const [data, setData] = useState(null);
// // //   useEffect(()=>{ (async()=>{ const { data } = await http.get(ENDPOINTS.admin.stats); setData(data); })(); }, []);
// // //   if (!data) return null;
// // //   return (
// // //     <div>
// // //       <h2>Dashboard</h2>
// // //       <div className="grid-cols-4">
// // //         <div className="tile">Total Products: {data.products}</div>
// // //         <div className="tile">Total Users: {data.users}</div>
// // //         <div className="tile">Total Orders: {data.orders}</div>
// // //         <div className="tile">Revenue: ₹{data.revenue}</div>
// // //       </div>
// // //       {!!data.lowStock?.length && <div className="panel">
// // //         <b>Low Stock</b>
// // //         <ul>{data.lowStock.map((x,i)=> <li key={i}>{x.title} - {x.sku} ({x.stock})</li>)}</ul>
// // //       </div>}
// // //     </div>
// // //   );
// // // }


// // import React, { useEffect, useState } from "react";
// // import http from "../../api/http.js";
// // import { ENDPOINTS } from "../../api/endpoints.js";
// // import "./Dashboard.css";
// // import AdminAIAgents from "./AdminAi/AdminAIAgents.jsx";

// // const nfmt = (n) =>
// //   typeof n === "number"
// //     ? n.toLocaleString("en-IN", { maximumFractionDigits: 0 })
// //     : n;

// // export default function Dashboard() {
// //   const [data, setData] = useState(null);
// //   const [err, setErr] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const res = await http.get(ENDPOINTS.admin.stats);
// //         setData(res.data);
// //       } catch (e) {
// //         setErr(e?.response?.data?.message || "Failed to load stats");
// //       } finally {
// //         setLoading(false);
// //       }
// //     })();
// //   }, []);

// //   return (
// //     <div className="ad-wrap">

      
// //       <header className="ad-head">
// //         <h2>Dashboard</h2>
// //         <p className="ad-sub">Overview of your store performance</p>
// //       </header>

// //       {loading && (
// //         <section className="ad-grid">
// //           {[1, 2, 3, 4].map((i) => (
// //             <div key={i} className="ad-tile shimmer" aria-hidden />
// //           ))}
// //         </section>
// //       )}

// //       {!loading && err && (
// //         <div className="ad-error" role="alert">
// //           <span>⚠️ {err}</span>
// //           <button className="btn btn-ghost" onClick={() => location.reload()}>
// //             Retry
// //           </button>
// //         </div>
// //       )}

// //       {!loading && data && (
// //         <>
// //           <section className="ad-grid">
// //             <article className="ad-tile">
// //               <div className="ad-icon" aria-hidden>🧺</div>
// //               <div className="ad-meta">
// //                 <span className="ad-label">Total Products</span>
// //                 <span className="ad-value">{nfmt(data.products)}</span>
// //               </div>
// //             </article>

// //             <article className="ad-tile">
// //               <div className="ad-icon" aria-hidden>👥</div>
// //               <div className="ad-meta">
// //                 <span className="ad-label">Total Users</span>
// //                 <span className="ad-value">{nfmt(data.users)}</span>
// //               </div>
// //             </article>

// //             <article className="ad-tile">
// //               <div className="ad-icon" aria-hidden>🧾</div>
// //               <div className="ad-meta">
// //                 <span className="ad-label">Total Orders</span>
// //                 <span className="ad-value">{nfmt(data.orders)}</span>
// //               </div>
// //             </article>

// //             <article className="ad-tile">
// //               <div className="ad-icon" aria-hidden>💰</div>
// //               <div className="ad-meta">
// //                 <span className="ad-label">Revenue</span>
// //                 <span className="ad-value">₹{nfmt(data.revenue)}</span>
// //               </div>
// //             </article>
// //           </section>

// //           {!!data.lowStock?.length && (
// //             <section className="ad-panel">
// //               <div className="ad-panel-head">
// //                 <h3>Low Stock</h3>
// //                 <span className="ad-chip">{data.lowStock.length}</span>
// //               </div>
// //               <div className="ad-table-wrap">
// //                 <table className="ad-table">
// //                   <thead>
// //                     <tr>
// //                       <th style={{ width: "44%" }}>Product</th>
// //                       <th>SKU</th>
// //                       <th style={{ textAlign: "right" }}>Stock</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {data.lowStock.map((x, i) => (
// //                       <tr key={i}>
// //                         <td title={x.title}>{x.title}</td>
// //                         <td className="mono">{x.sku}</td>
// //                         <td className="right">
// //                           <span className="ad-stock-badge">{x.stock}</span>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </section>
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // }




// // frontend/src/pages/Dashboard.jsx
// import React, { useEffect, useState } from "react";
// import http from "../../api/http.js";
// import { ENDPOINTS } from "../../api/endpoints.js";
// import "./Dashboard.css";
// import AdminAIAgents from "./AdminAi/AdminAIAgents.jsx";   // ← Added

// const nfmt = (n) =>
//   typeof n === "number"
//     ? n.toLocaleString("en-IN", { maximumFractionDigits: 0 })
//     : n;

// export default function Dashboard() {
//   const [data, setData] = useState(null);
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await http.get(ENDPOINTS.admin.stats);
//         setData(res.data);
//       } catch (e) {
//         setErr(e?.response?.data?.message || "Failed to load stats");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   return (
//     <div className="ad-wrap">
//       <header className="ad-head">
//         <h2>Admin Dashboard</h2>
//         <p className="ad-sub">Overview of your store performance</p>
//       </header>

//       {loading && (
//         <section className="ad-grid">
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className="ad-tile shimmer" aria-hidden />
//           ))}
//         </section>
//       )}

//       {!loading && err && (
//         <div className="ad-error" role="alert">
//           <span>⚠️ {err}</span>
//           <button className="btn btn-ghost" onClick={() => location.reload()}>
//             Retry
//           </button>
//         </div>
//       )}

//       {!loading && data && (
//         <>
//           {/* Stats Grid */}
//           <section className="ad-grid">
//             <article className="ad-tile">
//               <div className="ad-icon" aria-hidden>🧺</div>
//               <div className="ad-meta">
//                 <span className="ad-label">Total Products</span>
//                 <span className="ad-value">{nfmt(data.products)}</span>
//               </div>
//             </article>

//             <article className="ad-tile">
//               <div className="ad-icon" aria-hidden>👥</div>
//               <div className="ad-meta">
//                 <span className="ad-label">Total Users</span>
//                 <span className="ad-value">{nfmt(data.users)}</span>
//               </div>
//             </article>

//             <article className="ad-tile">
//               <div className="ad-icon" aria-hidden>🧾</div>
//               <div className="ad-meta">
//                 <span className="ad-label">Total Orders</span>
//                 <span className="ad-value">{nfmt(data.orders)}</span>
//               </div>
//             </article>

//             <article className="ad-tile">
//               <div className="ad-icon" aria-hidden>💰</div>
//               <div className="ad-meta">
//                 <span className="ad-label">Revenue</span>
//                 <span className="ad-value">₹{nfmt(data.revenue)}</span>
//               </div>
//             </article>
//           </section>

//           {/* Low Stock Alert */}
//           {!!data.lowStock?.length && (
//             <section className="ad-panel">
//               <div className="ad-panel-head">
//                 <h3>Low Stock Alert</h3>
//                 <span className="ad-chip">{data.lowStock.length}</span>
//               </div>
//               <div className="ad-table-wrap">
//                 <table className="ad-table">
//                   <thead>
//                     <tr>
//                       <th style={{ width: "44%" }}>Product</th>
//                       <th>SKU</th>
//                       <th style={{ textAlign: "right" }}>Stock</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.lowStock.map((x, i) => (
//                       <tr key={i}>
//                         <td title={x.title}>{x.title}</td>
//                         <td className="mono">{x.sku}</td>
//                         <td className="right">
//                           <span className="ad-stock-badge">{x.stock}</span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </section>
//           )}

//           {/* 🔥 AI Agents Section */}
//           <section className="ad-panel ai-agents-panel">
//             <div className="ad-panel-head">
//               <h3>🤖 AI Agents for Admin</h3>
//               <p className="ad-sub">Get intelligent insights instantly</p>
//             </div>
//             <AdminAIAgents />
//           </section>
//         </>
//       )}
//     </div>
//   );
// }





// frontend/src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import http from "../../api/http.js";
import { ENDPOINTS } from "../../api/endpoints.js";
import AdminAIAgents from "./AdminAi/AdminAIAgents.jsx";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      {/* Header */}
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h2>

        <p className="text-gray-500 mt-1">
          Overview of your store performance
        </p>
      </header>

      {/* Loading */}
      {loading && (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 rounded-2xl bg-white animate-pulse shadow"
            />
          ))}
        </section>
      )}

      {/* Error */}
      {!loading && err && (
        <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
          <span>⚠️ {err}</span>

          <button
            onClick={() => location.reload()}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Dashboard Data */}
      {!loading && data && (
        <>
          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {/* Products */}
            <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                🧺
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Total Products
                </p>

                <h3 className="text-2xl font-bold text-gray-900">
                  {nfmt(data.products)}
                </h3>
              </div>
            </article>

            {/* Users */}
            <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                👥
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Total Users
                </p>

                <h3 className="text-2xl font-bold text-gray-900">
                  {nfmt(data.users)}
                </h3>
              </div>
            </article>

            {/* Orders */}
            <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                🧾
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Total Orders
                </p>

                <h3 className="text-2xl font-bold text-gray-900">
                  {nfmt(data.orders)}
                </h3>
              </div>
            </article>

            {/* Revenue */}
            <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">
                💰
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Revenue
                </p>

                <h3 className="text-2xl font-bold text-gray-900">
                  ₹{nfmt(data.revenue)}
                </h3>
              </div>
            </article>
          </section>

          {/* Low Stock */}
          {!!data.lowStock?.length && (
            <section className="bg-white rounded-2xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-semibold text-gray-900">
                  Low Stock Alert
                </h3>

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {data.lowStock.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3">
                        Product
                      </th>

                      <th className="text-left px-4 py-3">
                        SKU
                      </th>

                      <th className="text-right px-4 py-3">
                        Stock
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.lowStock.map((x, i) => (
                      <tr
                        key={i}
                        className="border-b hover:bg-gray-50"
                      >
                        <td
                          className="px-4 py-3"
                          title={x.title}
                        >
                          {x.title}
                        </td>

                        <td className="font-mono text-sm text-gray-600 px-4 py-3">
                          {x.sku}
                        </td>

                        <td className="text-right px-4 py-3">
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
                            {x.stock}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* AI Agents */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                🤖 AI Agents for Admin
              </h3>

              <p className="text-gray-500 mt-1">
                Get intelligent insights instantly
              </p>
            </div>

            <AdminAIAgents />
          </section>
        </>
      )}
    </div>
  );
}