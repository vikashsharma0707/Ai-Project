
// // // // /frontend/src/pages/Checkout.jsx
// // // import React, { useMemo, useState } from "react";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import { useNavigate } from "react-router-dom";
// // // import http from "../api/http.js";
// // // import { clearCart } from "../store/cartSlice.js";
// // // import { riskScore } from "../store/aiSlice.js";

// // // export default function Checkout() {
// // //   const { items } = useSelector((s) => s.cart);
// // //   const { me } = useSelector((s) => s.user);
// // //   const [form, setForm] = useState({
// // //     name: "",
// // //     address: "",
// // //     city: "",
// // //     pin: "",
// // //     mobile: "",
// // //   });

// // //   const dispatch = useDispatch();
// // //   const nav = useNavigate();
// // //   const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

// // //   const orderItems = useMemo(
// // //     () =>
// // //       items.map((it) => ({
// // //         product: it._id,
// // //         title: it.title,
// // //         sku: it.sku || it.variants?.[0]?.sku || "SKU",
// // //         size: it.size || it.variants?.[0]?.size || "free",
// // //         color: it.color || it.variants?.[0]?.color || "default",
// // //         image: it.images?.[0] || "",
// // //         qty: it.qty || 1,
// // //         price: it.price,
// // //       })),
// // //     [items]
// // //   );

// // //   const totalRupees = useMemo(
// // //     () => items.reduce((s, it) => s + it.price * (it.qty || 1), 0),
// // //     [items]
// // //   );
// // //   const totalPaise = Math.round(totalRupees * 100);

// // //   const addressStr = useMemo(
// // //     () =>
// // //       `${form.name}, ${form.address}, ${form.city} - ${form.pin}. Mobile: ${form.mobile}`,
// // //     [form]
// // //   );

// // //   // Load Razorpay script if missing
// // //   const ensureRazorpay = () =>
// // //     new Promise((resolve, reject) => {
// // //       if (window.Razorpay) return resolve(true);
// // //       const s = document.createElement("script");
// // //       s.src = "https://checkout.razorpay.com/v1/checkout.js";
// // //       s.onload = () => resolve(true);
// // //       s.onerror = reject;
// // //       document.body.appendChild(s);
// // //     });

// // //   const payAndPlace = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       if (!me?._id) return nav("/profile");
// // //       if (!orderItems.length) return alert("Your cart is empty.");
// // //       if (!form.name || !form.address || !form.city || !form.pin)
// // //         return alert("Please fill full shipping address.");
// // //       if (totalPaise < 100) return alert("Amount must be at least ₹1.00");

// // //       // 👉 AI Fraud Risk pre-check (especially for COD safety)
// // //       const { action } = await dispatch(
// // //         riskScore({
// // //           ipCountry: "IN",
// // //           billingCountry: "IN",
// // //           ordersLast24h: 0,
// // //           codAbuseCount: 0,
// // //           emailAgeDays: 180,
// // //           velocityPerMin: 0,
// // //         })
// // //       ).unwrap();
// // //       if (action === "block") {
// // //         alert("High risk detected. Please try prepaid.");
// // //         return;
// // //       }
// // //       if (action === "step_up") {
// // //         alert("Extra verification required for COD.");
// // //         // yahan aap additional step-up flow trigger kar सकते हैं (KYC/OTP etc.)
// // //       }

// // //       await ensureRazorpay();
// // //       if (!window.Razorpay) throw new Error("Razorpay SDK failed to load");

// // //       // 1) Fetch key
// // //       const { data: keyData } = await http.get("/api/payments/key");
// // //       // 2) Create Razorpay order on backend (amount in paise)
// // //       const { data: rzpOrder } = await http.post("/api/payments/order", {
// // //         amount: totalPaise,
// // //       });

// // //       // 3) Open Razorpay popup
// // //       const options = {
// // //         key: keyData.key,
// // //         amount: rzpOrder.amount,
// // //         currency: rzpOrder.currency || "INR",
// // //         name: "Clothes Shopping Online",
// // //         description: "Order Payment",
// // //         order_id: rzpOrder.id,
// // //         prefill: {
// // //           name: form.name || me?.name || "Customer",
// // //           email: me?.email || "guest@example.com",
// // //           contact: form.mobile || "",
// // //         },
// // //         theme: { color: "#111827" },
// // //         handler: async (resp) => {
// // //           try {
// // //             // 4) Verify signature on backend
// // //             await http.post("/api/payments/verify", {
// // //               razorpay_order_id: resp.razorpay_order_id,
// // //               razorpay_payment_id: resp.razorpay_payment_id,
// // //               razorpay_signature: resp.razorpay_signature,
// // //             });

