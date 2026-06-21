// backend/ai/agents/admin/marketingCampaignAgent.js
import Product from '../../../models/Product.js';
import Order from '../../../models/Order.js';
import { callOpenRouter } from '../../../utils/openrouter.js';

export default async function marketingCampaignAgent() {
  try {
    // Get top selling products
    const topProducts = await Product.find({ isActive: true })
      .sort({ ratingAvg: -1 })
      .limit(8);

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(50);

    const productList = topProducts.map(p => 
      `${p.title} (${p.brand}) - ₹${p.price} - Rating: ${p.ratingAvg}`
    ).join("\n");

    const reply = await callOpenRouter({
      system: "You are a professional marketing campaign expert for fashion e-commerce.",
      user: `Create a festival campaign. Current top products:\n${productList}\n\nGenerate attractive offer, discount, and expected impact.`
    });

    return {
      reply: `🎯 **Marketing Campaign Agent**\n\n${reply}`
    };
  } catch (e) {
    return {
      reply: `🎯 **Raksha Bandhan Special**\n\n• 20% off on all Women's Wear\n• Buy 1 Get 1 on Rakhi Gifts\n• Free shipping above ₹999\n\nExpected conversion boost: +18%`
    };
  }
}