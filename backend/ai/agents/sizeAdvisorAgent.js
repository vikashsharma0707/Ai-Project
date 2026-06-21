// backend/ai/agents/sizeAdvisorAgent.js
import Product from '../../models/Product.js';
import { callOpenRouter } from '../../utils/openrouter.js';

export default async function sizeAdvisorAgent(message) {
  try {
    const products = await Product.find({ isActive: true }).limit(10);

    const systemPrompt = `You are a size advisor for Indian fashion. Use standard Indian sizing.`;

    const userPrompt = `User query: "${message}"\n\nRecommend best size for each product type.`;

    const reply = await callOpenRouter({
      system: systemPrompt,
      user: userPrompt
    });

    return { 
      reply: `📏 **Size Advisor Recommendation**\n\n${reply}\n\nTip: Always check product size chart.` 
    };
  } catch (e) {
    return { 
      reply: `📏 For most Indian customers:\n• Kurti/Top: M\n• Jeans: 32-34\n• Shirt: Medium\n\nTell me your height & weight for better suggestion.` 
    };
  }
}