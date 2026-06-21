// // // // // // // // import React from 'react';
// // // // // // // // import { Link, NavLink } from 'react-router-dom';
// // // // // // // // import { useSelector, useDispatch } from 'react-redux';
// // // // // // // // import { logout } from '../store/userSlice.js';

// // // // // // // // export default function Header(){
// // // // // // // //   const me = useSelector(s=>s.user.me);
// // // // // // // //   const cartCount = useSelector(s=>s.cart.items.reduce((s,i)=>s+i.qty,0));
// // // // // // // //   const dispatch = useDispatch();
// // // // // // // //   return (
// // // // // // // //     <header className="topbar">
// // // // // // // //       <div className="container row space">
// // // // // // // //         <Link to="/" className="logo">Clothes Shopping Online</Link>
// // // // // // // //         <nav className="nav">
// // // // // // // //           <NavLink to="/">Home</NavLink>
// // // // // // // //           <NavLink to="/catalog">Shop</NavLink>
// // // // // // // //           <NavLink to="/orders">My Orders</NavLink>
// // // // // // // //           {me?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
// // // // // // // //         </nav>
// // // // // // // //         <div className="nav">
// // // // // // // //           {!me && <NavLink to="/profile">Login</NavLink>}
// // // // // // // //           {me && <button className="link" onClick={()=>dispatch(logout())}>Logout</button>}
// // // // // // // //           <NavLink to="/cart">🛒 {cartCount}</NavLink>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </header>
// // // // // // // //   );
// // // // // // // // }


// // // // // // // import React from "react";
// // // // // // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // // // import { logout } from "../store/userSlice.js";
// // // // // // // // import "./Header.css";

// // // // // // // export default function Header(){
// // // // // // //   const { me } = useSelector(s => s.user);
// // // // // // //   const dispatch = useDispatch();
// // // // // // //   const nav = useNavigate();

// // // // // // //   const doLogout = () => {
// // // // // // //     dispatch(logout());
// // // // // // //     nav("/profile");
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <header className="header">
// // // // // // //       <div className="container row space">
// // // // // // //         <Link className="brand" to="/">Clothes Shopping Online</Link>

// // // // // // //         <nav className="row gap">
// // // // // // //           <NavLink to="/">Home</NavLink>
// // // // // // //           <NavLink to="/shop">Shop</NavLink>
          
// // // // // // //           <NavLink to="/orders">My Orders</NavLink>
// // // // // // //           {me?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
// // // // // // //         </nav>

// // // // // // //         <div className="row gap">
// // // // // // //           {me?._id ? (
// // // // // // //             <>
// // // // // // //               <span title={me.email}>Hello, <b>{me.name}</b> ({me.role})</span>
// // // // // // //               <button className="link" onClick={doLogout}>Logout</button>
// // // // // // //             </>
// // // // // // //           ) : (
// // // // // // //             <NavLink to="/profile">Login</NavLink>
// // // // // // //           )}
// // // // // // //           <NavLink to="/cart" aria-label="Cart">🛒</NavLink>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </header>
// // // // // // //   );
// // // // // // // }


// // // // // // import React, { useMemo } from "react";
// // // // // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // // import { logout } from "../store/userSlice.js";
// // // // // // import "./Header.css";

// // // // // // export default function Header() {
// // // // // //   const { me } = useSelector((s) => s.user);
// // // // // //   const cartItems = useSelector((s) => s.cart?.items || []);
// // // // // //   const dispatch = useDispatch();
// // // // // //   const nav = useNavigate();

// // // // // //   const cartTotal = useMemo(
// // // // // //     () => cartItems.reduce((s, i) => s + (Number(i.price) || 0) * (i.qty || 1), 0),
// // // // // //     [cartItems]
// // // // // //   );

// // // // // //   const doLogout = () => {
// // // // // //     dispatch(logout());
// // // // // //     nav("/profile");
// // // // // //   };

// // // // // //   return (
// // // // // //     <header className="site-header">
// // // // // //       <div className="container header-row">
// // // // // //         {/* Left: Brand */}
// // // // // //         <div className="left">
// // // // // //           <Link className="brand" to="/">Male <span>Fashion</span></Link>
// // // // // //         </div>

// // // // // //         {/* Center: Nav + categories + search */}
// // // // // //         <div className="center">
// // // // // //           <nav className="main-nav">
// // // // // //             <NavLink to="/" end>Home</NavLink>
// // // // // //             <NavLink to="/shop">Shop</NavLink>
// // // // // //              <NavLink to="/orders">Orders</NavLink>
// // // // // //              <NavLink to="/visualsearch">Visual Search</NavLink>
// // // // // //             <NavLink to="/blog">Blog</NavLink>
// // // // // //             <NavLink to="/about">About</NavLink>
// // // // // //             <NavLink to="/contact">Contacts</NavLink>

// // // // // //             <div className="nav-dropdown">
// // // // // //               <button className="drop-btn" aria-haspopup="true" aria-expanded="false">
// // // // // //                 Shop by Categories ▾
// // // // // //               </button>
// // // // // //               <div className="drop-menu">
// // // // // //                 <Link to="/shop?cat=mens">Men</Link>
// // // // // //                 <Link to="/shop?cat=womens">Women</Link>
// // // // // //                 <Link to="/shop?cat=kids">Kids</Link>
// // // // // //                 <Link to="/shop?cat=accessories">Accessories</Link>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </nav>

// // // // // //           <form className="nav-search" onSubmit={(e) => e.preventDefault()}>
// // // // // //             <input type="search" placeholder="Search…" aria-label="Search products" />
// // // // // //             <button aria-label="Search">🔍</button>
// // // // // //           </form>
// // // // // //         </div>

// // // // // //         {/* Right: Account / Cart / Wishlist / Dashboard */}
// // // // // //         <div className="right">
// // // // // //           {me?._id ? (
// // // // // //             <>
// // // // // //               <NavLink to="/profile" className="muted">My Account</NavLink>
// // // // // //               <button className="link-btn" onClick={doLogout}>Sign Out</button>
// // // // // //             </>
// // // // // //           ) : (
// // // // // //             <NavLink to="/profile" className="muted">Login</NavLink>
// // // // // //           )}

