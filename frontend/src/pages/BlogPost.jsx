import React from "react";
import { useParams, Link } from "react-router-dom";
import "./blog.css";

const POSTS_BY_SLUG = {
  "choose-running-shoes-2025": {
    title: "How to Choose Running Shoes in 2025",
    cover: "/banners/gel-rocket-12.jpg",
    body: `
      <p>Right shoe = lower injury risk + more fun. Consider your <b>pronation</b>, surface, and mileage.</p>
      <h3>Checklist</h3>
      <ul>
        <li>Arch type & pronation test</li>
        <li>Stack height & cushioning</li>
        <li>Lockdown & heel counter</li>
      </ul>
      <p>Try 2–3 pairs and jog 30–60 seconds each before deciding.</p>
    `,
  },
  "summer-athleisure-trends": {
    title: "Top 10 Summer Athleisure Trends",
    cover: "/banners/sample2.jpg",
    body: `
      <p>Pastels, mesh inserts, and light knits are in. Keep it airy and functional.</p>
      <ol>
        <li>Relaxed fits</li>
        <li>Breathable fabrics</li>
        <li>Pastel palettes</li>
      </ol>
    `,
  },
  "simple-fit-guide": {
    title: "Sizing 101: A Simple Fit Guide",
    cover: "/banners/sample3.jpg",
    body: `
      <p>Measure chest, waist, hips, inseam. Compare with brand charts.</p>
      <p>When in doubt, size up for athleisure.</p>
    `,
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const data = POSTS_BY_SLUG[slug];

  if (!data) {
    return (
      <div className="post-page">
        <p className="muted">Post not found.</p>
        <Link to="/blog" className="readmore">← Back to blog</Link>
      </div>
    );
  }

  return (
    <div className="post-page">
      <div className="post-hero">
        <img src={data.cover} alt={data.title} />
      </div>
      <h1 className="post-title">{data.title}</h1>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: data.body }}
      />
      <div className="post-foot">
        <Link to="/blog" className="btn outline">← Back to Blog</Link>
      </div>
    </div>
  );
}
