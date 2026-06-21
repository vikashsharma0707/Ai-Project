// // backend/services/razorpayService.js
// import Razorpay from 'razorpay';
// import dotenv from 'dotenv';
// dotenv.config();

// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID,
// //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // });

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export const createRazorpayOrder = async (amount, receipt) => {
//   return await razorpay.orders.create({
//     amount: Math.round(amount * 100),
//     currency: "INR",
//     receipt,
//   });
// };

// export default razorpay;



// backend/services/razorpayService.js
import Razorpay from 'razorpay';

let razorpayInstance = null;

const initRazorpay = () => {
  if (razorpayInstance) return razorpayInstance;

  const key_id = process.env.RAZORPAY_KEY_ID?.trim();
  const key_secret = process.env.RAZORPAY_KEY_SECRET?.trim();

  if (!key_id || !key_secret) {
    console.warn("⚠️ Razorpay keys not configured. Using Mock Mode for development.");
    return null;
  }

  console.log("✅ Razorpay initialized successfully");
  razorpayInstance = new Razorpay({
    key_id,
    key_secret,
  });

  return razorpayInstance;
};

export const createRazorpayOrder = async (amount, receipt = `receipt_${Date.now()}`) => {
  try {
    const razorpay = initRazorpay();

    // Mock mode if keys are not set (Docker / Development)
    if (!razorpay) {
      return {
        id: `order_mock_${Date.now()}`,
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt,
        status: "created",
        mock: true
      };
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt,
    });

    return order;
  } catch (error) {
    console.error("Razorpay Error:", error.message);
    throw new Error("Failed to create payment order");
  }
};

export default { createRazorpayOrder };