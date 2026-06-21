// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import SmartSearchBar from "../components/SmartSearchBar.jsx";
// // // // // // // import VisualSearch from "../components/VisualSearch.jsx";
// // // // // // // import http from "../api/http.js";
// // // // // // // import { ENDPOINTS } from "../api/endpoints.js";
// // // // // // // import ProductCard from "../components/ProductCard.jsx";

// // // // // // // export default function Home() {
// // // // // // //   const [trending, setTrending] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [err, setErr] = useState("");

// // // // // // //   useEffect(() => {
// // // // // // //     (async () => {
// // // // // // //       try {
// // // // // // //         const { data } = await http.get(`${ENDPOINTS.products.base}?limit=8&sort=popular`);
// // // // // // //         setTrending(data?.items || []);
// // // // // // //       } catch (e) {
// // // // // // //         console.error(e);
// // // // // // //         setErr("Failed to load trending products");
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     })();
// // // // // // //   }, []);

// // // // // // //   return (
// // // // // // //     <div>
// // // // // // //       <SmartSearchBar />

// // // // // // //       <h2>Our Trending Collections</h2>
// // // // // // //       {loading && <div className="muted">Loading…</div>}
// // // // // // //       {err && <div className="muted">{err}</div>}
// // // // // // //       <div className="grid">
// // // // // // //         {trending.map((p, i) => (
// // // // // // //           <ProductCard key={p._id || p.id || i} product={p} /> 
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       <h2>Visual Search</h2>
// // // // // // //       <VisualSearch category="men" /> {/* 'men'/'women'/'kids' best */}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }


// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import SmartSearchBar from "../components/SmartSearchBar.jsx";
// // // // // // import VisualSearch from "../components/VisualSearch.jsx";
// // // // // // import http from "../api/http.js";
// // // // // // import { ENDPOINTS } from "../api/endpoints.js";
// // // // // // import ProductCard from "../components/ProductCard.jsx";

// // // // // // export default function Home() {
// // // // // //   const [trending, setTrending] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   useEffect(() => {
// // // // // //     (async () => {
// // // // // //       try {
// // // // // //         const { data } = await http.get(`${ENDPOINTS.products.base}?limit=8&sort=popular`);
// // // // // //         setTrending(data?.items || []);
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     })();
// // // // // //   }, []);

// // // // // //   return (
// // // // // //     <div className="container home">
// // // // // //       <SmartSearchBar />

// // // // // //       <h2 className="section-title">Our Trending Collections</h2>
// // // // // //       {loading && <div className="muted">Loading…</div>}
// // // // // //       <div className="grid products-grid">
// // // // // //         {trending.map((p, i) => (
// // // // // //           <ProductCard key={p._id || p.id || i} product={p} />
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       <h2 className="section-title">Visual Search</h2>
// // // // // //       <VisualSearch category="men" />
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // src/pages/Home.jsx
// // // // // import React, { useEffect, useState } from "react";
// // // // // import SmartSearchBar from "../components/SmartSearchBar.jsx";
// // // // // import VisualSearch from "../components/VisualSearch.jsx";
// // // // // import http from "../api/http.js";
// // // // // import { ENDPOINTS } from "../api/endpoints.js";
// // // // // import ProductCard from "../components/ProductCard.jsx";
// // // // // import BannerCarousel from "../components/BannerCarousel.jsx"; // ⬅️ add

// // // // // export default function Home() {
// // // // //   const [trending, setTrending] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   useEffect(() => {
// // // // //     (async () => {
// // // // //       try {
// // // // //         const { data } = await http.get(
// // // // //           `${ENDPOINTS.products.base}?limit=8&sort=popular`
// // // // //         );
// // // // //         setTrending(data?.items || []);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     })();
// // // // //   }, []);

