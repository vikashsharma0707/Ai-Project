// // // import React, { useEffect } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { reviewSummary } from '../store/aiSlice.js';

// // // export default function ReviewSummary({ productId }){
// // //   const dispatch = useDispatch();
// // //   const summary = useSelector(s=>s.ai.summary);
// // //   useEffect(()=>{ dispatch(reviewSummary(productId)); }, [dispatch, productId]);
// // //   return <p className="muted">{summary}</p>;
// // // }


// // import React, { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { reviewSummary } from '../store/aiSlice.js';

// // export default function ReviewSummary({ productId }) {
// //   const dispatch = useDispatch();
// //   const { summary, loadingSummary } = useSelector((s) => ({
// //     summary: s.ai.summary,
// //     loadingSummary: s.ai.loadingSummary,
// //   }));

// //   useEffect(() => {
// //     if (productId) dispatch(reviewSummary(productId));
// //   }, [productId, dispatch]);

// //   return (
// //     <div className="panel">
// //       <h3>Ratings &amp; Reviews (AI Summary)</h3>
// //       {loadingSummary ? (
// //         <p>Loading summary…</p>
// //       ) : (
// //         <p style={{ whiteSpace: 'pre-wrap' }}>{summary || 'No reviews yet.'}</p>
// //       )}
// //     </div>
// //   );
// // }


// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import http from "../api/http.js";
// import { API_BASE } from "../api/http.js";
// import { reviewSummary as fetchReviewSummary } from "../store/aiSlice.js";

// function Star({ filled, onClick }) {
//   return (
//     <span
//       onClick={onClick}
//       style={{ cursor: onClick ? "pointer" : "default", color: filled ? "#f59e0b" : "#d1d5db", fontSize: 18 }}
//       title={filled ? "★" : "☆"}
//     >
//       {filled ? "★" : "☆"}
//     </span>
//   );
// }

// function Stars({ value = 0, onChange }) {
//   return (
//     <div style={{ display: "inline-flex", gap: 4 }}>
//       {[1, 2, 3, 4, 5].map((n) => (
//         <Star key={n} filled={n <= value} onClick={onChange ? () => onChange(n) : undefined} />
//       ))}
//     </div>
//   );
// }

// export default function ReviewSummaryPage() {
//   const { id } = useParams(); // productId
//   const dispatch = useDispatch();
//   const me = useSelector((s) => s.user.me);
//   const ai = useSelector((s) => s.ai);

//   const [loading, setLoading] = useState(true);
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [eligible, setEligible] = useState(false);
//   const [my, setMy] = useState({ rating: 0, comment: "" });
//   const [saving, setSaving] = useState(false);
//   const [err, setErr] = useState("");

//   const cover = useMemo(() => {
//     const src = product?.images?.[0];
//     if (!src) return null;
//     if (/^https?:\/\//i.test(src)) return src;
//     if (src.startsWith("/uploads")) return `${API_BASE}${src}`;
//     return `${API_BASE}/${src.replace(/^\/+/, "")}`;
//   }, [product]);

//   useEffect(() => {
//     let gone = false;
//     (async () => {
//       try {
//         setLoading(true);
//         setErr("");
//         const [{ data: p }, { data: revs }] = await Promise.all([
//           http.get(`/api/products/${id}`),
//           http.get(`/api/products/${id}/reviews`),
//         ]);
//         if (gone) return;
//         setProduct(p);
//         setReviews(revs || []);
//       } catch (e) {
//         console.error(e);
//         if (!gone) setErr("Failed to load product or reviews.");
//       } finally {
//         if (!gone) setLoading(false);
//       }
//     })();
//     return () => {
//       gone = true;
//     };
//   }, [id]);

//   // Check if current user already reviewed (pre-fill)
//   useEffect(() => {
//     if (!me?._id || !reviews?.length) return;
//     const mine = reviews.find((r) => String(r.user?._id || r.user) === String(me._id));
//     if (mine) setMy({ rating: Number(mine.rating) || 0, comment: mine.comment || "" });
//   }, [me, reviews]);

//   // Eligibility
//   useEffect(() => {
//     if (!me?._id) return setEligible(false);
//     (async () => {
//       try {
//         const { data } = await http.get(`/api/products/${id}/reviews/eligible`);
//         setEligible(!!data?.eligible);
//       } catch {
//         setEligible(false);
//       }
//     })();
//   }, [id, me]);

//   // AI summary
//   useEffect(() => {
//     if (id) dispatch(fetchReviewSummary(id));
//   }, [id, dispatch]);