// // //             // 5) Create your app order (payment success)
// // //             await http.post("/api/orders", {
// // //               items: orderItems,
// // //               address: addressStr,
// // //               payment: {
// // //                 gateway: "razorpay",
// // //                 id: resp.razorpay_payment_id,
// // //                 amount: totalRupees,
// // //               },
// // //             });

// // //             dispatch(clearCart());
// // //             nav("/orders");
// // //           } catch (err) {
// // //             console.error(err);
// // //             alert("Payment verification failed. Please contact support.");
// // //           }
// // //         },
// // //         modal: { ondismiss: () => console.log("Payment modal closed") },
// // //       };

// // //       const rzp = new window.Razorpay(options);
// // //       rzp.open();
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert(err?.message || "Payment failed to initialize.");
// // //     }
// // //   };

// // //   return (
// // //     <div className="row gap">
// // //       <div className="panel" style={{ minWidth: 360 }}>
// // //         <h2>Fill Your Shipping Address</h2>
// // //         <form onSubmit={payAndPlace} className="col gap">
// // //           <input
// // //             name="name"
// // //             placeholder="Enter your name"
// // //             value={form.name}
// // //             onChange={onChange}
// // //           />
// // //           <input
// // //             name="address"
// // //             placeholder="Enter your address"
// // //             value={form.address}
// // //             onChange={onChange}
// // //           />
// // //           <input
// // //             name="city"
// // //             placeholder="Enter your city"
// // //             value={form.city}
// // //             onChange={onChange}
// // //           />
// // //           <input
// // //             name="pin"
// // //             placeholder="Enter your pin code"
// // //             value={form.pin}
// // //             onChange={onChange}
// // //           />
// // //           <input
// // //             name="mobile"
// // //             placeholder="Enter your mobile number"
// // //             value={form.mobile}
// // //             onChange={onChange}
// // //           />
// // //           <button className="btn" type="submit">
// // //             Pay ₹{totalRupees} &amp; Place Order
// // //           </button>
// // //         </form>
// // //       </div>

// // //       <div className="panel" style={{ flex: 1 }}>
// // //         <h2>Order Summary</h2>
// // //         <table className="table">
// // //           <thead>
// // //             <tr>
// // //               <th>#</th>
// // //               <th>Image</th>
// // //               <th>Name</th>
// // //               <th>Price</th>
// // //               <th>Qty</th>
// // //               <th>Total</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {items.map((it, i) => (
// // //               <tr key={i}>
// // //                 <td>{i + 1}</td>
// // //                 <td>
// // //                   {it.images?.[0] ? (
// // //                     <img src={it.images[0]} alt="" style={{ width: 40 }} />
// // //                   ) : (
// // //                     "-"
// // //                   )}
// // //                 </td>
// // //                 <td>{it.title}</td>
// // //                 <td>₹{it.price}</td>
// // //                 <td>{it.qty || 1}</td>
// // //                 <td>₹{(it.qty || 1) * it.price}</td>
// // //               </tr>
// // //             ))}
// // //             <tr>
// // //               <td colSpan={5} style={{ textAlign: "right" }}>
// // //                 <b>Net Amount</b>
// // //               </td>
// // //               <td>
// // //                 <b>₹{totalRupees}</b>
// // //               </td>
// // //             </tr>
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // frontend/src/pages/Checkout.jsx
// import React, { useState, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import http from "../api/http.js";
// import { clearCart } from "../store/cartSlice.js";
// import ChatAssistant from "../components/ChatAssistant"; // Optional inline chat

// export default function Checkout() {
//   const { items } = useSelector((state) => state.cart);
//   const { me } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const nav = useNavigate();

//   const [form, setForm] = useState({
//     name: me?.name || "",
//     address: "",
//     city: "",
//     pin: "",
//     mobile: "",
//   });
//   const [agentAdvice, setAgentAdvice] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const orderItems = useMemo(() => items.map(it => ({
//     product: it._id,
//     title: it.title,
//     sku: it.sku,
//     size: it.size,
//     color: it.color,
//     image: it.images?.[0],
//     qty: it.qty,
//     price: it.price,
//   })), [items]);

//   const totalRupees = items.reduce((sum, it) => sum + it.price * (it.qty || 1), 0);

//   // Get AI Checkout Recommendation
//   const getAgentRecommendation = async () => {
//     if (!items.length) return;
//     try {
//       const { data } = await http.post("/api/ai/checkout-decision", { items });
//       setAgentAdvice(data);
//     } catch (e) {
//       console.log("Agent unavailable");
//     }
//   };

//   // Call on mount
//   useMemo(() => { getAgentRecommendation(); }, [items]);

//   // ... (rest of your Razorpay + COD logic remains similar)

//   return (
//     <div className="checkout-page">
//       {/* Show AI Recommendation */}
//       {agentAdvice && (
//         <div className="agent-banner">
//           {agentAdvice.message}
//         </div>
//       )}

