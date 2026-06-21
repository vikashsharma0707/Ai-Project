// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./CategoryTiles.css";

// const tiles = [
//   { key: "men", title: "Men" },
//   { key: "women", title: "Women" },
//   { key: "kids", title: "Kids" },
//   { key: "all", title: "All" }
// ];

// const svgBg = (label, a, b) =>
//   "data:image/svg+xml;utf8," +
//   encodeURIComponent(
//     `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>
//       <defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs>
//       <rect width='100%' height='100%' fill='url(#g)'/>
//       <text x='300' y='210' font-size='76' text-anchor='middle' font-family='Arial' fill='#1f2937' font-weight='700'>${label}</text>
//     </svg>`
//   );

// const art = {
//   men: svgBg("MEN", "#e0f2fe", "#bfdbfe"),
//   women: svgBg("WOMEN", "#fee2e2", "#fbcfe8"),
//   kids: svgBg("KIDS", "#dcfce7", "#bbf7d0"),
//   all: svgBg("ALL", "#e5e7eb", "#f3f4f6")
// };

// export default function CategoryTiles() {
//   const nav = useNavigate();
//   const open = (key) => (key === "all" ? nav("/catalog") : nav(`/catalog?category=${key}`));

//   return (
//     <section className="category-tiles">
//       <h2 className="cat-title"><span>SHOP BY CATEGORIES</span><i/></h2>
//       <div className="cat-grid">
//         {tiles.map((t) => (
//           <button key={t.key} className="cat-card" onClick={() => open(t.key)}>
//             <div className="img-wrap">
//               <img src={art[t.key]} alt={t.title} />
//             </div>
//             <div className="label">{t.title}</div>
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }






import React from "react";
import { useNavigate } from "react-router-dom";

const tiles = [
  { key: "men", title: "Men" },
  { key: "women", title: "Women" },
  { key: "kids", title: "Kids" },
  { key: "all", title: "All" }
];

const svgBg = (label, a, b) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>
      <defs>
        <linearGradient id='g' x1='0' x2='1'>
          <stop offset='0' stop-color='${a}'/>
          <stop offset='1' stop-color='${b}'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text
        x='300'
        y='220'
        font-size='76'
        text-anchor='middle'
        font-family='Arial'
        fill='#111827'
        font-weight='700'
      >
        ${label}
      </text>
    </svg>
  `);

const art = {
  men: svgBg("MEN", "#e0f2fe", "#bfdbfe"),
  women: svgBg("WOMEN", "#fee2e2", "#fbcfe8"),
  kids: svgBg("KIDS", "#dcfce7", "#bbf7d0"),
  all: svgBg("ALL", "#e5e7eb", "#f3f4f6")
};

export default function CategoryTiles() {
  const navigate = useNavigate();

  const open = (key) => {
    if (key === "all") {
      navigate("/catalog");
    } else {
      navigate(`/catalog?category=${key}`);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex items-center justify-center mb-10">
          <div className="h-[2px] w-10 bg-pink-500"></div>

          <h2 className="mx-4 text-2xl md:text-4xl font-bold text-gray-900 tracking-wide uppercase">
            Shop By Categories
          </h2>

          <div className="h-[2px] w-10 bg-pink-500"></div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {tiles.map((tile) => (
            <button
              key={tile.key}
              onClick={() => open(tile.key)}
              className="
                group
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-md
                hover:shadow-2xl
                transition-all
                duration-500
                hover:-translate-y-2
              "
            >
              <div className="overflow-hidden">
                <img
                  src={art[tile.key]}
                  alt={tile.title}
                  className="
                    w-full
                    h-48
                    md:h-64
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />
              </div>

              <div className="py-5 px-4">
                <h3
                  className="
                    text-lg
                    md:text-xl
                    font-semibold
                    text-gray-800
                    group-hover:text-pink-600
                    transition-colors
                  "
                >
                  {tile.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Explore Collection
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}