//   const avgFromReviews = useMemo(() => {
//     if (!reviews?.length) return 0;
//     const sum = reviews.reduce((s, r) => s + (r.rating || 0), 0);
//     return Math.round((sum / reviews.length) * 10) / 10;
//   }, [reviews]);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!me?._id) return alert("Please login to review.");
//     if (!eligible) return alert("Only customers who bought this product can review.");
//     if (!(my.rating >= 1 && my.rating <= 5)) return alert("Please select rating 1..5");

//     try {
//       setSaving(true);
//       await http.post(`/api/products/${id}/reviews`, { rating: my.rating, comment: my.comment || "" });
//       // refresh reviews + AI
//       const { data } = await http.get(`/api/products/${id}/reviews`);
//       setReviews(data || []);
//       dispatch(fetchReviewSummary(id));
//       alert("Review saved.");
//     } catch (e2) {
//       console.error(e2);
//       alert("Failed to save review.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="container" style={{ paddingBottom: 24 }}>
//       <div className="row gap" style={{ alignItems: "flex-start" }}>
//         <div className="panel" style={{ minWidth: 340, maxWidth: 360 }}>
//           {loading ? (
//             <p>Loading…</p>
//           ) : err ? (
//             <p className="muted">{err}</p>
//           ) : (
//             <>
//               {cover ? (
//                 <img src={cover} alt={product?.title} style={{ width: "100%", borderRadius: 12 }} />
//               ) : (
//                 <div style={{ background: "#f3f4f6", height: 240, borderRadius: 12 }} />
//               )}
//               <h2 style={{ marginBottom: 6 }}>{product?.title}</h2>
//               <div className="muted">{product?.brand} • {product?.category}</div>
//               <div style={{ marginTop: 8 }}>
//                 <Stars value={product?.ratingAvg || avgFromReviews} />
//                 <span style={{ marginLeft: 8 }}>
//                   {(product?.ratingAvg || avgFromReviews) || 0} ★ ({product?.ratingCount || reviews.length} reviews)
//                 </span>
//               </div>
//               <div style={{ marginTop: 10 }}>
//                 <Link to={`/product/${id}`} className="btn">View Product</Link>
//               </div>
//             </>
//           )}
//         </div>

//         <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
//           <div className="panel">
//             <h3>AI Review Summary</h3>
//             <p className="muted" style={{ whiteSpace: "pre-wrap" }}>
//               {ai?.summary || "No reviews yet."}
//             </p>
//           </div>

//           <div className="panel">
//             <div className="pd-reviews-header">
//               <h3>Ratings &amp; Reviews</h3>
//               <div className="pd-stars">
//                 <Stars value={avgFromReviews} /> <span style={{ marginLeft: 8 }}>{avgFromReviews} average</span>
//               </div>
//             </div>

//             {me?._id ? (
//               <form onSubmit={onSubmit} className="col gap" style={{ marginTop: 10 }}>
//                 <div>
//                   <div className="pd-label">Your Rating</div>
//                   <Stars value={my.rating} onChange={(n) => setMy((s) => ({ ...s, rating: n }))} />
//                 </div>
//                 <div>
//                   <div className="pd-label">Your Review</div>
//                   <textarea
//                     placeholder="Share your experience"
//                     value={my.comment}
//                     onChange={(e) => setMy((s) => ({ ...s, comment: e.target.value }))}
//                     rows={3}
//                     style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: 10 }}
//                   />
//                 </div>
//                 {!eligible && (
//                   <div className="muted" style={{ marginTop: -4 }}>
//                     Note: Only customers who purchased this product can submit a review.
//                   </div>
//                 )}
//                 <button className="btn" type="submit" disabled={!eligible || saving}>
//                   {saving ? "Saving…" : "Submit Review"}
//                 </button>
//               </form>
//             ) : (
//               <p className="muted">Please <Link to="/profile">login</Link> to write a review.</p>
//             )}
//           </div>

//           <div className="panel">
//             <h3>All Reviews</h3>
//             {!reviews?.length ? (
//               <p className="muted">No reviews yet.</p>
//             ) : (
//               <div className="pd-revgrid">
//                 {reviews.map((r, i) => (
//                   <div key={i} className="pd-rev-block">
//                     <div className="row gap" style={{ justifyContent: "space-between" }}>
//                       <div>
//                         <b>{r?.user?.name || "User"}</b>
//                         <div className="muted" style={{ fontSize: 12 }}>
//                           {new Date(r?.createdAt || Date.now()).toLocaleDateString()}
//                         </div>
//                       </div>
//                       <div><Stars value={r?.rating || 0} /></div>
//                     </div>
//                     {r?.comment && <p style={{ marginTop: 8 }}>{r.comment}</p>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// frontend/src/pages/ReviewSummaryPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import http from "../api/http.js";
import { fetchReviewSummary } from "../store/aiSlice.js";