// // // // // //           <NavLink to="/cart" className="cart-link" aria-label="Cart">
// // // // // //             <span className="cart-ico" aria-hidden>🛒</span>
// // // // // //             <span className="cart-total">₹{cartTotal.toLocaleString("en-IN")}</span>
// // // // // //           </NavLink>

// // // // // //           <NavLink to="/wishlist" className="wish-link" aria-label="Wishlist">❤️</NavLink>

// // // // // //           {(me?.role === "admin" || me?.role === "manager") && (
// // // // // //             <NavLink to="/admin" className="muted">Dashboard</NavLink>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* Mobile burger */}
// // // // // //         <input id="nav-toggle" type="checkbox" className="nav-toggle" />
// // // // // //         <label htmlFor="nav-toggle" className="burger" aria-label="Toggle menu">☰</label>
// // // // // //       </div>

// // // // // //       {/* Mobile drawer */}
// // // // // //       <div className="mobile-drawer">
// // // // // //         <nav className="mobile-nav">
// // // // // //           <NavLink to="/" end>Home</NavLink>
// // // // // //           <NavLink to="/shop">Shop</NavLink>
// // // // // //           <NavLink to="/blog">Blog</NavLink>
// // // // // //           <NavLink to="/about">About</NavLink>
// // // // // //           <NavLink to="/contacts">Contacts</NavLink>
// // // // // //            <NavLink to="/VisualSearch">VisualSearch</NavLink>
// // // // // //           <details>
// // // // // //             <summary>Shop by Categories</summary>
// // // // // //             <div className="mob-cats">
// // // // // //               <Link to="/shop?cat=mens">Men</Link>
// // // // // //               <Link to="/shop?cat=womens">Women</Link>
// // // // // //               <Link to="/shop?cat=kids">Kids</Link>
// // // // // //               <Link to="/shop?cat=accessories">Accessories</Link>
// // // // // //             </div>
// // // // // //           </details>
// // // // // //           <div className="mob-actions">
// // // // // //             {me?._id ? (
// // // // // //               <>
// // // // // //                 <NavLink to="/profile">My Account</NavLink>
// // // // // //                 <button className="link-btn" onClick={doLogout}>Sign Out</button>
// // // // // //               </>
// // // // // //             ) : (
// // // // // //               <NavLink to="/profile">Login</NavLink>
// // // // // //             )}
// // // // // //             {(me?.role === "admin" || me?.role === "manager") && (
// // // // // //               <NavLink to="/admin">Dashboard</NavLink>
// // // // // //             )}
// // // // // //             <NavLink to="/cart">Cart – ₹{cartTotal.toLocaleString("en-IN")}</NavLink>
// // // // // //             <NavLink to="/wishlist">Wishlist</NavLink>
// // // // // //           </div>
// // // // // //         </nav>
// // // // // //       </div>
// // // // // //     </header>
// // // // // //   );
// // // // // // }




// // // // // // frontend/src/components/Header.jsx
// // // // // import React, { useMemo } from "react";
// // // // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // import { logout } from "../store/userSlice.js";
// // // // // import "./Header.css";

// // // // // export default function Header() {
// // // // //   const { me } = useSelector((s) => s.user);
// // // // //   const cartItems = useSelector((s) => s.cart?.items || []);
// // // // //   const dispatch = useDispatch();
// // // // //   const nav = useNavigate();

// // // // //   const cartTotal = useMemo(() => 
// // // // //     cartItems.reduce((s, i) => s + (Number(i.price) || 0) * (i.qty || 1), 0),
// // // // //     [cartItems]
// // // // //   );

// // // // //   const doLogout = () => {
// // // // //     dispatch(logout());
// // // // //     nav("/profile");
// // // // //   };

// // // // //   const isAdmin = me?.role === "admin" || me?.role === "manager";

// // // // //   return (
// // // // //     <header className="site-header">
// // // // //       <div className="container header-row">
// // // // //         {/* Brand */}
// // // // //         <div className="left">
// // // // //           <Link className="brand" to="/">Male <span>Fashion</span></Link>
// // // // //         </div>

// // // // //         {/* Center Navigation */}
// // // // //         <div className="center">
// // // // //           <nav className="main-nav">
// // // // //             <NavLink to="/" end>Home</NavLink>
// // // // //             <NavLink to="/shop">Shop</NavLink>
// // // // //             <NavLink to="/visualsearch">Visual Search</NavLink>
// // // // //             <NavLink to="/blog">Blog</NavLink>
// // // // //             <NavLink to="/contact">Contact</NavLink>

// // // // //             <div className="nav-dropdown">
// // // // //               <button className="drop-btn">Shop by Categories ▾</button>
// // // // //               <div className="drop-menu">
// // // // //                 <Link to="/shop?cat=mens">Men</Link>
// // // // //                 <Link to="/shop?cat=womens">Women</Link>
// // // // //                 <Link to="/shop?cat=kids">Kids</Link>
// // // // //               </div>
// // // // //             </div>
// // // // //           </nav>

// // // // //           <form className="nav-search" onSubmit={(e) => e.preventDefault()}>
// // // // //             <input type="search" placeholder="Search products..." />
// // // // //             <button type="submit">🔍</button>
// // // // //           </form>
// // // // //         </div>

// // // // //         {/* Right Side - Role Based */}
// // // // //         <div className="right">
// // // // //           {me?._id ? (
// // // // //             <>
// // // // //               <NavLink to="/profile" className="muted">Hi, {me.name?.split(" ")[0]}</NavLink>
// // // // //               <button className="link-btn" onClick={doLogout}>Sign Out</button>
// // // // //             </>
// // // // //           ) : (
// // // // //             <NavLink to="/profile" className="muted">Login / Register</NavLink>
// // // // //           )}

// // // // //           {/* User Features */}
// // // // //           {!isAdmin && (
// // // // //             <>
// // // // //               <NavLink to="/wishlist" className="wish-link" aria-label="Wishlist">❤️</NavLink>
// // // // //               <NavLink to="/cart" className="cart-link" aria-label="Cart">
// // // // //                 🛒 <span className="cart-count">({cartItems.length})</span>
// // // // //               </NavLink>
// // // // //             </>
// // // // //           )}

// // // // //           {/* Admin Features */}
// // // // //           {isAdmin && (
// // // // //             <NavLink to="/admin" className="admin-link">
// // // // //               📊 Dashboard
// // // // //             </NavLink>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Mobile Menu */}
// // // // //         <input id="nav-toggle" type="checkbox" className="nav-toggle" />
// // // // //         <label htmlFor="nav-toggle" className="burger">☰</label>
// // // // //       </div>

