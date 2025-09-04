import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pagination({ page, pages }) {
  const nav = useNavigate();
  if (pages <= 1) return null;

  const go = (p) => {
    const qs = new URLSearchParams(window.location.search);
    qs.set("page", String(p));
    nav(`/catalog?${qs.toString()}`);
  };

  const items = [];
  for (let i = 1; i <= pages; i++) items.push(i);

  return (
    <div className="row" style={{gap:8, marginTop:12}}>
      <button className="btn outline" disabled={page<=1} onClick={()=>go(page-1)}>Prev</button>
      {items.map(i => (
        <button key={i}
          className="btn outline"
          style={{background:i===page?"#111": "#fff", color:i===page?"#fff":"#111"}}
          onClick={()=>go(i)}
        >{i}</button>
      ))}
      <button className="btn outline" disabled={page>=pages} onClick={()=>go(page+1)}>Next</button>
    </div>
  );
}
