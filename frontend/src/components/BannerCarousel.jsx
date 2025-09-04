import React, { useEffect, useRef, useState } from "react";
import "../assets/css/banner.css";

export default function BannerCarousel({ banners = [], auto = true, interval = 5000 }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const touch = useRef({ x: 0, y: 0 });

  const go = (n) => setIdx((p) => (p + n + banners.length) % banners.length);
  const goTo = (i) => setIdx(i);

  // autoplay
  useEffect(() => {
    if (!auto || banners.length <= 1) return;
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go(1), interval);
    return () => clearInterval(timerRef.current);
  }, [idx, auto, interval, banners.length]);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onTouchStart = (e) => (touch.current.x = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touch.current.x;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <div
      className="bnr-wrap"
      onMouseEnter={() => timerRef.current && clearInterval(timerRef.current)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {banners.map((b, i) => (
        <a
          key={i}
          className={`bnr-slide ${i === idx ? "active" : ""}`}
          href={b.href || "#"}
          style={{ backgroundImage: `url(${b.img})` }}
          aria-label={b.title || `Banner ${i + 1}`}
        >
          {/* overlay content (optional) */}
          <div className="bnr-content">
            {b.badge && <span className="bnr-badge">{b.badge}</span>}
            {b.title && <h3 className="bnr-title">{b.title}</h3>}
            {b.sub && <p className="bnr-sub">{b.sub}</p>}
            {b.cta && <span className="bnr-cta">{b.cta}</span>}
          </div>
        </a>
      ))}

      {/* arrows */}
      <button className="bnr-arrow left" onClick={() => go(-1)} aria-label="Previous">
        ‹
      </button>
      <button className="bnr-arrow right" onClick={() => go(1)} aria-label="Next">
        ›
      </button>

      {/* dots */}
      <div className="bnr-dots">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`bnr-dot ${i === idx ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
