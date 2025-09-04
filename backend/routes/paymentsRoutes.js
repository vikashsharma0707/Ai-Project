// import { Router } from 'express';
// import { protect } from '../middlewares/auth.js';
// import {
//   getRazorpayConfig,
//   createRazorpayOrder,
//   verifyAndCreateOrder
// } from '../controllers/paymentsController.js';

// const router = Router();

// // Public key for frontend (protected so only logged-in users)
// router.get('/razorpay/config', protect, getRazorpayConfig);

// // Create Razorpay order (server computes total)
// router.post('/razorpay/order', protect, createRazorpayOrder);

// // Verify signature and create prepaid order
// router.post('/razorpay/verify', protect, verifyAndCreateOrder);

// export default router;

import { Router } from 'express';
import { getKey, createPaymentOrder, verifyPayment } from '../controllers/paymentsController.js';
import { protect } from '../middlewares/auth.js';

const r = Router();

r.get('/key', getKey);                            // gives public key to FE
r.post('/order', protect, createPaymentOrder);    // create Razorpay order
r.post('/verify', protect, verifyPayment);        // verify after success

export default r;
