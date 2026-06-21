// routes/Virtualtryonroutes.js
import express from 'express';
import { tryOnUpload, virtualTryOn } from '../controllers/Virtualtryoncontroller.js';
import { protect } from '../middlewares/auth.js'; // adjust to your actual export name if different

const router = express.Router();

// POST /api/ai/virtual-try-on
// multipart/form-data with fields: person_image, garment_image
router.post('/virtual-try-on', protect, tryOnUpload, virtualTryOn);

export default router;