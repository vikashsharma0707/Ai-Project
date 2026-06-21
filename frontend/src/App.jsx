// import React, { useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Header from './components/Header.jsx';
// import Footer from './components/Footer.jsx';
// import Home from './pages/Home.jsx';
// import Catalog from './pages/Catalog.jsx';
// import ProductDetail from './pages/ProductDetail.jsx';
// import Cart from './pages/Cart.jsx';
// import Wishlist from './pages/Wishlist.jsx';
// import Checkout from './pages/Checkout.jsx';
// import Orders from './pages/Orders.jsx';
// import Profile from './pages/Profile.jsx';
// import Dashboard from './pages/admin/Dashboard.jsx';
// import Products from './pages/admin/Products.jsx';
// import ProductEdit from './pages/admin/ProductEdit.jsx';
// import AdminOrders from './pages/admin/Orders.jsx';
// import Coupons from './pages/admin/Coupons.jsx';
// import AdminGuard from './components/AdminGuard.jsx';
// import AdminLayout from './components/AdminLayout.jsx';
// import AdminSearch from './pages/admin/Search.jsx';
// import InsertSimple from './pages/admin/InsertSimple.jsx';
// import { useDispatch } from 'react-redux';
// import { fetchMe } from './store/userSlice.js';
// import Shop from './pages/Shop.jsx';
// import VisualSearch from './components/VisualSearch.jsx';
// import Blog from './pages/Blog.jsx';
// import BlogPost from './pages/BlogPost.jsx';
// import Contact from './pages/Contact.jsx';
// import FloatingChatButton from './components/FloatingChatButton.jsx';
// import AdminAIAgents from './pages/admin/AdminAi/AdminAIAgents.jsx';
// import AIHistory from './pages/admin/AdminAi/AIHistory.jsx';

// export default function App(){
//   const dispatch = useDispatch();
//   useEffect(()=>{ dispatch(fetchMe()); }, [dispatch]);

//   const wrap = (node) => <AdminGuard><AdminLayout>{node}</AdminLayout></AdminGuard>;

//   return (
//     <div className="app">
//       <Header/>
//       <main className="container">
//         <Routes>
//           <Route path="/" element={<Home/>}/>
//             <Route path="/shop" element={<Shop/>}/>
//           <Route path="/catalog" element={<Catalog/>}/>
//           <Route path="/product/:id" element={<ProductDetail/>}/>
//            <Route path="/visualsearch" element={<VisualSearch/>}/>
//           <Route path="/cart" element={<Cart/>}/>
//           <Route path="/wishlist" element={<Wishlist/>}/>
//           <Route path="/checkout" element={<Checkout/>}/>
//           <Route path="/orders" element={<Orders/>}/>
//           <Route path="/profile" element={<Profile/>}/>
//           <Route path="/admin" element={wrap(<Dashboard/>)} />
//            <Route path="/blog" element={<Blog/>} />
//   <Route path="/blog/:slug" element={<BlogPost/>} />
//   <Route path="/contact" element={<Contact/>} />
//           <Route path="/admin/products" element={wrap(<Products/>)} />
//           <Route path="/admin/products/:id" element={wrap(<ProductEdit/>)} />
//           <Route path="/admin/orders" element={wrap(<AdminOrders/>)} />
//           <Route path="/admin/coupons" element={wrap(<Coupons/>)} />
//           <Route path="/admin/search" element={wrap(<AdminSearch/>)} />
//           <Route path="/admin/insert" element={wrap(<InsertSimple/>)} />
//           <Route path="/admin/agents" element={wrap(<AdminAIAgents/>)} />
//            <Route path="/admin/history" element={wrap(<AIHistory/>)} />
//         </Routes>
//       </main>
//       <FloatingChatButton/>
//       <Footer/>
//     </div>
//   );
// }




// frontend/src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMe } from './store/userSlice.js';

// Layouts
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import AdminGuard from './components/AdminGuard.jsx';

// User Pages
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Catalog from './pages/Catalog.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import Profile from './pages/Profile.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Contact from './pages/Contact.jsx';
import VisualSearch from './components/VisualSearch.jsx';

// Admin Pages
import Dashboard from './pages/admin/Dashboard.jsx';
import Products from './pages/admin/Products.jsx';
import ProductEdit from './pages/admin/ProductEdit.jsx';
import AdminOrders from './pages/admin/Orders.jsx';
import Coupons from './pages/admin/Coupons.jsx';
import AdminSearch from './pages/admin/Search.jsx';
import InsertSimple from './pages/admin/InsertSimple.jsx';
import AdminAIAgents from './pages/admin/AdminAi/AdminAIAgents.jsx';
import AIHistory from './pages/admin/AdminAi/AIHistory.jsx';

// Components
import FloatingChatButton from './components/FloatingChatButton.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  // Admin Route Wrapper
  const AdminRoute = ({ children }) => (
    <AdminGuard>
      <AdminLayout>{children}</AdminLayout>
    </AdminGuard>
  );

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Routes>
          {/* ====================== PUBLIC / USER ROUTES ====================== */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/visualsearch" element={<VisualSearch />} />
          
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />

          {/* ====================== ADMIN ROUTES ====================== */}
          <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><Products /></AdminRoute>} />
          <Route path="/admin/products/:id" element={<AdminRoute><ProductEdit /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
          <Route path="/admin/coupons" element={<AdminRoute><Coupons /></AdminRoute>} />
          <Route path="/admin/search" element={<AdminRoute><AdminSearch /></AdminRoute>} />
          <Route path="/admin/insert" element={<AdminRoute><InsertSimple /></AdminRoute>} />
          
          {/* AI Agents */}
          <Route path="/admin/agents" element={<AdminRoute><AdminAIAgents /></AdminRoute>} />
          <Route path="/admin/history" element={<AdminRoute><AIHistory /></AdminRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* User-only Floating Chatbot (Not shown in Admin) */}
      <FloatingChatButton />

      <Footer />
    </div>
  );
}