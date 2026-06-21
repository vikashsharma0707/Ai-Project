// backend/ai/agents/trendSpotterAgent.js
import Product from '../../models/Product.js';
import { callOpenRouter } from '../../utils/openrouter.js';

export default async function trendSpotterAgent(message) {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ ratingAvg: -1 })
      .limit(12);

    const productList = products.map(p => 
      `${p.title} (${p.brand}) - ₹${p.price}`
    ).join("\n");

    const systemPrompt = `You are a fashion trend analyst for Indian market.`;

    const userPrompt = `Current trends query: "${message}"\n\nPopular products:\n${productList}\n\nTell current trending styles.`;

    const reply = await callOpenRouter({
      system: systemPrompt,
      user: userPrompt
    });

    return { 
      reply: `🔥 **Trend Spotter**\n\n${reply}` 
    };
  } catch (e) {
    return { 
      reply: "🔥 Summer 2026 Trends: Oversized shirts, Pastel colors, Cargo pants, Co-ord sets!" 
    };
  }
}