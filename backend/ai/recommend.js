import Product from '../models/Product.js';

export const stubRecommend = async (productId) => {
  const one = await Product.findById(productId);
  if (!one) return [];
  const items = await Product.find({
    _id: { $ne: productId },
    $or: [{ brand: one.brand }, { category: one.category }]
  }).limit(8);
  return items;
};