// // // // //       {/* Mobile Drawer */}
// // // // //       <div className="mobile-drawer">
// // // // //         <nav className="mobile-nav">
// // // // //           <NavLink to="/" end>Home</NavLink>
// // // // //           <NavLink to="/shop">Shop</NavLink>
// // // // //           <NavLink to="/visualsearch">Visual Search</NavLink>
// // // // //           <NavLink to="/blog">Blog</NavLink>
// // // // //           <NavLink to="/contact">Contact</NavLink>

// // // // //           {isAdmin ? (
// // // // //             <NavLink to="/admin">Dashboard</NavLink>
// // // // //           ) : (
// // // // //             <>
// // // // //               <NavLink to="/wishlist">Wishlist</NavLink>
// // // // //               <NavLink to="/cart">Cart ({cartItems.length})</NavLink>
// // // // //             </>
// // // // //           )}

// // // // //           {me?._id ? (
// // // // //             <button onClick={doLogout} className="logout-btn">Sign Out</button>
// // // // //           ) : (
// // // // //             <NavLink to="/profile">Login</NavLink>
// // // // //           )}
// // // // //         </nav>
// // // // //       </div>
// // // // //     </header>
// // // // //   );
// // // // // }

// // // // // frontend/src/components/Header.jsx

// // // // import React, { useMemo } from "react";
// // // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { logout } from "../store/userSlice.js";

// // // // export default function Header() {
// // // //   const { me } = useSelector((s) => s.user);
// // // //   const cartItems = useSelector((s) => s.cart?.items || []);
// // // //   const dispatch = useDispatch();
// // // //   const nav = useNavigate();

// // // //   const cartTotal = useMemo(
// // // //     () =>
// // // //       cartItems.reduce(
// // // //         (s, i) => s + (Number(i.price) || 0) * (i.qty || 1),
// // // //         0
// // // //       ),
// // // //     [cartItems]
// // // //   );

// // // //   const doLogout = () => {
// // // //     dispatch(logout());
// // // //     nav("/profile");
// // // //   };

// // // //   const isAdmin = me?.role === "admin" || me?.role === "manager";

// // // //   return (
// // // //     <header className="sticky top-0 z-50 bg-white shadow-md">
// // // //       <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
// // // //         {/* Brand */}
// // // //         <Link
// // // //           to="/"
// // // //           className="text-2xl font-bold text-black"
// // // //         >
// // // //           Male <span className="text-red-500">Fashion</span>
// // // //         </Link>

// // // //         {/* Desktop Navigation */}
// // // //         <div className="hidden lg:flex items-center gap-8">
// // // //           <nav className="flex items-center gap-6 font-medium">
// // // //             <NavLink to="/" end className="hover:text-red-500">
// // // //               Home
// // // //             </NavLink>

// // // //             <NavLink to="/shop" className="hover:text-red-500">
// // // //               Shop
// // // //             </NavLink>

// // // //             <NavLink
// // // //               to="/visualsearch"
// // // //               className="hover:text-red-500"
// // // //             >
// // // //               Visual Search
// // // //             </NavLink>

// // // //             <NavLink to="/blog" className="hover:text-red-500">
// // // //               Blog
// // // //             </NavLink>

// // // //             <NavLink to="/contact" className="hover:text-red-500">
// // // //               Contact
// // // //             </NavLink>

// // // //             {/* Dropdown */}
// // // //             <div className="relative group">
// // // //               <button className="hover:text-red-500">
// // // //                 Shop by Categories ▾
// // // //               </button>

// // // //               <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white shadow-lg rounded-md min-w-[180px]">
// // // //                 <Link
// // // //                   to="/shop?cat=mens"
// // // //                   className="block px-4 py-2 hover:bg-gray-100"
// // // //                 >
// // // //                   Men
// // // //                 </Link>

// // // //                 <Link
// // // //                   to="/shop?cat=womens"
// // // //                   className="block px-4 py-2 hover:bg-gray-100"
// // // //                 >
// // // //                   Women
// // // //                 </Link>

// // // //                 <Link
// // // //                   to="/shop?cat=kids"
// // // //                   className="block px-4 py-2 hover:bg-gray-100"
// // // //                 >
// // // //                   Kids
// // // //                 </Link>
// // // //               </div>
// // // //             </div>
// // // //           </nav>

// // // //           {/* Search */}
// // // //           <form
// // // //             onSubmit={(e) => e.preventDefault()}
// // // //             className="flex border rounded-lg overflow-hidden"
// // // //           >
// // // //             <input
// // // //               type="search"
// // // //               placeholder="Search products..."
// // // //               className="px-3 py-2 outline-none w-60"
// // // //             />
// // // //             <button
// // // //               type="submit"
// // // //               className="px-4 bg-black text-white"
// // // //             >
// // // //               🔍
// // // //             </button>
// // // //           </form>
// // // //         </div>

// // // //         {/* Right Side */}
// // // //         <div className="hidden lg:flex items-center gap-4">
// // // //           {me?._id ? (
// // // //             <>
// // // //               <NavLink
// // // //                 to="/profile"
// // // //                 className="text-gray-600 hover:text-black"
// // // //               >
// // // //                 Hi, {me.name?.split(" ")[0]}
// // // //               </NavLink>

// // // //               <button
// // // //                 onClick={doLogout}
// // // //                 className="text-red-500 hover:text-red-700"
// // // //               >
// // // //                 Sign Out
// // // //               </button>
// // // //             </>
// // // //           ) : (
// // // //             <NavLink
// // // //               to="/profile"
// // // //               className="text-gray-600 hover:text-black"
// // // //             >
// // // //               Login / Register
// // // //             </NavLink>
// // // //           )}

// // // //           {!isAdmin && (
// // // //             <>
// // // //               <NavLink
// // // //                 to="/wishlist"
// // // //                 className="text-xl hover:scale-110 transition"
// // // //               >
// // // //                 ❤️
// // // //               </NavLink>

// // // //               <NavLink
// // // //                 to="/cart"
// // // //                 className="flex items-center gap-1 text-xl"
// // // //               >
// // // //                 🛒
// // // //                 <span className="text-sm font-semibold">
// // // //                   ({cartItems.length})
// // // //                 </span>
// // // //               </NavLink>
// // // //             </>
// // // //           )}

