// // // // import React, { useEffect, useState } from "react";
// // // // import SmartSearchBar from "../components/SmartSearchBar.jsx";
// // // // import VisualSearch from "../components/VisualSearch.jsx";
// // // // import http from "../api/http.js";
// // // // import { ENDPOINTS } from "../api/endpoints.js";
// // // // import ProductCard from "../components/ProductCard.jsx";

// // // // export default function Home() {
// // // //   const [trending, setTrending] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [err, setErr] = useState("");

// // // //   useEffect(() => {
// // // //     (async () => {
// // // //       try {
// // // //         const { data } = await http.get(`${ENDPOINTS.products.base}?limit=8&sort=popular`);
// // // //         setTrending(data?.items || []);
// // // //       } catch (e) {
// // // //         console.error(e);
// // // //         setErr("Failed to load trending products");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     })();
// // // //   }, []);

// // // //   return (
// // // //     <div>
// // // //       <SmartSearchBar />

// // // //       <h2>Our Trending Collections</h2>
// // // //       {loading && <div className="muted">Loading…</div>}
// // // //       {err && <div className="muted">{err}</div>}
// // // //       <div className="grid">
// // // //         {trending.map((p, i) => (
// // // //           <ProductCard key={p._id || p.id || i} product={p} /> 
// // // //         ))}
// // // //       </div>

// // // //       <h2>Visual Search</h2>
// // // //       <VisualSearch category="men" /> {/* 'men'/'women'/'kids' best */}
// // // //     </div>
// // // //   );
// // // // }


// // // import React, { useEffect, useState } from "react";
// // // import SmartSearchBar from "../components/SmartSearchBar.jsx";
// // // import VisualSearch from "../components/VisualSearch.jsx";
// // // import http from "../api/http.js";
// // // import { ENDPOINTS } from "../api/endpoints.js";
// // // import ProductCard from "../components/ProductCard.jsx";

// // // export default function Home() {
// // //   const [trending, setTrending] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     (async () => {
// // //       try {
// // //         const { data } = await http.get(`${ENDPOINTS.products.base}?limit=8&sort=popular`);
// // //         setTrending(data?.items || []);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     })();
// // //   }, []);

// // //   return (
// // //     <div className="container home">
// // //       <SmartSearchBar />

// // //       <h2 className="section-title">Our Trending Collections</h2>
// // //       {loading && <div className="muted">Loading…</div>}
// // //       <div className="grid products-grid">
// // //         {trending.map((p, i) => (
// // //           <ProductCard key={p._id || p.id || i} product={p} />
// // //         ))}
// // //       </div>

// // //       <h2 className="section-title">Visual Search</h2>
// // //       <VisualSearch category="men" />
// // //     </div>
// // //   );
// // // }

// // // src/pages/Home.jsx
// // import React, { useEffect, useState } from "react";
// // import SmartSearchBar from "../components/SmartSearchBar.jsx";
// // import VisualSearch from "../components/VisualSearch.jsx";
// // import http from "../api/http.js";
// // import { ENDPOINTS } from "../api/endpoints.js";
// // import ProductCard from "../components/ProductCard.jsx";
// // import BannerCarousel from "../components/BannerCarousel.jsx"; // ⬅️ add

// // export default function Home() {
// //   const [trending, setTrending] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const { data } = await http.get(
// //           `${ENDPOINTS.products.base}?limit=8&sort=popular`
// //         );
// //         setTrending(data?.items || []);
// //       } finally {
// //         setLoading(false);
// //       }
// //     })();
// //   }, []);

// //   // 4 banners (images ko public/banners/ me rakho)
// //   const banners = [
// //     {
// //       img: "/banners/gel-rocket-12.jpg",
// //       title: "GEL ROCKET 12",
// //       sub: "Gel cushioning • Game-ready grip",
// //       cta: "SHOP NOW",
// //       href: "/shop?category=shoes",
// //       badge: "ASICS",
// //     },
// //     {
// //       img: "/banners/men-summer.jpg",
// //       title: "SUMMER ESSENTIALS",
// //       sub: "Linen shirts & breezy chinos",
// //       cta: "Explore",
// //       href: "/shop?category=men",
// //       badge: "NEW",
// //     },
// //     {
// //       img: "/banners/women-festive.jpg",
// //       title: "FESTIVE EDIT",
// //       sub: "Vibrant kurtas & sets",
// //       cta: "Shop Festive",
// //       href: "/shop?category=women",
// //     },
// //     {
// //       img: "/banners/accessories-sale.jpg",
// //       title: "ACCESSORIES SALE",
// //       sub: "Up to 40% off",
// //       cta: "Grab Deals",
// //       href: "/shop?category=accessories",
// //     },
// //   ];

