// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { logout } from '../store/userSlice.js';

// export default function AdminLayout({ children }) {
//   const dispatch = useDispatch();
//   const nav = useNavigate();
//   const doLogout = () => { dispatch(logout()); nav('/profile'); };

//   return (
//     <div className="admin-wrap">
//       <aside className="admin-side">
//         <div className="admin-brand">🧭 Dashboard</div>
//         <nav className="admin-nav">
//           <NavLink to="/admin">Dashboard</NavLink>
//           <NavLink to="/admin/products">Display</NavLink>
//           <NavLink to="/admin/insert">Insert</NavLink>
//           <NavLink to="/admin/search">Search</NavLink>
//           <NavLink to="/admin/products">Update</NavLink>
//           <NavLink to="/admin/orders">Order Display</NavLink>
//         </nav>
//         <button className="btn danger" onClick={doLogout} style={{marginTop:'auto'}}>Logout</button>
//       </aside>
//       <section className="admin-main">
//         {children}
//       </section>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice.js';
import './AdminLayout.css';

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const doLogout = () => { dispatch(logout()); nav('/profile'); };
  const linkClass = ({ isActive }) => 's-link' + (isActive ? ' active' : '');

  return (
    <div className={`layout ${open ? 'open' : ''}`}>
      {/* Topbar (mobile / small screens) */}
      <header className="topbar">
        <button className="icon" onClick={() => setOpen(v => !v)} aria-label="Menu" aria-expanded={open}>☰</button>
        <div className="title">Dashboard</div>
        <button className="icon" onClick={doLogout} aria-label="Logout">⎋</button>
      </header>

      {/* Sidebar */}
      <aside className="sidebar" aria-label="Admin sidebar">
        <div className="brand">🧭 Dashboard</div>
        <nav className="nav" role="navigation">
          <NavLink end to="/admin" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/admin/products" className={linkClass}>Display</NavLink>
          <NavLink to="/admin/insert" className={linkClass}>Insert</NavLink>
          <NavLink to="/admin/search" className={linkClass}>Search</NavLink>
          <NavLink to="/admin/products" className={linkClass}>Update</NavLink>
          <NavLink to="/admin/orders" className={linkClass}>Order Display</NavLink>
        </nav>
        <button className="btn danger" onClick={doLogout}>Logout</button>
      </aside>

      {/* Click-away backdrop for mobile */}
      <div className="backdrop" onClick={() => setOpen(false)} />

      {/* Main */}
      <main className="main" onClick={() => open && setOpen(false)}>
        {children}
      </main>
    </div>
  );
}
