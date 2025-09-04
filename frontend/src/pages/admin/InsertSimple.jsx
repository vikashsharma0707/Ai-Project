// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import http from '../../api/http.js';
// import { ENDPOINTS } from '../../api/endpoints.js';

// export default function InsertSimple(){
//   const [input, setInput] = useState({
//     title: '',
//     brand: '',
//     description: '',
//     category: 'mens',
//     price: ''
//   });
//   const [files, setFiles] = useState([]);
//   const nav = useNavigate();

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setInput(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImage = (e) => {
//     setFiles([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { title, brand, category, price } = input;
//     if (!title || !brand || !category || !(Number(price) > 0)) {
//       alert('Title/Brand/Category/Price required');
//       return;
//     }

//     const fd = new FormData();
//     Object.entries(input).forEach(([k, v]) => fd.append(k, v));
//     // variants optional; keeping empty
//     fd.append('variants', JSON.stringify([]));
//     files.forEach(f => fd.append('images', f));

//     try {
//       await http.post(ENDPOINTS.products.base, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
//       alert('Data saved');
//       nav('/admin/products');
//     } catch (err) {
//       alert(err?.response?.data?.message || 'Save failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Insert New Product</h2>
//       <form onSubmit={handleSubmit} style={{maxWidth: 380}}>
//         <label>Enter Product name</label>
//         <input type="text" name="title" value={input.title} onChange={handleInput} />

//         <label>Brand</label>
//         <input type="text" name="brand" value={input.brand} onChange={handleInput} />

//         <label>Description</label>
//         <input type="text" name="description" value={input.description} onChange={handleInput} />

//         <label>Select Category</label>
//         <select name="category" value={input.category} onChange={handleInput}>
//           <option value="mens">Men</option>
//           <option value="womens">Women</option>
//           <option value="kids">Kids</option>
//           <option value="all">All</option>
//         </select>

//         <label>Enter Price</label>
//         <input type="number" name="price" value={input.price} onChange={handleInput} />

//         <label>Upload Image(s)</label>
//         <input type="file" multiple name="images" onChange={handleImage} />

//         <button className="btn" type="submit" style={{marginTop: 8}}>Submit</button>
//       </form>
//       <p className="muted" style={{marginTop:8}}>
//         Note: Images backend pe Multer se <code>/uploads</code> me save hongi; Cloudinary ki zarurat nahi.
//       </p>
//     </div>
//   );
// }


import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../api/http.js";
import { ENDPOINTS } from "../../api/endpoints.js";
import "./InsertSimple.css";

export default function InsertSimple() {
  const [input, setInput] = useState({
    title: "",
    brand: "",
    description: "",
    category: "mens",
    price: ""
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const picked = Array.from(e.target.files || []);
    setFiles(picked);
  };

  const previews = useMemo(
    () =>
      files.map((f) => ({
        name: f.name,
        url: URL.createObjectURL(f),
        sizeKB: Math.round(f.size / 1024)
      })),
    [files]
  );

  const validate = () => {
    const e = {};
    if (!input.title?.trim()) e.title = "Title required";
    if (!input.brand?.trim()) e.brand = "Brand required";
    if (!input.category?.trim()) e.category = "Category required";
    if (!(Number(input.price) > 0)) e.price = "Enter a valid price";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const fd = new FormData();
    Object.entries(input).forEach(([k, v]) => fd.append(k, v));
    fd.append("variants", JSON.stringify([])); // optional
    files.forEach((f) => fd.append("images", f));

    try {
      setSubmitting(true);
      await http.post(ENDPOINTS.products.base, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      // success UI
      alert("Product saved");
      nav("/admin/products");
    } catch (err) {
      alert(err?.response?.data?.message || "Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ins-wrap">
      <header className="ins-head">
        <h2>Insert New Product</h2>
        <p className="muted">Add basic details and images (JPEG/PNG/WebP).</p>
      </header>

      <form className="ins-form" onSubmit={handleSubmit} noValidate>
        <div className="ins-field">
          <label htmlFor="title">Product name</label>
          <input
            id="title"
            type="text"
            name="title"
            value={input.title}
            onChange={handleInput}
            className={errors.title ? "invalid" : ""}
            placeholder="e.g. Classic Cotton T-Shirt"
          />
          {errors.title && <div className="err">{errors.title}</div>}
        </div>

        <div className="ins-field">
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            type="text"
            name="brand"
            value={input.brand}
            onChange={handleInput}
            className={errors.brand ? "invalid" : ""}
            placeholder="e.g. Acme"
          />
          {errors.brand && <div className="err">{errors.brand}</div>}
        </div>

        <div className="ins-field span-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={input.description}
            onChange={handleInput}
            placeholder="Short details about the product"
          />
        </div>

        <div className="ins-field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={input.category}
            onChange={handleInput}
            className={errors.category ? "invalid" : ""}
          >
            <option value="mens">Men</option>
            <option value="womens">Women</option>
            <option value="kids">Kids</option>
            <option value="all">All</option>
          </select>
          {errors.category && <div className="err">{errors.category}</div>}
        </div>

        <div className="ins-field">
          <label htmlFor="price">Price (₹)</label>
          <input
            id="price"
            type="number"
            name="price"
            min="0"
            step="1"
            value={input.price}
            onChange={handleInput}
            className={errors.price ? "invalid" : ""}
            placeholder="e.g. 1299"
          />
          {errors.price && <div className="err">{errors.price}</div>}
        </div>

        <div className="ins-field span-2">
          <label htmlFor="images">Upload image(s)</label>
          <input
            id="images"
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImage}
          />
          {!!files.length && (
            <div className="ins-previews">
              {previews.map((p) => (
                <figure className="ins-thumb" key={p.name} title={p.name}>
                  <img src={p.url} alt={p.name} />
                  <figcaption className="muted">
                    {p.sizeKB} KB
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>

        <div className="ins-actions span-2">
          <button className="btn btn-dark" type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Submit"}
          </button>
          <button
            className="btn btn-light"
            type="button"
            disabled={submitting}
            onClick={() => nav(-1)}
          >
            Cancel
          </button>
        </div>
      </form>

      <p className="muted footnote">
        Note: Images backend pe Multer se <code>/uploads</code> me save hongi; Cloudinary
        ki zarurat nahi.
      </p>
    </div>
  );
}
