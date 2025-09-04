// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { smartSearch } from '../store/aiSlice.js';
// import { Link } from 'react-router-dom';

// export default function SmartSearchBar(){
//   const [term, setTerm] = useState('');
//   const dispatch = useDispatch();
//   const results = useSelector(s=>s.ai.search);
//   const go = ()=> term.trim() && dispatch(smartSearch(term));
//   return (
//     <div className="smartsearch">
//       <div className="row">
//         <input value={term} onChange={e=>setTerm(e.target.value)} placeholder="Smart search..."/>
//         <button onClick={go}>Search</button>
//       </div>
//       {results?.length>0 && <div className="result-grid">
//         {results.map(r => <Link key={r.product._id} to={`/product/${r.product._id}`} className="pill">{r.product.title} <small>({r.score.toFixed(2)})</small></Link>)}
//       </div>}
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { smartSearch } from '../store/aiSlice.js';
import ProductCard from './ProductCard.jsx';

export default function SmartSearchBar() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { search } = useSelector(s => s.ai);
  const box = useRef();

  useEffect(() => {
    const h = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);

  const onChange = (e) => setQ(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    await dispatch(smartSearch(q));
    setOpen(true);
  };

  return (
    <div className="panel" ref={box}>
      <form className="row" onSubmit={onSubmit} style={{ gap: 10 }}>
        <input
          value={q}
          onChange={onChange}
          placeholder="Search (e.g. red running shoes under 2k)"
          style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: 8, padding: '10px 12px' }}
        />
        <button className="btn" type="submit">Search</button>
      </form>

      {open && (
        <div style={{ marginTop: 12 }}>
          <div className="grid products-grid">
            {search.map((p, i) => <ProductCard key={p._id || i} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
