


// COD-only Orders controller
// import Order from '../models/Order.js';
// import Product from '../models/Product.js';
// import { emitOrderStatus } from '../utils/socket.js';


// backend/controllers/orderController.js
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { emitOrderStatus } from '../utils/socket.js';
import { checkoutDecisionAgent } from '../ai/agents/checkoutAgent.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, address, paymentMethod = 'COD' } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items are required' });
    }

    // Run AI Decision Agent
    const agentDecision = await checkoutDecisionAgent(items, req.user._id);

    if (agentDecision.error) {
      return res.status(400).json({ message: agentDecision.error });
    }

    // Respect agent's recommendation + user choice
    let finalPaymentMethod = paymentMethod;

    if (agentDecision.suggestedMethod === 'COD' && paymentMethod === 'razorpay') {
      // Allow but warn
    }

    // Normalize items (same logic as before, improved)
    const normalizedItems = [];
    let total = 0;

    for (const raw of items) {
      const product = await Product.findById(raw.product || raw._id);
      if (!product) continue;

      const qty = Math.max(1, Number(raw.qty || 1));
      const price = Number(raw.price) || Number(product.price);

      const item = {
        product: product._id,
        title: raw.title || product.title,
        sku: raw.sku || `${product._id}-${raw.size || 'free'}`,
        size: raw.size || 'free',
        color: raw.color || 'default',
        image: raw.image || product.images?.[0],
        qty,
        price
      };

      normalizedItems.push(item);
      total += price * qty;
    }

    const discount = agentDecision.discountForPrepaid || 0;
    const finalTotal = total - discount;

    const orderData = {
      user: req.user._id,
      items: normalizedItems,
      total: finalTotal,
      paymentMethod: finalPaymentMethod,
      paymentStatus: finalPaymentMethod === 'razorpay' ? 'pending' : 'paid',
      address,
      fraudRiskScore: agentDecision.fraudRisk,
      discountApplied: discount,
    };

    const order = await Order.create(orderData);

    emitOrderStatus({
      orderId: order._id.toString(),
      status: order.status,
      user: order.user.toString()
    });

    res.status(201).json({
      success: true,
      order,
      agentAdvice: agentDecision.message,
      suggestedMethod: agentDecision.suggestedMethod
    });

  } catch (err) {
    next(err);
  }
};
// export const createOrder = async (req, res, next) => {
//   try {
//     // 1) Raw extraction (array / string / alternative keys)
//     let items = req.body.items ?? req.body.cart ?? req.body.data ?? [];
//     if (typeof items === 'string') {
//       try { items = JSON.parse(items); } catch { items = []; }
//     }
//     if (!Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ message: 'No items in request' });
//     }

//     // 2) Product ids (support product | _id | id | productId)
//     const ids = items
//       .map(i => i.product || i._id || i.id || i.productId)
//       .filter(Boolean)
//       .map(String);

//     if (ids.length === 0) {
//       return res.status(400).json({ message: 'Items missing product ids' });
//     }

//     // 3) Pull product data to fill missing price/title/image
//     const dbProducts = await Product.find({ _id: { $in: ids } });
//     const map = new Map(dbProducts.map(p => [String(p._id), p]));

//     // 4) Normalize + validate every item
//     const normalized = [];
//     for (const raw of items) {
//       const pid = String(raw.product || raw._id || raw.id || raw.productId || '').trim();
//       if (!pid) continue;

//       const p = map.get(pid);
//       const qty = Math.max(1, Number(raw.qty ?? 1));

//       // prefer client price when valid; else fallback to DB price
//       let price = Number(raw.price);
//       if (!Number.isFinite(price) || price < 0) {
//         price = Number(p?.price ?? 0);
//       }

//       const item = {
//         product: pid,
//         title: raw.title || p?.title || '',
//         sku: raw.sku || (raw.size ? `${pid}-${raw.size}` : 'SKU'),
//         size: raw.size || raw.variants?.[0]?.size || 'free',
//         color: raw.color || raw.variants?.[0]?.color || 'default',
//         image: raw.image || raw.images?.[0] || p?.images?.[0] || '',
//         qty,
//         price
//       };

//       if (!item.product || !Number.isFinite(item.price) || item.price < 0 || item.qty < 1) {
//         // skip invalid item rather than hard-fail
//         continue;
//       }
//       normalized.push(item);
//     }

//     if (normalized.length === 0) {
//       return res.status(400).json({ message: 'No valid items after normalization' });
//     }

//     // 5) Compute server-authoritative total
//     const total = normalized.reduce((s, n) => s + n.price * n.qty, 0);

//     // 6) Create COD order
//     const order = await Order.create({
//       user: req.user._id,
//       items: normalized,
//       total,
//       status: 'pending',
//       cod: true,
//       address: req.body.address || ''
//     });

//     emitOrderStatus({ orderId: order._id.toString(), status: order.status, user: order.user.toString() });
//     return res.status(201).json(order);
//   } catch (err) {
//     next(err);
//   }
// };


export const myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) { next(e); }
};

export const getAllOrders = async (_req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'name email role').sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) { next(e); }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'pending'|'processing'|'shipped'|'delivered'|'cancelled'
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    emitOrderStatus({ orderId: order._id.toString(), status: order.status, user: order.user.toString() });
    res.json(order);
  } catch (e) { next(e); }
};
