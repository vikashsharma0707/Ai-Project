// backend/ai/agents/giftSuggesterAgent.js
import Product from '../../models/Product.js';
import { callOpenRouter } from '../../utils/openrouter.js';

export default async function giftSuggesterAgent(message) {
  try {
    const products = await Product.find({ isActive: true }).limit(10);

    const productList = products.map(p => 
      `${p.title} (${p.brand}) - ₹${p.price}`
    ).join("\n");

    const systemPrompt = `You are a thoughtful gift suggester for Indian customers.`;

    const userPrompt = `Gift request: "${message}"\n\nAvailable products:\n${productList}\n\nSuggest best gifts.`;

    const reply = await callOpenRouter({
      system: systemPrompt,
      user: userPrompt
    });

    return { 
      reply: `🎁 **Gift Suggester**\n\n${reply}` 
    };
  } catch (e) {
    return { reply: "🎁 Tell me for whom and occasion, I'll suggest perfect gifts!" };
  }
}