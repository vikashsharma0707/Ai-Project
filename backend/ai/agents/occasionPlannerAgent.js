// backend/ai/agents/occasionPlannerAgent.js
import Product from '../../models/Product.js';
import { callOpenRouter } from '../../utils/openrouter.js';

export default async function occasionPlannerAgent(message) {
  try {
    const products = await Product.find({ isActive: true }).limit(12);

    const productList = products.map(p => 
      `${p.title} (${p.category}) - ₹${p.price}`
    ).join("\n");

    const systemPrompt = `You are an Indian festival & occasion fashion expert.`;

    const userPrompt = `User said: "${message}"\n\nAvailable products:\n${productList}\n\nSuggest best outfits for this occasion.`;

    const reply = await callOpenRouter({
      system: systemPrompt,
      user: userPrompt
    });

    return { 
      reply: `🎉 **Occasion Planner**\n\n${reply}` 
    };
  } catch (e) {
    return { reply: "🎉 Tell me the occasion (Wedding, Festival, Office Party, etc.)" };
  }
}