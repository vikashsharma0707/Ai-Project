// backend/ai/agents/budgetShopperAgent.js
import Product from '../../models/Product.js';
import { callOpenRouter } from '../../utils/openrouter.js';

export default async function budgetShopperAgent(message) {
  try {
    // Extract budget if mentioned
    const budgetMatch = message.match(/under\s*(\d+)/i);
    const maxPrice = budgetMatch ? parseInt(budgetMatch[1]) : 1500;

    const products = await Product.find({ 
      price: { $lte: maxPrice },
      isActive: true 
    })
    .sort({ ratingAvg: -1, price: 1 })
    .limit(10);

    const productList = products.map(p => 
      `${p.title} - ₹${p.price} (${p.brand})`
    ).join("\n");

    const systemPrompt = `You are a smart budget shopping assistant.`;

    const userPrompt = `User wants best products under ₹${maxPrice}.\n\nProducts:\n${productList}\n\nRecommend top 4-5 best value products.`;

    const reply = await callOpenRouter({
      system: systemPrompt,
      user: userPrompt
    });

    return { 
      reply: `💰 **Budget Shopper** (Under ₹${maxPrice})\n\n${reply}` 
    };
  } catch (e) {
    return { reply: "💰 Best budget picks are ready! Tell me your budget." };
  }
}