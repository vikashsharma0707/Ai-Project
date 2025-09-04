import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, saveProduct } from '../../store/productSlice.js';

const empty = { title:'', brand:'', category:'', description:'', price:0, oldPrice:0 };

export default function ProductEdit(){
  const { id } = useParams();
  const isNew = id === 'new';
  const dispatch = useDispatch();
  const nav = useNavigate();
  const p = useSelector(s=>s.products.current);
  const [form, setForm] = useState(empty);
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(()=>{ if(!isNew) dispatch(fetchProduct(id)); },[dispatch,id,isNew]);
  useEffect(()=>{ if(p && !isNew){ setForm({ title:p.title, brand:p.brand, category:p.category, description:p.description, price:p.price, oldPrice:p.oldPrice||0 }); setVariants(p.variants||[]); }},[p,isNew]);

  const addVariant = ()=> setVariants(v=>[...v,{ size:'M', color:'default', stock:0, price:form.price||0, sku:'' }]);
  const setVar = (i, k, val)=> setVariants(v=>v.map((x,idx)=> idx===i?{...x,[k]:val}:x));
  const rmVar = (i)=> setVariants(v=>v.filter((_,idx)=>idx!==i));

  // Duplicate SKU validation
  const dupSKU = new Set(variants.map(v=>v.sku)).size !== variants.length;

  const save = async ()=>{
    if (!form.title || !form.brand || !form.category || !(form.price>0)) return alert('Title/Brand/Category/Price required');
    if (dupSKU) return alert('Duplicate SKUs not allowed');
    const fd = new FormData();
    Object.entries(form).forEach(([k,v])=>fd.append(k, v));
    fd.append('variants', JSON.stringify(variants));
    images.forEach(f => fd.append('images', f));
    await dispatch(saveProduct({ id: isNew? null : id, form: fd }));
    nav('/admin/products');
  };

  return (
    <div>
      <h2>{isNew?'New':'Edit'} Product</h2>
      <div className="grid-cols-2">
        <div className="panel">
          <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
          <input placeholder="Brand" value={form.brand} onChange={e=>setForm({...form,brand:e.target.value})}/>
          <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
          <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
          <div className="row gap">
            <input type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})}/>
            <input type="number" placeholder="Old Price" value={form.oldPrice} onChange={e=>setForm({...form,oldPrice:Number(e.target.value)})}/>
          </div>
          <input type="file" multiple onChange={e=>setImages([...e.target.files])}/>
        </div>
        <div className="panel">
          <div className="row space"><b>Variants</b><button className="btn" onClick={addVariant}>Add</button></div>
          <table className="table">
            <thead><tr><th>Size</th><th>Color</th><th>Stock</th><th>Price</th><th>SKU</th><th/></tr></thead>
            <tbody>
              {variants.map((v,i)=> <tr key={i}>
                <td><input value={v.size} onChange={e=>setVar(i,'size',e.target.value)}/></td>
                <td><input value={v.color} onChange={e=>setVar(i,'color',e.target.value)}/></td>
                <td><input type="number" value={v.stock} onChange={e=>setVar(i,'stock',Number(e.target.value))}/></td>
                <td><input type="number" value={v.price} onChange={e=>setVar(i,'price',Number(e.target.value))}/></td>
                <td><input value={v.sku} onChange={e=>setVar(i,'sku',e.target.value)}/></td>
                <td><button onClick={()=>rmVar(i)}>✕</button></td>
              </tr>)}
            </tbody>
          </table>
          {dupSKU && <div className="warn">Duplicate SKUs found</div>}
        </div>
      </div>
      <button className="btn" onClick={save}>Save</button>
    </div>
  );
}