// // // //           {isAdmin && (
// // // //             <NavLink
// // // //               to="/admin"
// // // //               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// // // //             >
// // // //               Dashboard
// // // //             </NavLink>
// // // //           )}
// // // //         </div>

// // // //         {/* Mobile Menu */}
// // // //         <details className="lg:hidden relative">
// // // //           <summary className="list-none cursor-pointer text-3xl">
// // // //             ☰
// // // //           </summary>

// // // //           <div className="absolute right-0 mt-3 bg-white shadow-lg rounded-lg w-64 p-4">
// // // //             <nav className="flex flex-col gap-3">
// // // //               <NavLink to="/">Home</NavLink>
// // // //               <NavLink to="/shop">Shop</NavLink>
// // // //               <NavLink to="/visualsearch">
// // // //                 Visual Search
// // // //               </NavLink>
// // // //               <NavLink to="/blog">Blog</NavLink>
// // // //               <NavLink to="/contact">Contact</NavLink>

// // // //               {isAdmin ? (
// // // //                 <NavLink to="/admin">
// // // //                   Dashboard
// // // //                 </NavLink>
// // // //               ) : (
// // // //                 <>
// // // //                   <NavLink to="/wishlist">
// // // //                     Wishlist
// // // //                   </NavLink>
// // // //                   <NavLink to="/cart">
// // // //                     Cart ({cartItems.length})
// // // //                   </NavLink>
// // // //                 </>
// // // //               )}

// // // //               {me?._id ? (
// // // //                 <button
// // // //                   onClick={doLogout}
// // // //                   className="text-left text-red-500"
// // // //                 >
// // // //                   Sign Out
// // // //                 </button>
// // // //               ) : (
// // // //                 <NavLink to="/profile">
// // // //                   Login
// // // //                 </NavLink>
// // // //               )}
// // // //             </nav>
// // // //           </div>
// // // //         </details>
// // // //       </div>
// // // //     </header>
// // // //   );
// // // // }




// // // import React, { useMemo, useState } from "react";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { logout } from "../store/userSlice.js";

// // // export default function Header() {
// // //   const { me } = useSelector((s) => s.user);
// // //   const cartItems = useSelector((s) => s.cart?.items || []);
// // //   const dispatch = useDispatch();
// // //   const nav = useNavigate();
// // //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// // //   const cartTotal = useMemo(
// // //     () =>
// // //       cartItems.reduce(
// // //         (s, i) => s + (Number(i.price) || 0) * (i.qty || 1),
// // //         0
// // //       ),
// // //     [cartItems]
// // //   );

// // //   const doLogout = () => {
// // //     dispatch(logout());
// // //     nav("/profile");
// // //   };

// // //   const isAdmin = me?.role === "admin" || me?.role === "manager";

// // //   return (
// // //     <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //         <div className="flex items-center justify-between h-20">
          
// // //           {/* Logo */}
// // //           <Link 
// // //             to="/" 
// // //             className="flex items-center gap-1 text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity duration-200 flex-shrink-0"
// // //           >
// // //             <span className="text-black">Male</span>
// // //             <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent font-black">
// // //               Fashion
// // //             </span>
// // //           </Link>

// // //           {/* Desktop Navigation */}
// // //           <nav className="hidden lg:flex items-center gap-1">
// // //             <NavLink 
// // //               to="/" 
// // //               end
// // //               className={({ isActive }) =>
// // //                 `px-4 py-2 text-sm font-medium transition-all duration-200 relative group ${
// // //                   isActive
// // //                     ? "text-yellow-600"
// // //                     : "text-gray-700 hover:text-yellow-600"
// // //                 }`
// // //               }
// // //             >
// // //               Home
// // //               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
// // //             </NavLink>

// // //             <NavLink 
// // //               to="/shop"
// // //               className={({ isActive }) =>
// // //                 `px-4 py-2 text-sm font-medium transition-all duration-200 relative group ${
// // //                   isActive
// // //                     ? "text-yellow-600"
// // //                     : "text-gray-700 hover:text-yellow-600"
// // //                 }`
// // //               }
// // //             >
// // //               Shop
// // //               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
// // //             </NavLink>

// // //             <NavLink
// // //               to="/visualsearch"
// // //               className={({ isActive }) =>
// // //                 `px-4 py-2 text-sm font-medium transition-all duration-200 relative group ${
// // //                   isActive
// // //                     ? "text-yellow-600"
// // //                     : "text-gray-700 hover:text-yellow-600"
// // //                 }`
// // //               }
// // //             >
// // //               Visual Search
// // //               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
// // //             </NavLink>

// // //             <NavLink 
// // //               to="/blog"
// // //               className={({ isActive }) =>
// // //                 `px-4 py-2 text-sm font-medium transition-all duration-200 relative group ${
// // //                   isActive
// // //                     ? "text-yellow-600"
// // //                     : "text-gray-700 hover:text-yellow-600"
// // //                 }`
// // //               }
// // //             >
// // //               Blog
// // //               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
// // //             </NavLink>

// // //             <NavLink 
// // //               to="/contact"
// // //               className={({ isActive }) =>
// // //                 `px-4 py-2 text-sm font-medium transition-all duration-200 relative group ${
// // //                   isActive
// // //                     ? "text-yellow-600"
// // //                     : "text-gray-700 hover:text-yellow-600"
// // //                 }`
// // //               }
// // //             >
// // //               Contact
// // //               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
// // //             </NavLink>

// // //             {/* Dropdown Categories */}
// // //             <div className="relative group px-4 py-2">
// // //               <button className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors duration-200 flex items-center gap-2">
// // //                 Categories
// // //                 <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
// // //                 </svg>
// // //               </button>

// // //               <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
// // //                 <Link
// // //                   to="/shop?cat=mens"
// // //                   className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600 transition-colors duration-200 first:rounded-t-lg border-b border-gray-100 last:border-b-0"
// // //                 >
// // //                   👔 Men's Collection
// // //                 </Link>

// // //                 <Link
// // //                   to="/shop?cat=womens"
// // //                   className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
// // //                 >
// // //                   👗 Women's Collection
// // //                 </Link>

