import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./blog.css";

const SEED_POSTS = [
  {
    id: "1",
    title: "How to Choose Running Shoes in 2025",
    slug: "choose-running-shoes-2025",
    cover: "/banners/gel-rocket-12.jpg",
    tag: "Guides",
    excerpt:
      "Foot type, pronation, cushioning vs. stability — यहाँ समझें सही शूज़ चुनने का आसान तरीका…",
    createdAt: "2025-06-01",
    readMins: 4,
  },
  {
    id: "2",
    title: "Top 10 Summer Athleisure Trends",
    slug: "summer-athleisure-trends",
    cover: "/banners/sample2.jpg",
    tag: "Trends",
    excerpt:
      "Lightweight fabrics, pastel palettes और relaxed fits dominate the season.",
    createdAt: "2025-06-10",
    readMins: 3,
  },
  {
    id: "3",
    title: "Sizing 101: A Simple Fit Guide",
    slug: "simple-fit-guide",
    cover: "/banners/sample3.jpg",
    tag: "Guides",
    excerpt:
      "Measure once, fit forever — torsos, inseams, and chest measurements made easy.",
    createdAt: "2025-06-18",
    readMins: 5,
  },
];

export default function Blog() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");

  const tags = useMemo(() => {
    const s = new Set(SEED_POSTS.map((p) => p.tag).filter(Boolean));
    return ["", ...Array.from(s)];
  }, []);

  const list = useMemo(() => {
    return SEED_POSTS.filter((p) => {
      const matchQ = q
        ? p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(q.toLowerCase())
        : true;
      const matchTag = tag ? p.tag === tag : true;
      return matchQ && matchTag;
    });
  }, [q, tag]);

  return (
    <div className="blog-wrap">
      <div className="blog-top row space">
        <h2>Blog</h2>
        <div className="row gap">
          <input
            className="blog-search"
            type="search"
            placeholder="Search posts…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="blog-select"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            {tags.map((t, i) => (
              <option key={i} value={t}>
                {t ? t : "All"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="blog-grid">
        {list.map((p) => (
          <article key={p.id} className="post-card">
            <Link to={`/blog/${p.slug}`} className="thumb">
              <img src={p.cover} alt={p.title} />
            </Link>
            <div className="post-body">
              <div className="row space">
                <span className="tag">{p.tag}</span>
                <span className="muted">
                  {new Date(p.createdAt).toLocaleDateString()} • {p.readMins} min read
                </span>
              </div>
              <Link to={`/blog/${p.slug}`} className="title">
                {p.title}
              </Link>
              <p className="excerpt">{p.excerpt}</p>
              <Link className="readmore" to={`/blog/${p.slug}`}>
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
