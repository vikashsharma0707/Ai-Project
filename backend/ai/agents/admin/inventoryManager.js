// backend/ai/agents/admin/inventoryManager.js
import Product from '../../../models/Product.js';

export default async function inventoryManager() {
  try {
    const lowStockProducts = await Product.find({
      $or: [
        { stock: { $lt: 15 } },
        { 'variants.stock': { $lt: 8 } }
      ],
      isActive: true
    })
    .select('title brand price stock category variants images')
    .limit(12)
    .lean();

    if (lowStockProducts.length === 0) {
      return { 
        reply: "✅ **All Good!**\n\nNo critical low stock items found. Your inventory is healthy." 
      };
    }

    let response = `📦 **Inventory Manager**\n\n**Low Stock Products (${lowStockProducts.length})**\n\n`;

    lowStockProducts.forEach((p, i) => {
      const stock = p.stock !== undefined ? p.stock : 
                   (p.variants && p.variants[0] ? p.variants[0].stock : 0);
      response += `${i+1}. **${p.title}** (${p.brand})\n`;
      response += `   Stock: **${stock}** | Price: ₹${p.price}\n\n`;
    });

    response += "**Recommendation:**\nRestock the top items immediately to avoid stockouts.";

    return { reply: response };
  } catch (e) {
    console.error(e);
    return { reply: "📦 Unable to fetch inventory data right now." };
  }
}