//       {/* Your existing form + summary */}
//       {/* ... */}
//     </div>
//   );
// }







// frontend/src/pages/Checkout.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import http from "../api/http.js";
import { clearCart } from "../store/cartSlice.js";
import { toast } from "react-toastify";

export default function Checkout() {
  const { items } = useSelector((state) => state.cart);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: me?.name || "",
    address: "",
    city: "",
    pin: "",
    mobile: "",
  });

  const [agentAdvice, setAgentAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("razorpay");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const orderItems = useMemo(() => items.map(it => ({
    product: it._id,
    title: it.title,
    sku: it.sku || `${it._id}-${it.size}`,
    size: it.size,
    color: it.color,
    image: it.images?.[0],
    qty: it.qty || 1,
    price: it.price,
  })), [items]);

  const totalRupees = items.reduce((sum, it) => sum + it.price * (it.qty || 1), 0);

  // AI Recommendation
  useEffect(() => {
    const getAgentRecommendation = async () => {
      if (!items.length) return;
      try {
        const { data } = await http.post("/api/ai/checkout-decision", { items });
        setAgentAdvice(data);
        if (data.suggestedMethod) {
          setSelectedPayment(data.suggestedMethod.toLowerCase() === "cod" ? "cod" : "razorpay");
        }
      } catch (e) {
        console.log("AI Agent unavailable");
      }
    };
    getAgentRecommendation();
  }, [items]);

  // Razorpay Payment
  const handleRazorpay = async () => {
    try {
      setLoading(true);

      const { data: rzpOrder } = await http.post("/api/payments/order", {
        amount: totalRupees,
      });

      const options = {
        key: "rzp_test_RBDJ7R17VdVYkq", // ← Replace with your actual Razorpay Key ID
        amount: rzpOrder.amount,
        currency: "INR",
        order_id: rzpOrder.id,
        name: "Myntra Clone",
        description: "Fashion Order Payment",
        prefill: {
          name: form.name,
          email: me?.email || "",
          contact: form.mobile,
        },
        theme: { color: "#6366f1" },
        handler: async (response) => {
          try {
            await http.post("/api/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            await http.post("/api/orders", {
              items: orderItems,
              address: `${form.name}, ${form.address}, ${form.city} - ${form.pin}`,
              paymentMethod: "razorpay",
            });

            dispatch(clearCart());
            toast.success("✅ Payment Successful! Order Placed.");
            nav("/orders");
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Failed to initialize Razorpay");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.city || !form.pin) {
      toast.error("Please fill complete shipping address");
      return;
    }

    if (selectedPayment === "razorpay") {
      handleRazorpay();
    } else {
      // COD
      try {
        setLoading(true);
        await http.post("/api/orders", {
          items: orderItems,
          address: `${form.name}, ${form.address}, ${form.city} - ${form.pin}`,
          paymentMethod: "COD",
        });
        dispatch(clearCart());
        toast.success("✅ Order placed with Cash on Delivery!");
        nav("/orders");
      } catch (err) {
        toast.error("Failed to place COD order");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {agentAdvice && (
        <div className="agent-banner">
          <strong>💡 AI Suggestion:</strong> {agentAdvice.message}
        </div>
      )}

      <div className="row gap">
        <div className="panel" style={{ minWidth: 380 }}>
          <h2>Shipping Address</h2>
          <form onSubmit={handlePayment}>
            <input name="name" placeholder="Full Name" value={form.name} onChange={onChange} required />
            <input name="address" placeholder="Address" value={form.address} onChange={onChange} required />
            <input name="city" placeholder="City" value={form.city} onChange={onChange} required />
            <input name="pin" placeholder="Pin Code" value={form.pin} onChange={onChange} required />
            <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={onChange} />

            <h3>Payment Method</h3>
            <div className="payment-options">
              <label>
                <input type="radio" checked={selectedPayment === "razorpay"} onChange={() => setSelectedPayment("razorpay")} />
                Online Payment (Razorpay)
              </label>
              <br />
              <label>
                <input type="radio" checked={selectedPayment === "cod"} onChange={() => setSelectedPayment("cod")} />
                Cash on Delivery
              </label>
            </div>

            <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop: 20, width: '100%' }}>
              {loading ? "Processing..." : selectedPayment === "razorpay" ? `Pay ₹${totalRupees}` : "Place COD Order"}
            </button>
          </form>
        </div>

        <div className="panel" style={{ flex: 1 }}>
          <h2>Order Summary</h2>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
              <span>{item.title} × {item.qty}</span>
              <span>₹{(item.price * item.qty).toFixed(0)}</span>
            </div>
          ))}
          <hr />
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Total: ₹{totalRupees}
          </div>
        </div>
      </div>
    </div>
  );
}