// // //                 <Link
// // //                   to="/shop?cat=kids"
// // //                   className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600 transition-colors duration-200 last:rounded-b-lg"
// // //                 >
// // //                   👕 Kids' Collection
// // //                 </Link>
// // //               </div>
// // //             </div>
// // //           </nav>

// // //           {/* Search Bar - Desktop */}
// // //           <form className="hidden lg:flex flex-1 max-w-sm mx-8">
// // //             <div className="relative w-full group">
// // //               <input
// // //                 type="search"
// // //                 placeholder="Search products..."
// // //                 className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
// // //               />
// // //               <button
// // //                 type="submit"
// // //                 className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-yellow-600 transition-colors duration-200"
// // //               >
// // //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// // //                 </svg>
// // //               </button>
// // //               <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-5 transition-opacity duration-200 pointer-events-none"></div>
// // //             </div>
// // //           </form>

// // //           {/* Right Side - Desktop */}
// // //           <div className="hidden lg:flex items-center gap-6">
// // //             {/* User Section */}
// // //             <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
// // //               {me?._id ? (
// // //                 <>
// // //                   <NavLink
// // //                     to="/profile"
// // //                     className="text-sm text-gray-600 hover:text-yellow-600 transition-colors duration-200 font-medium"
// // //                   >
// // //                     Hi, {me.name?.split(" ")[0]}
// // //                   </NavLink>
// // //                   <button
// // //                     onClick={doLogout}
// // //                     className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 font-medium"
// // //                   >
// // //                     Sign Out
// // //                   </button>
// // //                 </>
// // //               ) : (
// // //                 <NavLink
// // //                   to="/profile"
// // //                   className="text-sm text-gray-600 hover:text-yellow-600 transition-colors duration-200 font-medium"
// // //                 >
// // //                   Login / Register
// // //                 </NavLink>
// // //               )}
// // //             </div>

// // //             {!isAdmin && (
// // //               <>
// // //                 {/* Wishlist */}
// // //                 <NavLink
// // //                   to="/wishlist"
// // //                   className="p-2.5 text-gray-600 hover:text-red-500 border border-gray-200 rounded-lg hover:border-red-500 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
// // //                   title="Wishlist"
// // //                 >
// // //                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
// // //                     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
// // //                   </svg>
// // //                 </NavLink>

// // //                 {/* Shopping Cart */}
// // //                 <NavLink
// // //                   to="/cart"
// // //                   className="relative p-2.5 text-gray-600 hover:text-yellow-600 border border-gray-200 rounded-lg hover:border-yellow-500 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
// // //                   title="Shopping Cart"
// // //                 >
// // //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
// // //                   </svg>
// // //                   {cartItems.length > 0 && (
// // //                     <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
// // //                       {cartItems.length}
// // //                     </span>
// // //                   )}
// // //                 </NavLink>
// // //               </>
// // //             )}

// // //             {isAdmin && (
// // //               <NavLink
// // //                 to="/admin"
// // //                 className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
// // //               >
// // //                 Dashboard
// // //               </NavLink>
// // //             )}
// // //           </div>

// // //           {/* Mobile Menu Toggle */}
// // //           <button 
// // //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// // //             className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
// // //             aria-label="Toggle menu"
// // //           >
// // //             <svg className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// // //             </svg>
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Mobile Menu */}
// // //       {isMenuOpen && (
// // //         <div className="lg:hidden border-t border-gray-200 bg-gray-50 animate-in slide-in-from-top-2 duration-200">
// // //           <div className="px-4 py-4 space-y-2">
// // //             <nav className="flex flex-col gap-1">
// // //               <NavLink 
// // //                 to="/"
// // //                 onClick={() => setIsMenuOpen(false)}
// // //                 className={({ isActive }) =>
// // //                   `px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
// // //                     isActive
// // //                       ? "bg-yellow-100 text-yellow-700"
// // //                       : "text-gray-700 hover:bg-gray-100"
// // //                   }`
// // //                 }
// // //               >
// // //                 Home
// // //               </NavLink>

// // //               <NavLink 
// // //                 to="/shop"
// // //                 onClick={() => setIsMenuOpen(false)}
// // //                 className={({ isActive }) =>
// // //                   `px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
// // //                     isActive
// // //                       ? "bg-yellow-100 text-yellow-700"
// // //                       : "text-gray-700 hover:bg-gray-100"
// // //                   }`
// // //                 }
// // //               >
// // //                 Shop
// // //               </NavLink>

// // //               <NavLink 
// // //                 to="/visualsearch"
// // //                 onClick={() => setIsMenuOpen(false)}
// // //                 className={({ isActive }) =>
// // //                   `px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
// // //                     isActive
// // //                       ? "bg-yellow-100 text-yellow-700"
// // //                       : "text-gray-700 hover:bg-gray-100"
// // //                   }`
// // //                 }
// // //               >
// // //                 Visual Search
// // //               </NavLink>

// // //               <NavLink 
// // //                 to="/blog"
// // //                 onClick={() => setIsMenuOpen(false)}
// // //                 className={({ isActive }) =>
// // //                   `px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
// // //                     isActive
// // //                       ? "bg-yellow-100 text-yellow-700"
// // //                       : "text-gray-700 hover:bg-gray-100"
// // //                   }`
// // //                 }
// // //               >
// // //                 Blog
// // //               </NavLink>

// // //               <NavLink 
// // //                 to="/contact"
// // //                 onClick={() => setIsMenuOpen(false)}
// // //                 className={({ isActive }) =>
// // //                   `px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
// // //                     isActive
// // //                       ? "bg-yellow-100 text-yellow-700"
// // //                       : "text-gray-700 hover:bg-gray-100"
// // //                   }`
// // //                 }
// // //               >
// // //                 Contact
// // //               </NavLink>
// // //             </nav>

// // //             <div className="py-3 border-t border-gray-200 my-2"></div>

// // //             {isAdmin ? (
// // //               <NavLink 
// // //                 to="/admin"
// // //                 onClick={() => setIsMenuOpen(false)}
// // //                 className="block px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:shadow-md transition-all duration-200"
// // //               >
// // //                 Dashboard
// // //               </NavLink>
// // //             ) : (
// // //               <>
// // //                 <NavLink 
// // //                   to="/wishlist"
// // //                   onClick={() => setIsMenuOpen(false)}
// // //                   className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
// // //                 >
// // //                   ❤️ Wishlist
// // //                 </NavLink>

