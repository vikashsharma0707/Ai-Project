import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sizeAdvisor as sizeThunk } from "../store/aiSlice.js";

export default function SizeAdvisor({ product, onPick }) {
  const dispatch = useDispatch();
  const result = useSelector(s => s.ai.size); // { recommendation, reason, ... }

  const [form, setForm] = useState({
    gender: (product?.category || "").toLowerCase().includes("women") ? "women" : "men",
    category: product?.category || "topwear",
    heightCm: "",
    weightKg: "",
    brand: product?.brand || "",
    fit: "regular",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const getSize = async (e) => {
    e.preventDefault();
    const payload = {
      gender: form.gender,
      category: form.category,
      heightCm: Number(form.heightCm),
      weightKg: Number(form.weightKg),
      brand: form.brand,
      fit: form.fit,
    };
    await dispatch(sizeThunk(payload));
  };

  const apply = () => {
    if (result?.recommendation && onPick) onPick(result.recommendation);
  };

  return (
    <div className="panel" style={{marginTop:12}}>
      <div className="row" style={{justifyContent:"space-between", alignItems:"center"}}>
        <h3 style={{margin:0}}>Find your size</h3>
      </div>

      <form onSubmit={getSize} className="row gap" style={{flexWrap:"wrap", marginTop:8}}>
        <select name="gender" value={form.gender} onChange={onChange}>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>

        <input name="heightCm" placeholder="Height (cm)" value={form.heightCm} onChange={onChange} />
        <input name="weightKg" placeholder="Weight (kg)" value={form.weightKg} onChange={onChange} />

        <select name="fit" value={form.fit} onChange={onChange}>
          <option value="slim">Slim</option>
          <option value="regular">Regular</option>
          <option value="loose">Loose</option>
        </select>

        <input name="brand" placeholder="Brand (optional)" value={form.brand} onChange={onChange} />

        <button className="btn sm" type="submit">Get Size</button>
      </form>

      {result?.recommendation && (
        <div className="panel" style={{marginTop:10, background:"#f8fafc"}}>
          <div className="row" style={{justifyContent:"space-between", alignItems:"center"}}>
            <div>
              <div><b>Recommended:</b> {result.recommendation}</div>
              <div className="muted" style={{marginTop:4}}>{result.reason}</div>
            </div>
            {onPick && (
              <button className="btn outline sm" onClick={apply}>Apply size</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
