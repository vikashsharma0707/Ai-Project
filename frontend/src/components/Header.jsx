// // import React from 'react';
// // import { Link, NavLink } from 'react-router-dom';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { logout } from '../store/userSlice.js';

// // export default function Header(){
// //   const me = useSelector(s=>s.user.me);
// //   const cartCount = useSelector(s=>s.cart.items.reduce((s,i)=>s+i.qty,0));
// //   const dispatch = useDispatch();
// //   return (
// //     <header className="topbar">
// //       <div className="container row space">
// //         <Link to="/" className="logo">Clothes Shopping Online</Link>
// //         <nav className="nav">
// //           <NavLink to="/">Home</NavLink>
// //           <NavLink to="/catalog">Shop</NavLink>
// //           <NavLink to="/orders">My Orders</NavLink>
// //           {me?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
// //         </nav>
// //         <div className="nav">
// //           {!me && <NavLink to="/profile">Login</NavLink>}
// //           {me && <button className="link" onClick={()=>dispatch(logout())}>Logout</button>}
// //           <NavLink to="/cart">🛒 {cartCount}</NavLink>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }


// import React from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../store/userSlice.js";
// // import "./Header.css";

// export default function Header(){
//   const { me } = useSelector(s => s.user);
//   const dispatch = useDispatch();
//   const nav = useNavigate();

//   const doLogout = () => {
//     dispatch(logout());
//     nav("/profile");
//   };

//   return (
//     <header className="header">
//       <div className="container row space">
//         <Link className="brand" to="/">Clothes Shopping Online</Link>

//         <nav className="row gap">
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/shop">Shop</NavLink>
          
//           <NavLink to="/orders">My Orders</NavLink>
//           {me?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
//         </nav>

//         <div className="row gap">
//           {me?._id ? (
//             <>
//               <span title={me.email}>Hello, <b>{me.name}</b> ({me.role})</span>
//               <button className="link" onClick={doLogout}>Logout</button>
//             </>
//           ) : (
//             <NavLink to="/profile">Login</NavLink>
//           )}
//           <NavLink to="/cart" aria-label="Cart">🛒</NavLink>
//         </div>
//       </div>
//     </header>
//   );
// }


import React, { useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice.js";
import "./Header.css";

export default function Header() {
  const { me } = useSelector((s) => s.user);
  const cartItems = useSelector((s) => s.cart?.items || []);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const cartTotal = useMemo(
    () => cartItems.reduce((s, i) => s + (Number(i.price) || 0) * (i.qty || 1), 0),
    [cartItems]
  );

  const doLogout = () => {
    dispatch(logout());
    nav("/profile");
  };

  return (
    <header className="site-header">
      <div className="container header-row">
        {/* Left: Brand */}
        <div className="left">
          <Link className="brand" to="/">Male <span>Fashion</span></Link>
        </div>

        {/* Center: Nav + categories + search */}
        <div className="center">
          <nav className="main-nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
             <NavLink to="/orders">Orders</NavLink>
             <NavLink to="/visualsearch">Visual Search</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contacts</NavLink>

            <div className="nav-dropdown">
              <button className="drop-btn" aria-haspopup="true" aria-expanded="false">
                Shop by Categories ▾
              </button>
              <div className="drop-menu">
                <Link to="/shop?cat=mens">Men</Link>
                <Link to="/shop?cat=womens">Women</Link>
                <Link to="/shop?cat=kids">Kids</Link>
                <Link to="/shop?cat=accessories">Accessories</Link>
              </div>
            </div>
          </nav>

          <form className="nav-search" onSubmit={(e) => e.preventDefault()}>
            <input type="search" placeholder="Search…" aria-label="Search products" />
            <button aria-label="Search">🔍</button>
          </form>
        </div>

        {/* Right: Account / Cart / Wishlist / Dashboard */}
        <div className="right">
          {me?._id ? (
            <>
              <NavLink to="/profile" className="muted">My Account</NavLink>
              <button className="link-btn" onClick={doLogout}>Sign Out</button>
            </>
          ) : (
            <NavLink to="/profile" className="muted">Login</NavLink>
          )}

          <NavLink to="/cart" className="cart-link" aria-label="Cart">
            <span className="cart-ico" aria-hidden>🛒</span>
            <span className="cart-total">₹{cartTotal.toLocaleString("en-IN")}</span>
          </NavLink>

          <NavLink to="/wishlist" className="wish-link" aria-label="Wishlist">❤️</NavLink>

          {(me?.role === "admin" || me?.role === "manager") && (
            <NavLink to="/admin" className="muted">Dashboard</NavLink>
          )}
        </div>

        {/* Mobile burger */}
        <input id="nav-toggle" type="checkbox" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="burger" aria-label="Toggle menu">☰</label>
      </div>

      {/* Mobile drawer */}
      <div className="mobile-drawer">
        <nav className="mobile-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contacts">Contacts</NavLink>
           <NavLink to="/VisualSearch">VisualSearch</NavLink>
          <details>
            <summary>Shop by Categories</summary>
            <div className="mob-cats">
              <Link to="/shop?cat=mens">Men</Link>
              <Link to="/shop?cat=womens">Women</Link>
              <Link to="/shop?cat=kids">Kids</Link>
              <Link to="/shop?cat=accessories">Accessories</Link>
            </div>
          </details>
          <div className="mob-actions">
            {me?._id ? (
              <>
                <NavLink to="/profile">My Account</NavLink>
                <button className="link-btn" onClick={doLogout}>Sign Out</button>
              </>
            ) : (
              <NavLink to="/profile">Login</NavLink>
            )}
            {(me?.role === "admin" || me?.role === "manager") && (
              <NavLink to="/admin">Dashboard</NavLink>
            )}
            <NavLink to="/cart">Cart – ₹{cartTotal.toLocaleString("en-IN")}</NavLink>
            <NavLink to="/wishlist">Wishlist</NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
