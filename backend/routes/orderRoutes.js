// import { Router } from 'express';
// import { protect, adminOnly } from '../middlewares/auth.js';
// import { createOrder, myOrders, allOrders, updateStatus } from '../controllers/orderController.js';

// const r = Router();
// r.post('/', protect, createOrder);
// r.get('/mine', protect, myOrders);
// r.get('/', protect, adminOnly, allOrders);
// r.put('/:id/status', protect, adminOnly, updateStatus);
// export default r;


import express from 'express';
import { protect, adminOnly } from '../middlewares/auth.js';
import {
  createOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus as updateStatus   // 👈 alias so the handler is named updateStatus here
} from '../controllers/orderController.js';

const router = express.Router();

// Create COD order
router.post('/', protect, createOrder);

// Current user's orders
router.get('/mine', protect, myOrders);

// Admin: list all orders
router.get('/', protect, adminOnly, getAllOrders);

// Admin: update order status
router.put('/:id/status', protect, adminOnly, updateStatus);  // ✅ your exact line

export default router;
