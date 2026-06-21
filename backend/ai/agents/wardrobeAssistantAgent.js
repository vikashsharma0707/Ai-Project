// backend/ai/agents/wardrobeAssistantAgent.js
import Product from '../../models/Product.js';
import { callOpenRouter } from '../../utils/openrouter.js';

export default async function wardrobeAssistantAgent(message) {
  try {
    const products = await Product.find({ isActive: true }).limit(10);

    const productList = products.map(p => 
      `${p.title} (${p.brand} - ${p.category})`
    ).join("\n");

    const systemPrompt = `You are a wardrobe stylist. Help user match new clothes with what they already have.`;

    const userPrompt = `User said: "${message}"\n\nAvailable products in store:\n${productList}\n\nSuggest matching items.`;

    const reply = await callOpenRouter({
      system: systemPrompt,
      user: userPrompt
    });

    return { 
      reply: `👕 **Wardrobe Assistant**\n\n${reply}` 
    };
  } catch (e) {
    return { 
      reply: "👕 Batao aapke paas kya hai (jeans, shirt, etc.), main best matching suggest karunga!" 
    };
  }
}