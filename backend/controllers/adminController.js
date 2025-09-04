import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const stats = async (_req, res) => {
  const [users, products, orders, delivered] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
    Order.aggregate([{ $match: { status: 'delivered' } }, { $group: { _id: null, revenue: { $sum: '$total' } } }])
  ]);

  const lowStock = await Product.aggregate([
    { $unwind: { path: '$variants', preserveNullAndEmptyArrays: true } },
    { $match: { 'variants.stock': { $lte: 5 } } },
    { $project: { _id: 0, title: 1, sku: '$variants.sku', stock: '$variants.stock' } },
    { $limit: 10 }
  ]);

  res.json({
    users,
    products,
    orders,
    revenue: delivered[0]?.revenue || 0,
    lowStock
  });
};
