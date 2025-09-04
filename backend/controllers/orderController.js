// import Order from '../models/Order.js';
// import Product from '../models/Product.js';
// import { emitOrderStatus } from '../utils/socket.js';

// export const createOrder = async (req, res) => {
//   const { items = [], address = '' } = req.body;
//   if (!items.length) return res.status(400).json({ message: 'No items' });

//   // Recompute price from DB for trust
//   const ids = items.map(i => i.product);
//   const dbProducts = await Product.find({ _id: { $in: ids } });
//   const priceMap = new Map(dbProducts.map(p => [String(p._id), p]));

//   const enriched = items.map(it => {
//     const p = priceMap.get(String(it.product));
//     const price = it.price && it.price > 0 ? it.price : (p?.price || 0);
//     const image = it.image || p?.images?.[0] || '';
//     return { ...it, title: it.title || p?.title || '', price, image };
//   });

//   const total = enriched.reduce((s, i) => s + i.price * i.qty, 0);

//   const order = await Order.create({
//     user: req.user._id,
//     items: enriched,
//     total,
//     cod: true,
//     address,
//     status: 'pending'
//   });

//   res.status(201).json(order);
// };

// export const myOrders = async (req, res) => {
//   const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
//   res.json(orders);
// };

// export const allOrders = async (_req, res) => {
//   const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
//   res.json(orders);
// };

// export const updateStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   const order = await Order.findById(id);
//   if (!order) return res.status(404).json({ message: 'Order not found' });
//   order.status = status || order.status;
//   await order.save();
//   emitOrderStatus({ orderId: order._id, status: order.status, userId: order.user });
//   res.json(order);
// };


// COD-only Orders controller
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { emitOrderStatus } from '../utils/socket.js';



export const createOrder = async (req, res, next) => {
  try {
    // 1) Raw extraction (array / string / alternative keys)
    let items = req.body.items ?? req.body.cart ?? req.body.data ?? [];
    if (typeof items === 'string') {
      try { items = JSON.parse(items); } catch { items = []; }
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items in request' });
    }

    // 2) Product ids (support product | _id | id | productId)
    const ids = items
      .map(i => i.product || i._id || i.id || i.productId)
      .filter(Boolean)
      .map(String);

    if (ids.length === 0) {
      return res.status(400).json({ message: 'Items missing product ids' });
    }

    // 3) Pull product data to fill missing price/title/image
    const dbProducts = await Product.find({ _id: { $in: ids } });
    const map = new Map(dbProducts.map(p => [String(p._id), p]));

    // 4) Normalize + validate every item
    const normalized = [];
    for (const raw of items) {
      const pid = String(raw.product || raw._id || raw.id || raw.productId || '').trim();
      if (!pid) continue;

      const p = map.get(pid);
      const qty = Math.max(1, Number(raw.qty ?? 1));

      // prefer client price when valid; else fallback to DB price
      let price = Number(raw.price);
      if (!Number.isFinite(price) || price < 0) {
        price = Number(p?.price ?? 0);
      }

      const item = {
        product: pid,
        title: raw.title || p?.title || '',
        sku: raw.sku || (raw.size ? `${pid}-${raw.size}` : 'SKU'),
        size: raw.size || raw.variants?.[0]?.size || 'free',
        color: raw.color || raw.variants?.[0]?.color || 'default',
        image: raw.image || raw.images?.[0] || p?.images?.[0] || '',
        qty,
        price
      };

      if (!item.product || !Number.isFinite(item.price) || item.price < 0 || item.qty < 1) {
        // skip invalid item rather than hard-fail
        continue;
      }
      normalized.push(item);
    }

    if (normalized.length === 0) {
      return res.status(400).json({ message: 'No valid items after normalization' });
    }

    // 5) Compute server-authoritative total
    const total = normalized.reduce((s, n) => s + n.price * n.qty, 0);

    // 6) Create COD order
    const order = await Order.create({
      user: req.user._id,
      items: normalized,
      total,
      status: 'pending',
      cod: true,
      address: req.body.address || ''
    });

    emitOrderStatus({ orderId: order._id.toString(), status: order.status, user: order.user.toString() });
    return res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};


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
