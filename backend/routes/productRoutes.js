// import { Router } from 'express';
// import { list, getById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
// import { protect, adminOnly } from '../middlewares/auth.js';
// import { upload } from '../middlewares/upload.js';
// // import { protect } from '../middlewares/auth.js';
// import { getReviews, reviewEligible, createOrUpdateReview } from '../controllers/productController.js';

// const r = Router();
// r.get('/', list);
// r.get('/:id', getById);
// r.post('/', protect, adminOnly, upload.array('images', 6), createProduct);
// r.put('/:id', protect, adminOnly, upload.array('images', 6), updateProduct);
// r.delete('/:id', protect, adminOnly, deleteProduct);
// // Reviews
// router.get('/:id/reviews', getReviews);
// router.get('/:id/reviews/eligible', protect, reviewEligible);
// router.post('/:id/reviews', protect, createOrUpdateReview);

// export default r;


import { Router } from 'express';
import {
  list,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  getReviews,
  reviewEligible,
  createOrUpdateReview
} from '../controllers/productController.js';
import { protect, adminOnly } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

const r = Router();

// Products
r.get('/', list);
r.get('/:id', getById);
r.post('/', protect, adminOnly, upload.array('images', 6), createProduct);
r.put('/:id', protect, adminOnly, upload.array('images', 6), updateProduct);
r.delete('/:id', protect, adminOnly, deleteProduct);

// Reviews
r.get('/:id/reviews', getReviews);
r.get('/:id/reviews/eligible', protect, reviewEligible);
r.post('/:id/reviews', protect, createOrUpdateReview);


r.put("/products/:id", protect, async (req, res, next) => {
  try {
    const num = Number(req.body.price);
    if (!Number.isFinite(num) || num <= 0) return res.status(400).json({ ok:false, error:"Invalid price" });

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ ok:false, error:"Product not found" });

    product.price = Math.round(num);
    await product.save();
    res.json({ ok:true, product });
  } catch (e) { next(e); }
});

export default r;