function Star({ filled, onClick }) {
  return (
    <span
      onClick={onClick}
      className={`text-3xl transition-all duration-200 cursor-pointer ${
        filled ? "text-yellow-500 scale-110" : "text-gray-300 hover:text-yellow-400"
      }`}
    >
      {filled ? "★" : "☆"}
    </span>
  );
}

function Stars({ value = 0, onChange, size = "large" }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          filled={n <= value}
          onClick={onChange ? () => onChange(n) : undefined}
        />
      ))}
    </div>
  );
}

export default function ReviewSummaryPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const me = useSelector((s) => s.user.me);
  const ai = useSelector((s) => s.ai);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [eligible, setEligible] = useState(false);
  const [myReview, setMyReview] = useState({ rating: 0, comment: "" });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);

  // Load Product & Reviews
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [{ data: p }, { data: revs }] = await Promise.all([
          http.get(`/api/products/${id}`),
          http.get(`/api/products/${id}/reviews`)
        ]);
        setProduct(p);
        setReviews(revs || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  // Check eligibility to review
  useEffect(() => {
    if (!me?._id) return;
    http.get(`/api/products/${id}/reviews/eligible`)
      .then(({ data }) => setEligible(!!data?.eligible))
      .catch(() => setEligible(false));
  }, [id, me]);

  // Generate AI Summary (Button Trigger)
  const generateAISummary = async () => {
    setSummaryLoading(true);
    try {
      await dispatch(fetchReviewSummary(id));
    } catch (e) {
      console.error(e);
    } finally {
      setSummaryLoading(false);
    }
  };

  const avgRating = useMemo(() => {
    if (!reviews?.length) return 0;
    const sum = reviews.reduce((s, r) => s + (r.rating || 0), 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviews]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!me?._id) return alert("Please login to review");
    if (!eligible) return alert("Only buyers can review this product");
    if (myReview.rating < 1) return alert("Please give a rating");

    setSaving(true);
    try {
      await http.post(`/api/products/${id}/reviews`, {
        rating: myReview.rating,
        comment: myReview.comment || ""
      });
      alert("Review submitted successfully!");
      const { data } = await http.get(`/api/products/${id}/reviews`);
      setReviews(data || []);
    } catch (err) {
      alert("Failed to submit review");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Product Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            {product && (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <img
                  src={product.images?.[0] ? `${import.meta.env.VITE_API_BASE || "http://localhost:5000"}${product.images[0]}` : ""}
                  alt={product.title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-8">
                  <h2 className="text-2xl font-bold leading-tight">{product.title}</h2>
                  <p className="text-gray-500 mt-1">{product.brand} • {product.category}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <Stars value={avgRating} />
                    <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-10">
          {/* AI Summary */}
          <div className="bg-white rounded-3xl shadow p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold flex items-center gap-3">
                🤖 AI Review Summary
              </h3>
              <button
                onClick={generateAISummary}
                disabled={summaryLoading}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-medium transition disabled:opacity-70"
              >
                {summaryLoading ? "Generating..." : "Generate AI Summary"}
              </button>
            </div>

            <div className="prose text-gray-700 leading-relaxed">
              {ai?.summary ? (
                <div className="whitespace-pre-wrap text-[15.5px]">{ai.summary}</div>
              ) : (
                <p className="text-gray-400 italic text-center py-12">
                  Click the button above to get intelligent AI insights from all customer reviews.
                </p>
              )}
            </div>
          </div>

          {/* Write Your Review */}
          {me?._id && (
            <div className="bg-white rounded-3xl shadow p-8">
              <h3 className="text-xl font-semibold mb-6">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div>
                  <p className="font-medium mb-3">Your Rating</p>
                  <Stars value={myReview.rating} onChange={(rating) => setMyReview({ ...myReview, rating })} />
                </div>

                <div>
                  <p className="font-medium mb-2">Your Review</p>
                  <textarea
                    placeholder="Share your honest experience with this product..."
                    value={myReview.comment}
                    onChange={(e) => setMyReview({ ...myReview, comment: e.target.value })}
                    rows={5}
                    className="w-full border border-gray-300 rounded-2xl p-5 focus:outline-none focus:border-violet-500 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving || !eligible}
                  className="w-full py-4 bg-black text-white rounded-2xl font-semibold text-lg hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {saving ? "Submitting Review..." : "Submit Review"}
                </button>
              </form>
            </div>
          )}

          {/* All Reviews */}
          <div className="bg-white rounded-3xl shadow p-8">
            <h3 className="text-2xl font-semibold mb-6">All Reviews ({reviews.length})</h3>
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="space-y-8">
                {reviews.map((r, i) => (
                  <div key={i} className="border-b pb-8 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <b>{r.user?.name || "Anonymous User"}</b>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(r.createdAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <Stars value={r.rating} />
                    </div>
                    {r.comment && <p className="mt-4 text-gray-700 leading-relaxed">{r.comment}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}