// // //                 <NavLink 
// // //                   to="/cart"
// // //                   onClick={() => setIsMenuOpen(false)}
// // //                   className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-colors duration-200"
// // //                 >
// // //                   🛒 Cart ({cartItems.length})
// // //                 </NavLink>
// // //               </>
// // //             )}

// // //             <div className="py-3 border-t border-gray-200 my-2"></div>

// // //             {me?._id ? (
// // //               <button
// // //                 onClick={() => {
// // //                   doLogout();
// // //                   setIsMenuOpen(false);
// // //                 }}
// // //                 className="w-full px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
// // //               >
// // //                 Sign Out
// // //               </button>
// // //             ) : (
// // //               <NavLink 
// // //                 to="/profile"
// // //                 onClick={() => setIsMenuOpen(false)}
// // //                 className="block px-4 py-2.5 text-sm font-medium text-center text-white bg-gray-800 hover:bg-gray-900 rounded-lg transition-colors duration-200"
// // //               >
// // //                 Login / Register
// // //               </NavLink>
// // //             )}

// // //             {/* Search for Mobile */}
// // //             <form className="mt-4 pt-4 border-t border-gray-200">
// // //               <div className="relative">
// // //                 <input
// // //                   type="search"
// // //                   placeholder="Search products..."
// // //                   className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
// // //                 />
// // //                 <button
// // //                   type="submit"
// // //                   className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-yellow-600"
// // //                 >
// // //                   🔍
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </header>
// // //   );
// // // }





// // // frontend/src/components/Header.jsx
// // import React, { useMemo, useState } from "react";
// // import { Link, NavLink, useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { logout } from "../store/userSlice.js";

// // export default function Header() {
// //   const { me } = useSelector((s) => s.user);
// //   const cartItems = useSelector((s) => s.cart?.items || []);
// //   const dispatch = useDispatch();
// //   const nav = useNavigate();
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// //   const cartTotal = useMemo(() => 
// //     cartItems.reduce((s, i) => s + (Number(i.price) || 0) * (i.qty || 1), 0),
// //     [cartItems]
// //   );

// //   const doLogout = () => {
// //     dispatch(logout());
// //     nav("/profile");
// //   };

// //   const isAdmin = me?.role === "admin" || me?.role === "manager";

// //   return (
// //     <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center justify-between h-20">
          
// //           {/* Logo */}
// //           <Link to="/" className="flex items-center gap-1 text-3xl font-bold tracking-tight">
// //             <span className="text-black">Male</span>
// //             <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">Fashion</span>
// //           </Link>

// //           {/* Desktop Navigation */}
// //           <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
// //             <NavLink to="/" end className={({ isActive }) => isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-yellow-600 transition-colors"}>Home</NavLink>
// //             <NavLink to="/shop" className={({ isActive }) => isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-yellow-600 transition-colors"}>Shop</NavLink>
// //             <NavLink to="/visualsearch" className={({ isActive }) => isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-yellow-600 transition-colors"}>Visual Search</NavLink>
// //             <NavLink to="/blog" className={({ isActive }) => isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-yellow-600 transition-colors"}>Blog</NavLink>
// //             <NavLink to="/contact" className={({ isActive }) => isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-yellow-600 transition-colors"}>Contact</NavLink>
// //           </nav>

// //           {/* Search Bar */}
// //           <div className="hidden md:block flex-1 max-w-md mx-8">
// //             <div className="relative">
// //               <input
// //                 type="text"
// //                 placeholder="Search products, brands..."
// //                 className="w-full px-5 py-3 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
// //               />
// //               <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</button>
// //             </div>
// //           </div>

// //           {/* Right Side */}
// //           <div className="flex items-center gap-5">
// //             {me?._id ? (
// //               <>
// //                 {/* Profile Link */}
// //                 <NavLink 
// //                   to="/profile" 
// //                   className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors"
// //                 >
// //                   👤 Profile
// //                 </NavLink>

// //                 <button 
// //                   onClick={doLogout}
// //                   className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
// //                 >
// //                   Sign Out
// //                 </button>
// //               </>
// //             ) : (
// //               <>
// //                 <NavLink to="/login" className="text-sm font-medium text-gray-700 hover:text-yellow-600">Login</NavLink>
// //                 <NavLink to="/register" className="text-sm font-medium bg-yellow-600 text-white px-5 py-2 rounded-full hover:bg-yellow-700 transition">Register</NavLink>
// //               </>
// //             )}

// //             {/* Cart & Wishlist - Only for Normal Users */}
// //             {!isAdmin && (
// //               <>
// //                 <NavLink to="/wishlist" className="p-2 text-gray-600 hover:text-red-500 transition">❤️</NavLink>
// //                 <NavLink to="/cart" className="relative p-2 text-gray-600 hover:text-yellow-600 transition">
// //                   🛒
// //                   {cartItems.length > 0 && (
// //                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
// //                       {cartItems.length}
// //                     </span>
// //                   )}
// //                 </NavLink>
// //               </>
// //             )}

// //             {/* Admin Dashboard */}
// //             {isAdmin && (
// //               <NavLink 
// //                 to="/admin" 
// //                 className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
// //               >
// //                 Dashboard
// //               </NavLink>
// //             )}
// //           </div>