// // // // //   // 4 banners (images ko public/banners/ me rakho)
// // // // //   const banners = [
// // // // //     {
// // // // //       img: "/banners/gel-rocket-12.jpg",
// // // // //       title: "GEL ROCKET 12",
// // // // //       sub: "Gel cushioning • Game-ready grip",
// // // // //       cta: "SHOP NOW",
// // // // //       href: "/shop?category=shoes",
// // // // //       badge: "ASICS",
// // // // //     },
// // // // //     {
// // // // //       img: "/banners/men-summer.jpg",
// // // // //       title: "SUMMER ESSENTIALS",
// // // // //       sub: "Linen shirts & breezy chinos",
// // // // //       cta: "Explore",
// // // // //       href: "/shop?category=men",
// // // // //       badge: "NEW",
// // // // //     },
// // // // //     {
// // // // //       img: "/banners/women-festive.jpg",
// // // // //       title: "FESTIVE EDIT",
// // // // //       sub: "Vibrant kurtas & sets",
// // // // //       cta: "Shop Festive",
// // // // //       href: "/shop?category=women",
// // // // //     },
// // // // //     {
// // // // //       img: "/banners/accessories-sale.jpg",
// // // // //       title: "ACCESSORIES SALE",
// // // // //       sub: "Up to 40% off",
// // // // //       cta: "Grab Deals",
// // // // //       href: "/shop?category=accessories",
// // // // //     },
// // // // //   ];

// // // // //   return (
// // // // //     <div className="container home"   style={{width:"100%"}}>
// // // // //       <SmartSearchBar />

// // // // //       {/* 🔥 New: Banner Carousel with arrows + dots */}
// // // // //       <BannerCarousel banners={banners} auto interval={5500} />

// // // // //       <h2 className="section-title">Our Trending Collections</h2>
// // // // //       {loading && <div className="muted">Loading…</div>}
// // // // //       <div className="grid products-grid">
// // // // //         {trending.map((p, i) => (
// // // // //           <ProductCard key={p._id || p.id || i} product={p} />
// // // // //         ))}
// // // // //       </div>

// // // // //       <h2 className="section-title">Visual Search</h2>
// // // // //       <VisualSearch category="men" />
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // // src/pages/Home.jsx
// // // import React, { useEffect, useState } from "react";
// // // import SmartSearchBar from "../components/SmartSearchBar.jsx";
// // // import VisualSearch from "../components/VisualSearch.jsx";
// // // import http from "../api/http.js";
// // // import { ENDPOINTS } from "../api/endpoints.js";
// // // import ProductCard from "../components/ProductCard.jsx";
// // // import BannerCarousel from "../components/BannerCarousel.jsx";
// // // import "./Home.css";
// // // // images
// // // import b1 from "../images/b1.jpg";
// // // import b2 from "../images/b2.jpg";
// // // import b3 from "../images/b3.jpg";
// // // import b4 from "../images/b4.jpg";

// // // import CategoryCircles from "../components/CategoryCircles.jsx";
// // // import c1 from "../images/b1.jpg";
// // // import c2 from "../images/b1.jpg";
// // // import c3 from "../images/b1.jpg";
// // // import c4 from "../images/b1.jpg";
// // // import c5 from "../images/b1.jpg";
// // // import c6 from "../images/b1.jpg";

// // // export default function Home() {
// // //   const [trending, setTrending] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     (async () => {
// // //       try {
// // //         const { data } = await http.get(
// // //           `${ENDPOINTS.products.base}?limit=8&sort=popular`
// // //         );
// // //         setTrending(data?.items || []);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     })();
// // //   }, []);

// // // // Banners
// // //   const banners = [
// // //     {
// // //       img: b1,
// // //       title: "GEL ROCKET 12",
// // //       sub: "Gel cushioning • Game-ready grip",
// // //       cta: "SHOP NOW",
// // //       href: "/shop?category=shoes",
// // //       badge: "ASICS",
// // //     },
// // //     {
// // //       img: b2,
// // //       title: "SUMMER ESSENTIALS",
// // //       sub: "Linen shirts & breezy chinos",
// // //       cta: "Explore",
// // //       href: "/shop?category=men",
// // //       badge: "NEW",
// // //     },
// // //     {
// // //       img: b3,
// // //       title: "FESTIVE EDIT",
// // //       sub: "Vibrant kurtas & sets",
// // //       cta: "Shop Festive",
// // //       href: "/shop?category=women",
// // //     },
// // //     {
// // //       img: b4,
// // //       title: "ACCESSORIES SALE",
// // //       sub: "Up to 40% off",
// // //       cta: "Grab Deals",
// // //       href: "/shop?category=accessories",
// // //     },
// // //   ];


// // //   return (
// // //     <div className="home-wrap">
// // //       <div className="home-container">
// // //         <SmartSearchBar />
// // //       </div>