// //   return (
// //     <div className="container home"   style={{width:"100%"}}>
// //       <SmartSearchBar />

// //       {/* 🔥 New: Banner Carousel with arrows + dots */}
// //       <BannerCarousel banners={banners} auto interval={5500} />

// //       <h2 className="section-title">Our Trending Collections</h2>
// //       {loading && <div className="muted">Loading…</div>}
// //       <div className="grid products-grid">
// //         {trending.map((p, i) => (
// //           <ProductCard key={p._id || p.id || i} product={p} />
// //         ))}
// //       </div>

// //       <h2 className="section-title">Visual Search</h2>
// //       <VisualSearch category="men" />
// //     </div>
// //   );
// // }


// // src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import SmartSearchBar from "../components/SmartSearchBar.jsx";
import VisualSearch from "../components/VisualSearch.jsx";
import http from "../api/http.js";
import { ENDPOINTS } from "../api/endpoints.js";
import ProductCard from "../components/ProductCard.jsx";
import BannerCarousel from "../components/BannerCarousel.jsx";
import "./Home.css";
// images
import b1 from "../images/b1.jpg";
import b2 from "../images/b2.jpg";
import b3 from "../images/b3.jpg";
import b4 from "../images/b4.jpg";

import CategoryCircles from "../components/CategoryCircles.jsx";
import c1 from "../images/b1.jpg";
import c2 from "../images/b1.jpg";
import c3 from "../images/b1.jpg";
import c4 from "../images/b1.jpg";
import c5 from "../images/b1.jpg";
import c6 from "../images/b1.jpg";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await http.get(
          `${ENDPOINTS.products.base}?limit=8&sort=popular`
        );
        setTrending(data?.items || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

// Banners
  const banners = [
    {
      img: b1,
      title: "GEL ROCKET 12",
      sub: "Gel cushioning • Game-ready grip",
      cta: "SHOP NOW",
      href: "/shop?category=shoes",
      badge: "ASICS",
    },
    {
      img: b2,
      title: "SUMMER ESSENTIALS",
      sub: "Linen shirts & breezy chinos",
      cta: "Explore",
      href: "/shop?category=men",
      badge: "NEW",
    },
    {
      img: b3,
      title: "FESTIVE EDIT",
      sub: "Vibrant kurtas & sets",
      cta: "Shop Festive",
      href: "/shop?category=women",
    },
    {
      img: b4,
      title: "ACCESSORIES SALE",
      sub: "Up to 40% off",
      cta: "Grab Deals",
      href: "/shop?category=accessories",
    },
  ];


  return (
    <div className="home-wrap">
      <div className="home-container">
        <SmartSearchBar />
      </div>

      {/* Hero Carousel */}
      <BannerCarousel banners={banners} auto interval={5500} />

      {/* Trending */}
      <section className="home-section">
        <div className="home-container">
          <header className="sec-head">
            <h2 className="sec-title">Our Trending Collections</h2>
            <p className="sec-sub">Most-loved picks curated for you</p>
          </header>

          {loading ? (
            <div className="grid products-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div className="pc skeleton" key={i}>
                  <div className="pc-media sk-media" />
                  <div className="pc-body sk-body">
                    <div className="sk-line w40" />
                    <div className="sk-line w80" />
                    <div className="sk-line w60" />
                    <div className="sk-btns">
                      <div className="sk-btn" />
                      <div className="sk-btn" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid products-grid">
              {trending.map((p, i) => (
                <ProductCard key={p._id || p.id || i} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Visual Search */}
      <section className="home-section">
        <div className="home-container">
          <header className="sec-head">
            <h2 className="sec-title">Visual Search</h2>
            <p className="sec-sub">Snap or upload to find similar styles</p>
          </header>

          <VisualSearch category="men" />
        </div>
      </section>



      <CategoryCircles
  items={[
    { title: "Shirts",            img: c1, to: "/shop?category=shirts" },
    { title: "T-Shirts",          img: c2, to: "/shop?category=tshirts" },
    { title: "Jeans",             img: c3, to: "/shop?category=jeans" },
    { title: "Shorts & Trousers", img: c4, to: "/shop?category=bottoms" },
    { title: "Casual Shoes",      img: c5, to: "/shop?category=shoes" },
    { title: "Infant Essentials", img: c6, to: "/shop?category=infant" },
  ]}
/>
    </div>
  );
}


