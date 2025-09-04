import { Router } from 'express';
import { protect, adminOnly } from '../middlewares/auth.js';
import { stats } from '../controllers/adminController.js';

const r = Router();
r.get('/stats', protect, adminOnly, stats);
export default r;