// // //       {/* Hero Carousel */}
// // //       <BannerCarousel banners={banners} auto interval={5500} />

// // //       {/* Trending */}
// // //       <section className="home-section">
// // //         <div className="home-container">
// // //           <header className="sec-head">
// // //             <h2 className="sec-title">Our Trending Collections</h2>
// // //             <p className="sec-sub">Most-loved picks curated for you</p>
// // //           </header>

// // //           {loading ? (
// // //             <div className="grid products-grid">
// // //               {Array.from({ length: 8 }).map((_, i) => (
// // //                 <div className="pc skeleton" key={i}>
// // //                   <div className="pc-media sk-media" />
// // //                   <div className="pc-body sk-body">
// // //                     <div className="sk-line w40" />
// // //                     <div className="sk-line w80" />
// // //                     <div className="sk-line w60" />
// // //                     <div className="sk-btns">
// // //                       <div className="sk-btn" />
// // //                       <div className="sk-btn" />
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           ) : (
// // //             <div className="grid products-grid">
// // //               {trending.map((p, i) => (
// // //                 <ProductCard key={p._id || p.id || i} product={p} />
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </section>

// // //       {/* Visual Search */}
// // //       <section className="home-section">
// // //         <div className="home-container">
// // //           <header className="sec-head">
// // //             <h2 className="sec-title">Visual Search</h2>
// // //             <p className="sec-sub">Snap or upload to find similar styles</p>
// // //           </header>

// // //           <VisualSearch category="men" />
// // //         </div>
// // //       </section>



// // //       <CategoryCircles
// // //   items={[
// // //     { title: "Shirts",            img: c1, to: "/shop?category=shirts" },
// // //     { title: "T-Shirts",          img: c2, to: "/shop?category=tshirts" },
// // //     { title: "Jeans",             img: c3, to: "/shop?category=jeans" },
// // //     { title: "Shorts & Trousers", img: c4, to: "/shop?category=bottoms" },
// // //     { title: "Casual Shoes",      img: c5, to: "/shop?category=shoes" },
// // //     { title: "Infant Essentials", img: c6, to: "/shop?category=infant" },
// // //   ]}
// // // />
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
// // import BannerCarousel from "../components/BannerCarousel.jsx";
// // // images
// // import b1 from "../images/b1.jpg";
// // import b2 from "../images/b2.jpg";
// // import b3 from "../images/b3.jpg";
// // import b4 from "../images/b4.jpg";

// // import CategoryCircles from "../components/CategoryCircles.jsx";
// // import c1 from "../images/c1.jpg";
// // import c2 from "../images/c2.jpg";
// // import c3 from "../images/c3.jpg";
// // import c4 from "../images/c4.jpg";
// // import c5 from "../images/c5.jpg";
// // import c6 from "../images/c6.jpg";
// // import c7 from "../images/c7.jpg";
// // import c7 from "../images/c8.jpg";

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

// //   // Banners
// //   const banners = [
// //     {
// //       img: b1,
// //       title: "GEL ROCKET 12",
// //       sub: "Gel cushioning • Game-ready grip",
// //       cta: "SHOP NOW",
// //       href: "/shop?category=shoes",
// //       badge: "ASICS",
// //     },
// //     {
// //       img: b2,
// //       title: "SUMMER ESSENTIALS",
// //       sub: "Linen shirts & breezy chinos",
// //       cta: "Explore",
// //       href: "/shop?category=men",
// //       badge: "NEW",
// //     },
// //     {
// //       img: b3,
// //       title: "FESTIVE EDIT",
// //       sub: "Vibrant kurtas & sets",
// //       cta: "Shop Festive",
// //       href: "/shop?category=women",
// //     },
// //     {
// //       img: b4,
// //       title: "ACCESSORIES SALE",
// //       sub: "Up to 40% off",
// //       cta: "Grab Deals",
// //       href: "/shop?category=accessories",
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-neutral-50">
// //       {/* Sticky search bar */}
// //       <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-neutral-200 shadow-sm">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
// //           <SmartSearchBar />
// //         </div>
// //       </div>

// //       {/* Hero Carousel */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
// //         <div className="rounded-2xl overflow-hidden shadow-md">
// //           <BannerCarousel banners={banners} auto interval={5500} />
// //         </div>
// //       </div>



// //       {/* Category Circles */}
// //       <section className="py-10 sm:py-14">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <header className="flex flex-col items-center text-center mb-8">
// //             <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
// //               Shop by Category
// //             </h2>
// //             <div className="h-1 w-16 bg-rose-600 rounded-full mt-4" />
// //           </header>

// //           <CategoryCircles
// //             items={[
// //               { title: "Shirts", img: c1, to: "/shop?category=shirts" },
// //               { title: "T-Shirts", img: c2, to: "/shop?category=tshirts" },
// //               { title: "Jeans", img: c3, to: "/shop?category=jeans" },
// //               {
// //                 title: "Shorts & Trousers",
// //                 img: c4,
// //                 to: "/shop?category=bottoms",
// //               },
// //               // { title: "Casual Shoes", img: c5, to: "/shop?category=shoes" },
// //               //  { title: "kids wear", img: c7, to: "/shop?category=kids" },
// //               //   { title: "sports", img: c8, to: "/shop?category=sports" },
// //               {
// //                 title: "Infant Essentials",
// //                 img: c6,
// //                 to: "/shop?category=infant",
// //               },


// //             ]}
// //           />
// //         </div>
// //       </section>

// //       {/* Trending */}
// //       <section className="py-10 sm:py-14">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <header className="flex flex-col items-center text-center mb-8">
// //             <span className="text-xs font-semibold tracking-[0.2em] text-rose-600 uppercase mb-2">
// //               Curated For You
// //             </span>
// //             <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
// //               Our Trending Collections
// //             </h2>
// //             <p className="text-sm sm:text-base text-neutral-500 mt-1">
// //               Most-loved picks curated for you
// //             </p>
// //             <div className="h-1 w-16 bg-rose-600 rounded-full mt-4" />
// //           </header>

// //           {loading ? (
// //             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
// //               {Array.from({ length: 8 }).map((_, i) => (
// //                 <div
// //                   key={i}
// //                   className="rounded-xl bg-white border border-neutral-200 overflow-hidden animate-pulse"
// //                 >
// //                   <div className="aspect-[3/4] bg-neutral-200" />
// //                   <div className="p-3 space-y-2">
// //                     <div className="h-3 w-2/5 bg-neutral-200 rounded" />
// //                     <div className="h-3 w-4/5 bg-neutral-200 rounded" />
// //                     <div className="h-3 w-3/5 bg-neutral-200 rounded" />
// //                     <div className="flex gap-2 pt-2">
// //                       <div className="h-8 flex-1 bg-neutral-200 rounded-lg" />
// //                       <div className="h-8 flex-1 bg-neutral-200 rounded-lg" />
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
// //               {trending.map((p, i) => (
// //                 <div
// //                   key={p._id || p.id || i}
// //                   className="rounded-xl bg-white border border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
// //                 >
// //                   <ProductCard product={p} />
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </section>

     

      
// //     </div>
// //   );
// // }






// // src/pages/Home.jsx
// import React, { useEffect, useState } from "react";
// import SmartSearchBar from "../components/SmartSearchBar.jsx";
// import VisualSearch from "../components/VisualSearch.jsx";
// import http from "../api/http.js";
// import { ENDPOINTS } from "../api/endpoints.js";
// import ProductCard from "../components/ProductCard.jsx";
// import BannerCarousel from "../components/BannerCarousel.jsx";
// // images
// import b1 from "../images/b1.jpg";
// import b2 from "../images/b2.jpg";
// import b3 from "../images/b3.jpg";
// import b4 from "../images/b4.jpg";

// import CategoryCircles from "../components/CategoryCircles.jsx";
// import c1 from "../images/c1.jpg";
// import c2 from "../images/c2.jpg";
// import c3 from "../images/c3.jpg";
// import c4 from "../images/c4.jpg";
// import c5 from "../images/c5.jpg";
// import c6 from "../images/c6.jpg";
// import c7 from "../images/c7.jpg";
// import c8 from "../images/c8.jpg"; // FIX: was re-importing as `c7`, which is an
// // illegal duplicate `const c7` declaration and would crash the whole bundle
// // at build time (Vite/ESBuild throws "Identifier 'c7' has already been
// // declared"). Renamed to `c8` to match its actual file.

// export default function Home() {
//   const [trending, setTrending] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await http.get(
//           `${ENDPOINTS.products.base}?limit=8&sort=popular`
//         );
//         setTrending(data?.items || []);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   // Banners
//   const banners = [
//     {
//       img: b1,
//       title: "GEL ROCKET 12",
//       sub: "Gel cushioning • Game-ready grip",
//       cta: "SHOP NOW",
//       href: "/shop?category=shoes",
//       badge: "ASICS",
//     },
//     {
//       img: b2,
//       title: "SUMMER ESSENTIALS",
//       sub: "Linen shirts & breezy chinos",
//       cta: "Explore",
//       href: "/shop?category=men",
//       badge: "NEW",
//     },
//     {
//       img: b3,
//       title: "FESTIVE EDIT",
//       sub: "Vibrant kurtas & sets",
//       cta: "Shop Festive",
//       href: "/shop?category=women",
//     },
//     {
//       img: b4,
//       title: "ACCESSORIES SALE",
//       sub: "Up to 40% off",
//       cta: "Grab Deals",
//       href: "/shop?category=accessories",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#EDEAE1]">
//       {/* Sticky search bar */}
//       <div className="sticky top-0 z-30 bg-[#15171c]/95 backdrop-blur-sm border-b border-white/10 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
//           <SmartSearchBar />
//         </div>
//       </div>

//       {/* Editorial Hero Band */}
//       <div className="bg-[#15171c] pb-10 sm:pb-14">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7">
//           {/* Eyebrow + brass rule — frames the carousel like a magazine spread */}
//           <div className="flex items-center gap-4 mb-5">
//             <span className="text-[11px] font-semibold tracking-[0.35em] text-[#AD8A4D] uppercase font-[Oswald,sans-serif]">
//               The Edit — AW'26
//             </span>
//             <div className="h-px flex-1 bg-gradient-to-r from-[#AD8A4D]/60 to-transparent" />
//           </div>

//           <div className="rounded-sm overflow-hidden ring-1 ring-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
//             <BannerCarousel banners={banners} auto interval={5500} />
//           </div>
//         </div>
//       </div>

//       {/* Category Circles */}
//       <section className="py-14 sm:py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <header className="flex flex-col items-start text-left mb-10">
//             <span className="text-[11px] font-semibold tracking-[0.35em] text-[#AD8A4D] uppercase">
//               Browse
//             </span>
//             <h2
//               className="text-3xl sm:text-4xl font-bold text-[#15171c] tracking-tight uppercase mt-2"
//               style={{ fontFamily: "Oswald, sans-serif" }}
//             >
//               Shop by Category
//             </h2>
//             <div className="h-[3px] w-14 bg-[#AD8A4D] mt-4" />
//           </header>

//           <CategoryCircles
//             items={[
//               { title: "Shirts", img: c1, to: "/shop?category=shirts" },
//               { title: "T-Shirts", img: c2, to: "/shop?category=tshirts" },
//               { title: "Jeans", img: c3, to: "/shop?category=jeans" },
//               {
//                 title: "Shorts & Trousers",
//                 img: c4,
//                 to: "/shop?category=bottoms",
//               },
//               {
//                 title: "Infant Essentials",
//                 img: c6,
//                 to: "/shop?category=infant",
//               },
//             ]}
//           />
//         </div>
//       </section>

//       {/* Divider between sections — quiet structural device, not decoration */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="h-px bg-[#15171c]/10" />
//       </div>

//       {/* Trending */}
//       <section className="py-14 sm:py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
//             <div>
//               <span className="text-[11px] font-semibold tracking-[0.35em] text-[#AD8A4D] uppercase">
//                 Curated For You
//               </span>
//               <h2
//                 className="text-3xl sm:text-4xl font-bold text-[#15171c] tracking-tight uppercase mt-2"
//                 style={{ fontFamily: "Oswald, sans-serif" }}
//               >
//                 Trending Now
//               </h2>
//               <div className="h-[3px] w-14 bg-[#AD8A4D] mt-4" />
//             </div>
//             <p className="text-sm text-[#15171c]/60 max-w-xs sm:text-right">
//               Most-loved picks, restocked weekly based on what's actually selling.
//             </p>
//           </header>

//           {loading ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//               {Array.from({ length: 8 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="rounded-sm bg-white border border-[#15171c]/10 overflow-hidden animate-pulse"
//                 >
//                   <div className="aspect-[3/4] bg-[#15171c]/10" />
//                   <div className="p-3 space-y-2">
//                     <div className="h-3 w-2/5 bg-[#15171c]/10 rounded" />
//                     <div className="h-3 w-4/5 bg-[#15171c]/10 rounded" />
//                     <div className="h-3 w-3/5 bg-[#15171c]/10 rounded" />
//                     <div className="flex gap-2 pt-2">
//                       <div className="h-8 flex-1 bg-[#15171c]/10 rounded-sm" />
//                       <div className="h-8 flex-1 bg-[#15171c]/10 rounded-sm" />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : trending.length === 0 ? (
//             <div className="rounded-sm border border-[#15171c]/10 bg-white py-16 text-center">
//               <p className="text-[#15171c]/60">
//                 Nothing trending yet — check back soon, or browse a category above.
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//               {trending.map((p, i) => (
//                 <div
//                   key={p._id || p.id || i}
//                   className="rounded-sm bg-white border border-[#15171c]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#AD8A4D]/50 transition-all duration-300"
//                 >
//                   <ProductCard product={p} />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }


// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import SmartSearchBar from "../components/SmartSearchBar.jsx";
import VisualSearch from "../components/VisualSearch.jsx";
import http from "../api/http.js";
import { ENDPOINTS } from "../api/endpoints.js";
import ProductCard from "../components/ProductCard.jsx";
import BannerCarousel from "../components/BannerCarousel.jsx";
import CategorySection from "../components/CategorySection.jsx";
// images
import b1 from "../images/b1.jpg";
import b2 from "../images/b2.jpg";
import b3 from "../images/b3.jpg";
import b4 from "../images/b4.jpg";

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
    <div className="min-h-screen bg-[#EDEAE1]">
      {/* Sticky search bar */}
      <div className="sticky top-0 z-30 bg-[#15171c]/95 backdrop-blur-sm border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <SmartSearchBar />
        </div>
      </div>

      {/* Editorial Hero Band */}
      <div className="bg-[#15171c] pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7">
          {/* Eyebrow + brass rule — frames the carousel like a magazine spread */}
          <div className="flex items-center gap-4 mb-5">
            <span className="text-[11px] font-semibold tracking-[0.35em] text-[#AD8A4D] uppercase font-[Oswald,sans-serif]">
              The Edit — AW'26
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#AD8A4D]/60 to-transparent" />
          </div>

          <div className="rounded-sm overflow-hidden ring-1 ring-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
            <BannerCarousel banners={banners} auto interval={5500} />
          </div>
        </div>
      </div>

      {/* Category Circles — now its own component, see src/components/CategorySection.jsx */}
      <CategorySection />

      {/* Divider between sections — quiet structural device, not decoration */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-[#15171c]/10" />
      </div>

      {/* Trending */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.35em] text-[#AD8A4D] uppercase">
                Curated For You
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#15171c] tracking-tight uppercase mt-2"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                Trending Now
              </h2>
              <div className="h-[3px] w-14 bg-[#AD8A4D] mt-4" />
            </div>
            <p className="text-sm text-[#15171c]/60 max-w-xs sm:text-right">
              Most-loved picks, restocked weekly based on what's actually selling.
            </p>
          </header>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-sm bg-white border border-[#15171c]/10 overflow-hidden animate-pulse"
                >
                  <div className="aspect-[3/4] bg-[#15171c]/10" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 w-2/5 bg-[#15171c]/10 rounded" />
                    <div className="h-3 w-4/5 bg-[#15171c]/10 rounded" />
                    <div className="h-3 w-3/5 bg-[#15171c]/10 rounded" />
                    <div className="flex gap-2 pt-2">
                      <div className="h-8 flex-1 bg-[#15171c]/10 rounded-sm" />
                      <div className="h-8 flex-1 bg-[#15171c]/10 rounded-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : trending.length === 0 ? (
            <div className="rounded-sm border border-[#15171c]/10 bg-white py-16 text-center">
              <p className="text-[#15171c]/60">
                Nothing trending yet — check back soon, or browse a category above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {trending.map((p, i) => (
                <div
                  key={p._id || p.id || i}
                  className="rounded-sm bg-white border border-[#15171c]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#AD8A4D]/50 transition-all duration-300"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}