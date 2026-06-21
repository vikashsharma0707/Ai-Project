// backend/ai/agents/outfitCompleterAgent.js
import Product from '../../models/Product.js';
import { callOpenRouter } from '../../utils/openrouter.js';

export default async function outfitCompleterAgent(message) {
  try {
    const products = await Product.find({ isActive: true }).limit(10);

    const productList = products.map(p => 
      `${p.title} (${p.category}) - ₹${p.price}`
    ).join("\n");

    const systemPrompt = `You are an outfit completer expert.`;

    const userPrompt = `User wants to complete outfit: "${message}"\n\nAvailable products:\n${productList}\n\nSuggest best matching items.`;

    const reply = await callOpenRouter({
      system: systemPrompt,
      user: userPrompt
    });

    return { 
      reply: `🧥 **Outfit Completer**\n\n${reply}` 
    };
  } catch (e) {
    return { 
      reply: "🧥 White shirt ke saath best options:\n• Blue jeans\n• Black trousers\n• Sneakers" 
    };
  }
}