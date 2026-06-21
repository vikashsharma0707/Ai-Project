// src/components/CategorySection.jsx
import React from "react";
import CategoryCircles from "./CategoryCircles.jsx";

import c1 from "../images/c1.jpg";
import c2 from "../images/c2.jpg";
import c3 from "../images/c3.jpg";
import c4 from "../images/c4.jpg";
import c5 from "../images/c5.jpg";
import c6 from "../images/c6.jpg";
import c7 from "../images/c7.jpg";
import c8 from "../images/c8.jpg";

export default function CategorySection() {
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col items-start text-left mb-10">
          <span className="text-[11px] font-semibold tracking-[0.35em] text-[#AD8A4D] uppercase">
            Browse
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#15171c] tracking-tight uppercase mt-2"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            Shop by Category
          </h2>
          <div className="h-[3px] w-14 bg-[#AD8A4D] mt-4" />
        </header>

        <CategoryCircles
          items={[
            { title: "Shirts", img: c1, to: "/shop?category=shirts" },
            { title: "T-Shirts", img: c2, to: "/shop?category=tshirts" },
            { title: "Jeans", img: c3, to: "/shop?category=jeans" },
            {
              title: "Shorts & Trousers",
              img: c4,
              to: "/shop?category=bottoms",
            },
            {
              title: "Infant Essentials",
              img: c6,
              to: "/shop?category=infant",
            },
            // c5, c7, c8 are imported and available if you want to add more
            // categories later, e.g.:
            // { title: "Casual Shoes", img: c5, to: "/shop?category=shoes" },
            // { title: "Kids Wear", img: c7, to: "/shop?category=kids" },
            // { title: "Sports", img: c8, to: "/shop?category=sports" },
          ]}
        />
      </div>
    </section>
  );
}