// backend/routes/adminAIRoutes.js
import { Router } from "express";
import { protect, adminOnly } from "../middlewares/auth.js";
import {
  adminAssistant,
  getInventoryReport,
  getSalesReport,
  optimizeProduct,getAIHistory
} from "../controllers/adminAIController.js";

const router = Router();

// Main AI Chat
router.post("/assistant", protect, adminOnly, adminAssistant);

// Direct Agent Routes
router.get("/inventory", protect, adminOnly, getInventoryReport);
router.get("/sales", protect, adminOnly, getSalesReport);
router.post("/optimize", protect, adminOnly, optimizeProduct);
router.get("/history", protect, adminOnly, getAIHistory);


export default router;