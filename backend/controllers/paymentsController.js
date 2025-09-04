// import Razorpay from 'razorpay';
// import crypto from 'crypto';
// import { env } from '../config/env.js';
// import Product from '../models/Product.js';
// import Order from '../models/Order.js';

// const rzp = new Razorpay({
//   key_id: env.RAZORPAY_KEY_ID,
//   key_secret: env.RAZORPAY_KEY_SECRET
// });

// const enrichItems = (items, dbProducts) => {
//   const map = new Map(dbProducts.map(p => [String(p._id), p]));
//   return items.map(it => {
//     const p = map.get(String(it.product));
//     const price = it.price && it.price > 0 ? it.price : (p?.price || 0);
//     const image = it.image || p?.images?.[0] || '';
//     const title = it.title || p?.title || '';
//     return { ...it, price, image, title };
//   });
// };

// // Frontend ko public key dena
// export const getRazorpayConfig = (_req, res) => {
//   res.json({ keyId: env.RAZORPAY_KEY_ID });
// };

// // Items se total nikal ke Razorpay order create
// export const createRazorpayOrder = async (req, res) => {
//   const items = Array.isArray(req.body.items) ? req.body.items : [];
//   if (!items.length) return res.status(400).json({ message: 'No items' });
//   const ids = items.map(i => i.product);
//   const dbProducts = await Product.find({ _id: { $in: ids } });
//   const enriched = enrichItems(items, dbProducts);
//   const total = enriched.reduce((s, i) => s + i.price * i.qty, 0);
//   const order = await rzp.orders.create({
//     amount: Math.round(total * 100),
//     currency: 'INR',
//     receipt: `rcpt_${Date.now()}`
//   });
//   res.json({ order, total });
// };

// // Razorpay signature verify + Order create (prepaid)
// export const verifyAndCreateOrder = async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items = [], address = '' } = req.body;
//   const body = `${razorpay_order_id}|${razorpay_payment_id}`;
//   const expected = crypto.createHmac('sha256', env.RAZORPAY_KEY_SECRET).update(body).digest('hex');
//   if (expected !== razorpay_signature) return res.status(400).json({ message: 'Invalid signature' });

//   const ids = items.map(i => i.product);
//   const dbProducts = await Product.find({ _id: { $in: ids } });
//   const enriched = enrichItems(items, dbProducts);
//   const total = enriched.reduce((s, i) => s + i.price * i.qty, 0);

//   const order = await Order.create({
//     user: req.user._id,
//     items: enriched,
//     address,
//     total,
//     cod: false,
//     status: 'processing',
//     payment: {
//       method: 'prepaid',
//       provider: 'razorpay',
//       rzpOrderId: razorpay_order_id,
//       rzpPaymentId: razorpay_payment_id,
//       rzpSignature: razorpay_signature,
//       status: 'paid'
//     }
//   });

//   res.json(order);
// };


import Razorpay from 'razorpay';
import crypto from 'crypto';
import { env } from '../config/env.js';

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export const getKey = (_req, res) => {
  return res.json({ key: env.RAZORPAY_KEY_ID || '' });
};

// amount in *paise* on Razorpay (₹500 -> 50000)
export const createPaymentOrder = async (req, res, next) => {
  try {
    const { amount } = req.body; // amount in paise from FE
    if (!amount || amount < 1) return res.status(400).json({ message: 'Amount required' });

    const order = await razorpay.orders.create({
      amount,                // paise
      currency: 'INR',
      receipt: 'rcpt_' + Date.now(),
    });

    res.json(order);
  } catch (e) { next(e); }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment payload' });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Signature mismatch' });
    }

    res.json({ success: true, paymentId: razorpay_payment_id, orderId: razorpay_order_id });
  } catch (e) { next(e); }
};
