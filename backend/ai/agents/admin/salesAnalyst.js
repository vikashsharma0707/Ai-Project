// backend/ai/agents/admin/salesAnalyst.js
import Order from '../../../models/Order.js';

export default async function salesAnalyst() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const orders = await Order.find({
      createdAt: { $gte: thirtyDaysAgo }
    }).select('total createdAt status');

    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const totalOrders = orders.length;

    let response = `📈 **Sales Report (Last 30 Days)**\n\n`;
    response += `• Total Orders: **${totalOrders}**\n`;
    response += `• Total Revenue: **₹${totalRevenue.toLocaleString('en-IN')}**\n\n`;

    if (totalOrders > 0) {
      response += "**Insight:** Sales are performing well. Keep promoting high-demand categories.";
    } else {
      response += "No orders in last 30 days. Consider running promotions.";
    }

    return { reply: response };
  } catch (e) {
    return { reply: "📈 Sales report could not be generated." };
  }
}