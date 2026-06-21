// backend/ai/agents/paymentAgent.js
import { createRazorpayOrder } from '../../services/razorpayService.js';

export const paymentAgent = async (userId, amount) => {
  const receipt = `receipt_${Date.now()}`;
  const rzpOrder = await createRazorpayOrder(amount, receipt);

  return {
    key: process.env.RAZORPAY_KEY_ID,
    amount: rzpOrder.amount,
    currency: rzpOrder.currency,
    order_id: rzpOrder.id,
    receipt
  };
};