import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCircles.css";

/**
 * items: [{ title, img, to }]  // `to` is link (e.g. /shop?category=shirts)
 */
export default function CategoryCircles({ title = "CATEGORIES TO BAG", items = [] }) {
  return (
    <section className="catbag-sec">
      <div className="catbag-head">{title}</div>
      <div className="catbag-grid">
        {items.map((it, i) => (
          <Link to={it.to || "#"} className="catbag-card" key={i}>
            <div className="catbag-imgwrap" aria-hidden="true">
              <img src={it.img} alt={it.title} />
              <span className="catbag-ring" />
            </div>
            <div className="catbag-title">{it.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
