// backend/controllers/chatController.js
import { shoppingAgent } from '../ai/agents/shoppingAgent.js';
import { addToCartAgent } from '../ai/agents/cartAgent.js';
import { checkoutDecisionAgent } from '../ai/agents/checkoutAgent.js';
import { paymentAgent } from '../ai/agents/paymentAgent.js';

export const handleChat = async (req, res) => {
  try {
    const { message, userId } = req.body;
    const lowerMsg = message.toLowerCase();

    // 1. Shopping + Add to Cart Intent
    if (lowerMsg.includes("order") || lowerMsg.includes("add") || lowerMsg.includes("shirt") || lowerMsg.includes("buy")) {
      const product = await shoppingAgent(message);

      if (!product) {
        return res.json({ reply: "Sorry, I couldn't find that product. Try another search." });
      }

      // Auto add to cart (default size M if not specified)
      const sizeMatch = message.match(/size\s*([A-Z0-9]+)/i);
      const size = sizeMatch ? sizeMatch[1].toUpperCase() : "M";

      await addToCartAgent(userId, product._id, size);

      const cartTotal = product.price; // For single item demo
      const decision = checkoutDecisionAgent(cartTotal);

      return res.json({
        reply: decision.message,
        action: "show_payment_options",
        productAdded: product.title
      });
    }

    // 2. Payment Choice
    if (lowerMsg.includes("online") || lowerMsg.includes("razorpay") || lowerMsg.includes("2")) {
      // Get current cart total (you can improve this)
      const total = 1999; // Replace with real cart total logic
      const paymentData = await paymentAgent(userId, total);

      return res.json({
        reply: "Opening Razorpay payment...",
        action: "open_razorpay",
        paymentData
      });
    }

    if (lowerMsg.includes("cod") || lowerMsg.includes("1")) {
      return res.json({
        reply: "✅ Order placed with Cash on Delivery! You can track it in My Orders.",
        action: "cod_success"
      });
    }

    // Default
    return res.json({ reply: "I'm here to help! Try: 'Order Nike shirt size M'" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Something went wrong. Please try again." });
  }
};