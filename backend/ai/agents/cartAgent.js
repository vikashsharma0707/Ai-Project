// backend/ai/agents/cartAgent.js
import Cart from '../../models/Cart.js';
import Product from '../../models/Product.js';

export const addToCartAgent = async (userId, productId, size = 'M', qty = 1) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = new Cart({ user: userId, items: [] });

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  const existing = cart.items.findIndex(item => 
    item.product.toString() === productId && item.size === size
  );

  if (existing > -1) {
    cart.items[existing].qty += qty;
  } else {
    cart.items.push({
      product: productId,
      size,
      price: product.price,
      qty
    });
  }

  await cart.save();
  return { success: true, message: `${product.title} (Size: ${size}) added to cart` };
};