// //           {/* Mobile Menu Button */}
// //           <button 
// //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// //             className="lg:hidden p-2 text-gray-700"
// //           >
// //             ☰
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       {isMenuOpen && (
// //         <div className="lg:hidden border-t bg-white py-4">
// //           <div className="px-6 space-y-4">
// //             <NavLink to="/" className="block py-3 text-lg">Home</NavLink>
// //             <NavLink to="/shop" className="block py-3 text-lg">Shop</NavLink>
// //             <NavLink to="/visualsearch" className="block py-3 text-lg">Visual Search</NavLink>
// //             <NavLink to="/blog" className="block py-3 text-lg">Blog</NavLink>

// //             {me?._id ? (
// //               <>
// //                 <NavLink to="/profile" className="block py-3 text-lg">👤 Profile</NavLink>
// //                 <button onClick={doLogout} className="w-full text-left py-3 text-red-500 font-medium">Sign Out</button>
// //               </>
// //             ) : (
// //               <>
// //                 <NavLink to="/login" className="block py-3 text-lg">Login</NavLink>
// //                 <NavLink to="/register" className="block py-3 text-lg">Register</NavLink>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </header>
// //   );
// // }





// // frontend/src/components/Header.jsx
// import React, { useMemo, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../store/userSlice.js";

// export default function Header() {
//   const { me } = useSelector((s) => s.user);
//   const cartItems = useSelector((s) => s.cart?.items || []);
//   const dispatch = useDispatch();
//   const nav = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const cartTotal = useMemo(() => 
//     cartItems.reduce((s, i) => s + (Number(i.price) || 0) * (i.qty || 1), 0),
//     [cartItems]
//   );

//   const doLogout = () => {
//     dispatch(logout());
//     nav("/profile");
//   };

//   const isAdmin = me?.role === "admin" || me?.role === "manager";
//   const isLoggedIn = !!me?._id;

//   return (
//     <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
          
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-1 text-3xl font-bold tracking-tight">
//             <span className="text-black">QuickKart</span>
//             <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">Fashion</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
//             <NavLink to="/" end className={({ isActive }) => isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-yellow-600"}>Home</NavLink>
//             <NavLink to="/shop" className={({ isActive }) => isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-yellow-600"}>Shop</NavLink>
//             <NavLink to="/visualsearch" className={({ isActive }) => isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-yellow-600"}>Visual Search</NavLink>
//             <NavLink to="/blog" className={({ isActive }) => isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-yellow-600"}>Blog</NavLink>
//             <NavLink to="/contact" className={({ isActive }) => isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-yellow-600"}>Contact</NavLink>
//           </nav>

//           {/* Search */}
//           <div className="hidden md:block flex-1 max-w-md mx-8">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products, brands..."
//                 className="w-full px-5 py-3 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               />
//               <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</button>
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="flex items-center gap-5">
//             {isLoggedIn ? (
//               <>
//                 <NavLink to="/profile" className="text-sm font-medium text-gray-700 hover:text-yellow-600">
//                   👤 Profile
//                 </NavLink>
//                 <button onClick={doLogout} className="text-sm text-red-500 hover:text-red-600 font-medium">Sign Out</button>
//               </>
//             ) : (
//               <>
//                 <NavLink to="/login" className="text-sm font-medium text-gray-700 hover:text-yellow-600">Login</NavLink>
//                 <NavLink to="/register" className="text-sm font-medium bg-yellow-600 text-white px-5 py-2 rounded-full hover:bg-yellow-700">Register</NavLink>
//               </>
//             )}

//             {/* Cart & Wishlist - ONLY for Logged-in Normal Users */}
//             {isLoggedIn && !isAdmin && (
//               <>
//                 <NavLink to="/wishlist" className="p-2 text-gray-600 hover:text-red-500 transition">❤️</NavLink>
//                 <NavLink to="/cart" className="relative p-2 text-gray-600 hover:text-yellow-600 transition">
//                   🛒
//                   {cartItems.length > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                       {cartItems.length}
//                     </span>
//                   )}
//                 </NavLink>
//               </>
//             )}

//             {/* Admin Dashboard */}
//             {isAdmin && (
//               <NavLink 
//                 to="/admin" 
//                 className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
//               >
//                 Dashboard
//               </NavLink>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button 
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="lg:hidden p-2 text-gray-700"
//           >
//             ☰
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="lg:hidden border-t bg-white py-4">
//           <div className="px-6 space-y-4">
//             <NavLink to="/" className="block py-3 text-lg">Home</NavLink>
//             <NavLink to="/shop" className="block py-3 text-lg">Shop</NavLink>
//             <NavLink to="/visualsearch" className="block py-3 text-lg">Visual Search</NavLink>
//             <NavLink to="/blog" className="block py-3 text-lg">Blog</NavLink>

//             {isLoggedIn && !isAdmin && (
//               <>
//                 <NavLink to="/wishlist" className="block py-3 text-lg">❤️ Wishlist</NavLink>
//                 <NavLink to="/cart" className="block py-3 text-lg">🛒 Cart ({cartItems.length})</NavLink>
//               </>
//             )}

//             {isAdmin && <NavLink to="/admin" className="block py-3 text-lg">📊 Dashboard</NavLink>}

//             {isLoggedIn ? (
//               <button onClick={doLogout} className="w-full text-left py-3 text-red-500 font-medium">Sign Out</button>
//             ) : (
//               <>
//                 <NavLink to="/login" className="block py-3 text-lg">Login</NavLink>
//                 <NavLink to="/register" className="block py-3 text-lg">Register</NavLink>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }





// frontend/src/components/Header.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice.js";

/* ---------- Inline SVG icons ----------
   Using real <svg> markup instead of unicode glyphs (⌕ ⚇ 🛍 etc.) because
   those characters render inconsistently across OS/browser font stacks —
   that's exactly what caused the broken "$" and mismatched emoji bag in
   the last version. SVGs always render the same everywhere. */

const SearchIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

const UserIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
  </svg>
);

const HeartIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 20s-7-4.4-9.3-8.8C1.3 8 2.7 5 6 5c2 0 3.4 1.1 4 2.2C10.6 6.1 12 5 14 5c3.3 0 4.7 3 3.3 6.2C19 15.6 12 20 12 20Z" />
  </svg>
);

const BagIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 7h12l1 14H5L6 7Z" />
    <path d="M9 7a3 3 0 0 1 6 0" />
  </svg>
);

const MenuIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export default function Header() {
  const { me } = useSelector((s) => s.user);
  const cartItems = useSelector((s) => s.cart?.items || []);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartTotal = useMemo(
    () => cartItems.reduce((s, i) => s + (Number(i.price) || 0) * (i.qty || 1), 0),
    [cartItems]
  );

  const doLogout = () => {
    dispatch(logout());
    nav("/profile");
  };

  const isAdmin = me?.role === "admin" || me?.role === "manager";
  const isLoggedIn = !!me?._id;

  const navLinkBase =
    "relative whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 py-2 " +
    "after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:bg-[#AD8A4D] " +
    "after:transition-all after:duration-300 hover:after:w-full";

  const navLinkClass = ({ isActive }) =>
    isActive
      ? `${navLinkBase} text-[#15171c] after:w-full`
      : `${navLinkBase} text-[#15171c]/70 hover:text-[#15171c]`;

  return (
    <header
      className={`sticky top-0 z-50 bg-[#F7F4EE] border-b border-[#15171c]/10 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_rgba(21,23,28,0.08)]" : ""
      }`}
    >
      <div className="max-w-16xl mx-auto px-8 sm:px-6 lg:px-10 ml-34">
        <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center h-20 gap-8 ml-4">

          {/* ============ LEFT: hamburger (mobile) + nav links (desktop) ============ */}
          <div className="flex items-center gap-8 lg:gap-7 min-w-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-[#15171c] transition-transform duration-200 active:scale-90"
              aria-label="Toggle menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
              <NavLink to="/" end className={navLinkClass}>Home</NavLink>
              <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
              <NavLink to="/visualsearch" className={navLinkClass}>Visual Search</NavLink>
              <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
              <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            </nav>
          </div>

          {/* ============ CENTER: Logo ============ */}
          <Link to="/" className="flex flex-col items-center justify-center leading-none group shrink-0">
            <span
              className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#15171c] whitespace-nowrap transition-transform duration-300 group-hover:scale-[1.02]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              QuickKart
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.4em] text-[#AD8A4D] uppercase mt-0.5 whitespace-nowrap">
              Fashion
            </span>
          </Link>

          {/* ============ RIGHT: search + icons ============ */}
          <div className="flex items-center justify-end gap-10 sm:gap-4 min-w-0">
            {/* Search — desktop/tablet only, same as original (md:block) */}
            <div className="hidden md:block w-full max-w-[400px] lg:max-w-[280px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, brands…"
                  className="w-full pl-4 pr-10 py-2.5 text-sm bg-[#EDEAE1] border border-transparent rounded-full
                    placeholder:text-[#15171c]/40 text-[#15171c]
                    transition-all duration-200
                    focus:outline-none focus:bg-white focus:border-[#AD8A4D]/60 focus:ring-2 focus:ring-[#AD8A4D]/15"
                />
                <SearchIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#15171c]/40 pointer-events-none" />
              </div>
            </div>

            {isLoggedIn ? (
              <>
                <NavLink
                  to="/profile"
                  className="hidden sm:flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-[#15171c]/75 hover:text-[#15171c] transition-colors duration-200"
                >
                  <UserIcon className="w-[18px] h-[18px]" />
                  <span className="hidden xl:inline">Profile</span>
                </NavLink>
                <button
                  onClick={doLogout}
                  className="hidden sm:inline whitespace-nowrap text-[13px] font-medium text-[#8C3A2E] hover:text-[#6e2e25] transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="hidden sm:inline whitespace-nowrap text-[13px] font-medium text-[#15171c]/75 hover:text-[#15171c] transition-colors duration-200"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="hidden sm:inline whitespace-nowrap text-[13px] font-semibold bg-[#15171c] text-white px-5 py-2 rounded-full
                    transition-all duration-200 hover:bg-[#2a2d36] hover:scale-[1.03] active:scale-[0.97]"
                >
                  Register
                </NavLink>
              </>
            )}

            {/* Cart & Wishlist — ONLY for logged-in normal users (unchanged condition) */}
            {isLoggedIn && !isAdmin && (
              <>
                <NavLink
                  to="/wishlist"
                  className="p-2 text-[#15171c]/70 transition-all duration-200 hover:text-[#8C3A2E] hover:scale-110"
                  aria-label="Wishlist"
                >
                  <HeartIcon className="w-[19px] h-[19px]" />
                </NavLink>
                <NavLink
                  to="/cart"
                  className="relative p-2 text-[#15171c]/70 transition-all duration-200 hover:text-[#AD8A4D] hover:scale-110"
                  aria-label="Cart"
                >
                  <BagIcon className="w-[19px] h-[19px]" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-[#8C3A2E] text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-[#F7F4EE]">
                      {cartItems.length}
                    </span>
                  )}
                </NavLink>
              </>
            )}

            {/* Admin Dashboard (unchanged condition) */}
            {isAdmin && (
              <NavLink
                to="/admin"
                className="whitespace-nowrap px-5 py-2 bg-[#15171c] text-white text-[13px] font-semibold rounded-full
                  transition-all duration-200 hover:bg-[#2a2d36] hover:scale-[1.03]"
              >
                Dashboard
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* ============ Mobile Menu (unchanged structure/links) ============ */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-[#15171c]/10 bg-[#F7F4EE] py-4">
          <div className="px-6 space-y-1">
            <NavLink to="/" className="block py-3 text-[15px] font-medium text-[#15171c] border-b border-[#15171c]/5">Home</NavLink>
            <NavLink to="/shop" className="block py-3 text-[15px] font-medium text-[#15171c] border-b border-[#15171c]/5">Shop</NavLink>
            <NavLink to="/visualsearch" className="block py-3 text-[15px] font-medium text-[#15171c] border-b border-[#15171c]/5">Visual Search</NavLink>
            <NavLink to="/blog" className="block py-3 text-[15px] font-medium text-[#15171c] border-b border-[#15171c]/5">Blog</NavLink>
            <NavLink to="/contact" className="block py-3 text-[15px] font-medium text-[#15171c] border-b border-[#15171c]/5">Contact</NavLink>

            {isLoggedIn && !isAdmin && (
              <>
                <NavLink to="/wishlist" className="flex items-center gap-2 py-3 text-[15px] font-medium text-[#15171c] border-b border-[#15171c]/5">
                  <HeartIcon className="w-4 h-4" /> Wishlist
                </NavLink>
                <NavLink to="/cart" className="flex items-center gap-2 py-3 text-[15px] font-medium text-[#15171c] border-b border-[#15171c]/5">
                  <BagIcon className="w-4 h-4" /> Cart ({cartItems.length})
                </NavLink>
              </>
            )}

            {isAdmin && (
              <NavLink to="/admin" className="block py-3 text-[15px] font-medium text-[#15171c] border-b border-[#15171c]/5">Dashboard</NavLink>
            )}

            {isLoggedIn ? (
              <button onClick={doLogout} className="w-full text-left py-3 text-[15px] font-medium text-[#8C3A2E]">
                Sign Out
              </button>
            ) : (
              <>
                <NavLink to="/login" className="block py-3 text-[15px] font-medium text-[#15171c] border-b border-[#15171c]/5">Login</NavLink>
                <NavLink to="/register" className="block py-3 text-[15px] font-medium text-[#15171c]">Register</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}