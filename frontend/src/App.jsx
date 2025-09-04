import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import Profile from './pages/Profile.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Products from './pages/admin/Products.jsx';
import ProductEdit from './pages/admin/ProductEdit.jsx';
import AdminOrders from './pages/admin/Orders.jsx';
import Coupons from './pages/admin/Coupons.jsx';
import AdminGuard from './components/AdminGuard.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import AdminSearch from './pages/admin/Search.jsx';
import InsertSimple from './pages/admin/InsertSimple.jsx';
import { useDispatch } from 'react-redux';
import { fetchMe } from './store/userSlice.js';
import Shop from './pages/Shop.jsx';
import VisualSearch from './components/VisualSearch.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Contact from './pages/Contact.jsx';

export default function App(){
  const dispatch = useDispatch();
  useEffect(()=>{ dispatch(fetchMe()); }, [dispatch]);

  const wrap = (node) => <AdminGuard><AdminLayout>{node}</AdminLayout></AdminGuard>;

  return (
    <div className="app">
      <Header/>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
            <Route path="/shop" element={<Shop/>}/>
          <Route path="/catalog" element={<Catalog/>}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
           <Route path="/visualsearch" element={<VisualSearch/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/admin" element={wrap(<Dashboard/>)} />
           <Route path="/blog" element={<Blog/>} />
  <Route path="/blog/:slug" element={<BlogPost/>} />
  <Route path="/contact" element={<Contact/>} />
          <Route path="/admin/products" element={wrap(<Products/>)} />
          <Route path="/admin/products/:id" element={wrap(<ProductEdit/>)} />
          <Route path="/admin/orders" element={wrap(<AdminOrders/>)} />
          <Route path="/admin/coupons" element={wrap(<Coupons/>)} />
          <Route path="/admin/search" element={wrap(<AdminSearch/>)} />
          <Route path="/admin/insert" element={wrap(<InsertSimple/>)} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}
