import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryTiles.css";

const tiles = [
  { key: "men", title: "Men" },
  { key: "women", title: "Women" },
  { key: "kids", title: "Kids" },
  { key: "all", title: "All" }
];

const svgBg = (label, a, b) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>
      <defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='300' y='210' font-size='76' text-anchor='middle' font-family='Arial' fill='#1f2937' font-weight='700'>${label}</text>
    </svg>`
  );

const art = {
  men: svgBg("MEN", "#e0f2fe", "#bfdbfe"),
  women: svgBg("WOMEN", "#fee2e2", "#fbcfe8"),
  kids: svgBg("KIDS", "#dcfce7", "#bbf7d0"),
  all: svgBg("ALL", "#e5e7eb", "#f3f4f6")
};

export default function CategoryTiles() {
  const nav = useNavigate();
  const open = (key) => (key === "all" ? nav("/catalog") : nav(`/catalog?category=${key}`));

  return (
    <section className="category-tiles">
      <h2 className="cat-title"><span>SHOP BY CATEGORIES</span><i/></h2>
      <div className="cat-grid">
        {tiles.map((t) => (
          <button key={t.key} className="cat-card" onClick={() => open(t.key)}>
            <div className="img-wrap">
              <img src={art[t.key]} alt={t.title} />
            </div>
            <div className="label">{t.title}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
