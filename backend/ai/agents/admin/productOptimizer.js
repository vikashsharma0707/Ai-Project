// backend/ai/agents/admin/productOptimizer.js
import Product from '../../../models/Product.js';
import { callOpenRouter } from '../../../utils/openrouter.js';

export default async function productOptimizer(req) {
  try {
    const { productId } = req.body || {};

    let product;

    if (productId) {
      product = await Product.findById(productId);
    } else {
      // Get a random or top product if no ID provided
      product = await Product.findOne({ isActive: true })
        .sort({ ratingAvg: -1, createdAt: -1 });
    }

    if (!product) {
      return { 
        reply: "❌ Product not found. Please provide a valid Product ID or try again." 
      };
    }

    // Rich product data for LLM
    const productContext = `
Title: ${product.title}
Brand: ${product.brand}
Category: ${product.category}
Current Price: ₹${product.price}
Old Price: ₹${product.oldPrice || 'N/A'}
Description: ${product.description || 'No description available'}
Rating: ${product.ratingAvg || 0} (${product.ratingCount || 0} reviews)
`;

    const systemPrompt = `You are an expert e-commerce product optimizer for a fashion store like Myntra.`;

    const userPrompt = `Optimize the following product for better conversion, SEO, and sales:

${productContext}

Provide:
1. Improved catchy title (max 70 chars)
2. Better description (150-200 words, persuasive)
3. SEO keywords/tags (8-10)
4. Suggested price (with reasoning)
5. Any other improvement tips`;

    const optimized = await callOpenRouter({
      system: systemPrompt,
      user: userPrompt,
      model: "openai/gpt-4o-mini"
    });

    return {
      reply: `🏷️ **Product Optimization Report**\n\n**Product:** ${product.title}\n\n${optimized}`,
      productId: product._id,
      optimizedTitle: product.title // You can parse LLM response for structured data later
    };

  } catch (e) {
    console.error("Product Optimizer Error:", e);
    return { 
      reply: "🏷️ Product optimization service is temporarily unavailable. Please try again later." 
    };
  }
}