// backend/ai/agents/personalStylistAgent.js
import Product from '../../models/Product.js';
import { callOpenRouter } from '../../utils/openrouter.js';

export default async function personalStylistAgent(message, userId) {
  try {
    const products = await Product.find({ isActive: true }).limit(12);

    const productList = products.map(p => 
      `${p.title} (${p.brand}) - ₹${p.price} [${p.category}]`
    ).join("\n");

    const systemPrompt = `You are a professional fashion stylist for Indian market.`;

    const userPrompt = `User wants styling advice: "${message}"\n\nAvailable products:\n${productList}\n\nGive 3-4 outfit suggestions with product names.`;

    const reply = await callOpenRouter({
      system: systemPrompt,
      user: userPrompt,
      model: "openai/gpt-4o-mini"
    });

    return { reply: `👗 **Personal Stylist**\n\n${reply}` };
  } catch (e) {
    return { reply: "👗 I can suggest complete looks! Tell me occasion, budget & preference." };
  }
}