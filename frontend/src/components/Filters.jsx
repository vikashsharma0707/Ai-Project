// import React, { useState } from 'react';

// export default function Filters({ onChange }){
//   const [q, setQ] = useState('');
//   const [brand, setBrand] = useState('');
//   const [category, setCategory] = useState('');
//   return (
//     <div className="row gap">
//       <input placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} />
//       <input placeholder="Brand" value={brand} onChange={e=>setBrand(e.target.value)} />
//       <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
//       <button onClick={()=>onChange({ q, brand, category })}>Apply</button>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Filters({ initialCategory = "" }) {
  const nav = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const q0 = params.get("q") || "";
  const brand0 = params.get("brand") || "";
  const min0 = params.get("priceMin") || "";
  const max0 = params.get("priceMax") || "";
  const sort0 = params.get("sort") || "new";

  const [cat, setCat] = useState(initialCategory);
  const [q, setQ] = useState(q0);
  const [brand, setBrand] = useState(brand0);
  const [priceMin, setPriceMin] = useState(min0);
  const [priceMax, setPriceMax] = useState(max0);
  const [sort, setSort] = useState(sort0);

  useEffect(() => setCat(initialCategory), [initialCategory]);

  const apply = () => {
    const qs = new URLSearchParams();
    if (q) qs.set("q", q);
    if (cat) qs.set("category", cat);
    if (brand) qs.set("brand", brand);
    if (priceMin) qs.set("priceMin", priceMin);
    if (priceMax) qs.set("priceMax", priceMax);
    if (sort) qs.set("sort", sort);
    qs.set("page", "1");
    nav(`/catalog?${qs.toString()}`);
  };

  const clear = () => nav("/catalog");

  return (
    <div className="panel" style={{display:"grid", gap:10}}>
      <h3 style={{margin:0}}>Filter by</h3>

      <div className="col">
        <label>Search</label>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="t-shirt, jeans..."/>
      </div>

      <div className="col">
        <label>Category</label>
        <select value={cat} onChange={e=>setCat(e.target.value)}>
          <option value="">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <div className="col">
        <label>Brand (comma separated)</label>
        <input value={brand} onChange={e=>setBrand(e.target.value)} placeholder="nike,adidas"/>
      </div>

      <div className="row" style={{gap:8}}>
        <div className="col" style={{flex:1}}>
          <label>Price Min</label>
          <input value={priceMin} onChange={e=>setPriceMin(e.target.value)} placeholder="0"/>
        </div>
        <div className="col" style={{flex:1}}>
          <label>Price Max</label>
          <input value={priceMax} onChange={e=>setPriceMax(e.target.value)} placeholder="5000"/>
        </div>
      </div>

      <div className="col">
        <label>Sort</label>
        <select value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="new">New Arrivals</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      <div className="row" style={{gap:8}}>
        <button className="btn" onClick={apply}>Apply</button>
        <button className="btn outline" onClick={clear}>Clear</button>
      </div>
    </div>
  );
}
