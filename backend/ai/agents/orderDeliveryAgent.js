// backend/ai/agents/orderDeliveryAgent.js
import Order from '../../models/Order.js';

export const orderDeliveryAgent = async (userId, message = '') => {
  try {
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('items.product', 'title');

    if (!orders || orders.length === 0) {
      return {
        reply: "You don't have any orders yet. Place your first order to track delivery!",
        status: "no_order"
      };
    }

    const latestOrder = orders[0];
    const shortId = latestOrder._id.toString().slice(-8);

    let reply = `📦 **Order #${shortId}**\n\n`;

    switch (latestOrder.status) {
      case 'pending':
        reply += "🕒 Your order is **Pending**. We are processing it.\nExpected to ship within 24 hours.";
        break;
      case 'processing':
        reply += "🔄 Order is **being packed**. It will be shipped soon.";
        break;
      case 'shipped':
        reply += `🚚 Your order has been **Shipped**!\nEstimated delivery: Tomorrow by 5 PM.`;
        break;
      case 'delivered':
        reply += "✅ Your order has been **Delivered**. Enjoy your purchase!";
        break;
      case 'cancelled':
        reply += "❌ This order was cancelled.";
        break;
      default:
        reply += `Current Status: **${latestOrder.status}**`;
    }

    // Add items summary
    reply += `\n\nItems: ${latestOrder.items.length} product(s)`;
    reply += `\nTotal: ₹${latestOrder.total}`;

    return { reply, order: latestOrder };
  } catch (err) {
    console.error("Order Delivery Agent Error:", err);
    return { reply: "Unable to fetch order details right now. Please check My Orders page." };
  }
};