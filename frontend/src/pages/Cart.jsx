

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQty, removeFromCart } from "../store/cartSlice.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/css/cart.css";

/** Inline placeholder if image missing */
const PLACEHOLDER_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <path d="M8 44h48M14 22h36" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  );

const TAX_RATE = 0.10; // demo (0 = off)

export default function Cart() {
  const items = useSelector((s) => s.cart.items || []);
  const dispatch = useDispatch();

  const keyOf = (it) => it.sku || it._id || it.id;
  const INR = (n) =>
    Number(n || 0).toLocaleString("en-IN", { style: "currency", currency: "INR" });

  const subtotal = items.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const grand = subtotal + tax;

  const dec = (it) => {
    const next = (it.qty || 1) - 1;
    if (next <= 0) {
      dispatch(removeFromCart(keyOf(it)));
      toast.warn(`Removed ${it.title}`);
    } else {
      dispatch(updateQty({ sku: keyOf(it), qty: next }));
      toast.info(`Qty: ${next}`);
    }
  };
  const inc = (it) => {
    const next = (it.qty || 1) + 1;
    dispatch(updateQty({ sku: keyOf(it), qty: next }));
    toast.success(`Qty: ${next}`);
  };
  const remove = (it) => {
    dispatch(removeFromCart(keyOf(it)));
    toast.warn(`Removed ${it.title}`);
  };

  return (
    <div className="solo-cart">
      <h1 className="solo-title">
        Your Cart <span className="count">({items.length} items)</span>
      </h1>

      {!items.length && (
        <p className="empty">
          Cart empty. <Link to="/shop" className="link">Shop now</Link>
        </p>
      )}

      {!!items.length && (
        <div className="solo-grid">
          {/* LEFT: items table */}
          <div className="solo-table">
            <div className="solo-thead">
              <span>Item</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            {items.map((it) => (
              <div key={keyOf(it)} className="solo-row">
                {/* Remove cross */}
                <button className="remove" onClick={() => remove(it)} aria-label="Remove">×</button>

                {/* Item cell */}
                <div className="item-cell">
                  <img
                    className="thumb"
                    src={it.images?.[0] || it.image || PLACEHOLDER_SVG}
                    alt={it.title}
                  />
                  <div className="meta">
                    {it.brand && <div className="brand">{it.brand}</div>}
                    <div className="title">{it.title}</div>

                    {/* orange sub-note like “(Estimated Ship Date: June 6th)” */}
                    {it.note && <div className="note">{it.note}</div>}

                    {/* tiny line like “Fuel Source: Wood Only” */}
                    {it.sub && <div className="sub">{it.sub}</div>}

                    {/* mini orange-outlined pill */}
                    {it.pill && <span className="badge">{it.pill}</span>}

                    {/* grey “Change” link under first item (optional) */}
                    {it.changeable && <button className="mini-link">Change</button>}
                  </div>
                </div>

                {/* price */}
                <div className="price-cell">{INR(it.price || 0)}</div>

                {/* quantity pill (disabled look if locked) */}
                <div className="qty-cell">
                  {it.locked ? (
                    <div className="qty-locked">
                      <span>1</span>
                      <span className="bar" />
                    </div>
                  ) : (
                    <div className="qty-pill">
                      <button className="qbtn" onClick={() => dec(it)}>−</button>
                      <span className="qval">{it.qty || 1}</span>
                      <button className="qbtn" onClick={() => inc(it)}>+</button>
                    </div>
                  )}
                </div>

                {/* total */}
                <div className="total-cell">{INR((it.price || 0) * (it.qty || 1))}</div>
              </div>
            ))}
          </div>

          {/* RIGHT: summary block */}
          <aside className="solo-summary">
            <div className="sum-row"><span>Subtotal:</span><span>{INR(subtotal)}</span></div>
            <div className="sum-row"><span>Sales Tax:</span><span>{INR(tax)}</span></div>
            <div className="sum-row coupon">
              <span>Coupon Code:</span>
              <button className="link">Add Coupon</button>
            </div>
            <div className="grand">
              <span>Grand total:</span>
              <strong>{INR(grand)}</strong>
            </div>

            <Link to="/checkout" className="checkout-btn">Check out</Link>

            <div className="ship">
              <span>Congrats, you're eligible for <b>Free Shipping</b></span>
              <div className="bar"><div className="fill" /></div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
