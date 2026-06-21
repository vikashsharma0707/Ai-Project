// // import React from 'react';
// // import { NavLink, useNavigate } from 'react-router-dom';
// // import { useDispatch } from 'react-redux';
// // import { logout } from '../store/userSlice.js';

// // export default function AdminLayout({ children }) {
// //   const dispatch = useDispatch();
// //   const nav = useNavigate();
// //   const doLogout = () => { dispatch(logout()); nav('/profile'); };

// //   return (
// //     <div className="admin-wrap">
// //       <aside className="admin-side">
// //         <div className="admin-brand">🧭 Dashboard</div>
// //         <nav className="admin-nav">
// //           <NavLink to="/admin">Dashboard</NavLink>
// //           <NavLink to="/admin/products">Display</NavLink>
// //           <NavLink to="/admin/insert">Insert</NavLink>
// //           <NavLink to="/admin/search">Search</NavLink>
// //           <NavLink to="/admin/products">Update</NavLink>
// //           <NavLink to="/admin/orders">Order Display</NavLink>
// //         </nav>
// //         <button className="btn danger" onClick={doLogout} style={{marginTop:'auto'}}>Logout</button>
// //       </aside>
// //       <section className="admin-main">
// //         {children}
// //       </section>
// //     </div>
// //   );
// // }



// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { logout } from '../store/userSlice.js';
// import './AdminLayout.css';

// export default function AdminLayout({ children }) {
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();
//   const nav = useNavigate();

//   const doLogout = () => { dispatch(logout()); nav('/profile'); };
//   const linkClass = ({ isActive }) => 's-link' + (isActive ? ' active' : '');

//   return (
//     <div className={`layout ${open ? 'open' : ''}`}>
//       {/* Topbar (mobile / small screens) */}
//       <header className="topbar">
//         <button className="icon" onClick={() => setOpen(v => !v)} aria-label="Menu" aria-expanded={open}>☰</button>
//         <div className="title">Dashboard</div>
//         <button className="icon" onClick={doLogout} aria-label="Logout">⎋</button>
//       </header>

//       {/* Sidebar */}
//       <aside className="sidebar" aria-label="Admin sidebar">
//         <div className="brand">🧭 Dashboard</div>
//         <nav className="nav" role="navigation">
//           <NavLink end to="/admin" className={linkClass}>Dashboard</NavLink>
//           <NavLink to="/admin/products" className={linkClass}>Display</NavLink>
//           <NavLink to="/admin/insert" className={linkClass}>Insert</NavLink>
//           <NavLink to="/admin/search" className={linkClass}>Search</NavLink>
//           <NavLink to="/admin/products" className={linkClass}>Update</NavLink>
//           <NavLink to="/admin/orders" className={linkClass}>Order Display</NavLink>
//           <NavLink to="/admin/agents" className={linkClass}>Agents</NavLink>
//           <NavLink to="/admin/history" className={linkClass}>Agents</NavLink>
//         </nav>
//         <button className="btn danger" onClick={doLogout}>Logout</button>
//       </aside>

//       {/* Click-away backdrop for mobile */}
//       <div className="backdrop" onClick={() => setOpen(false)} />

//       {/* Main */}
//       <main className="main" onClick={() => open && setOpen(false)}>
//         {children}
//       </main>
//     </div>
//   );
// }




import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice.js";

import {
  LayoutDashboard,
  Package,
  PlusSquare,
  Search,
  ShoppingCart,
  Bot,
  History,
  Menu,
  LogOut,
  X,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doLogout = () => {
    dispatch(logout());
    navigate("/profile");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <Package size={18} />,
    },
    {
      name: "Insert Product",
      path: "/admin/insert",
      icon: <PlusSquare size={18} />,
    },
    {
      name: "Search",
      path: "/admin/search",
      icon: <Search size={18} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ShoppingCart size={18} />,
    },
    {
      name: "AI Agents",
      path: "/admin/agents",
      icon: <Bot size={18} />,
    },
    {
      name: "History",
      path: "/admin/history",
      icon: <History size={18} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-72
          bg-gradient-to-b from-slate-900 to-slate-800
          text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold">
            🧭 Admin Panel
          </h2>

          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Profile */}
        <div className="p-6 border-b border-slate-700">
          <div className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center text-xl font-bold">
            A
          </div>

          <h3 className="mt-3 font-semibold">
            Admin User
          </h3>

          <p className="text-sm text-gray-400">
            Administrator
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              end={item.path === "/admin"}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3 rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "hover:bg-slate-700"
                }
              `
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-5 left-0 w-full px-4">
          <button
            onClick={doLogout}
            className="
              w-full
              flex items-center justify-center gap-2
              bg-red-500 hover:bg-red-600
              px-4 py-3
              rounded-xl
              font-medium
              transition
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu size={24} />
            </button>

            <h1 className="font-semibold text-xl">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm text-gray-500">
              Welcome Back 👋
            </div>

            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}