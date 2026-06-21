// backend/ai/agents/checkoutAgent.js
import Order from '../../models/Order.js';
import Product from '../../models/Product.js';

/**
 * Checkout Decision Agent
 * Analyzes cart and gives smart payment recommendation
 */
// backend/ai/agents/checkoutAgent.js
export const checkoutDecisionAgent = async (cartItems = [], userId = null) => {
  try {
    // Ensure cartItems is always an array
    const items = Array.isArray(cartItems) ? cartItems : [];

    let total = 0;
    const normalizedItems = [];

    for (const item of items) {
      if (!item) continue;
      const price = Number(item.price) || 0;
      const qty = Number(item.qty) || 1;

      total += price * qty;
      normalizedItems.push(item);
    }

    if (normalizedItems.length === 0) {
      return {
        suggestedMethod: "COD",
        message: "Your cart is empty. Add some products first!",
        total: 0,
        fraudRisk: 0
      };
    }

    // Fraud Risk Logic
    let fraudRisk = 30;
    if (total > 5000) fraudRisk += 25;
    if (total > 10000) fraudRisk += 20;

    const isHighRisk = fraudRisk > 65;

    let recommendation = {
      suggestedMethod: isHighRisk ? "COD" : "razorpay",
      canUseCOD: !isHighRisk,
      discountForPrepaid: total > 1500 ? Math.floor(total * 0.05) : 0,
      total,
      finalTotal: total,
      fraudRisk,
      message: ""
    };

    if (isHighRisk) {
      recommendation.message = `⚠️ High value order (₹${total}). We recommend **Cash on Delivery**.`;
    } else if (recommendation.discountForPrepaid > 0) {
      recommendation.finalTotal = total - recommendation.discountForPrepaid;
      recommendation.message = `🎉 Pay with **Razorpay** and get ₹${recommendation.discountForPrepaid} discount!`;
    } else {
      recommendation.message = `✅ Items added! Choose payment:\n1. Cash on Delivery\n2. Online (Razorpay)`;
    }

    return recommendation;
  } catch (error) {
    console.error("Checkout Agent Error:", error);
    return {
      suggestedMethod: "COD",
      message: "Payment options available. Proceed with COD for safety.",
      total: 0
    };
  }
};



