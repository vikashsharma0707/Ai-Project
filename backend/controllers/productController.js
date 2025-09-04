// // import Product from '../models/Product.js';
// // import { emitInventoryChanged, emitPriceDrop } from '../utils/socket.js';
// // import Review from '../models/Review.js';
// // import Order from '../models/Order.js';
// // // import Product from '../models/Product.js'; // if not already imported here


// // // build filter from query
// // const buildQuery = (q) => {
// //   const filter = {};
// //   if (q.brand) filter.brand = q.brand;
// //   if (q.category) filter.category = q.category;
// //   if (q.q) filter.$text = { $search: q.q };
// //   return filter;
// // };

// // export const list = async (req, res) => {
// //   const { page = 1, limit = 12 } = req.query;
// //   const filter = buildQuery(req.query);
// //   const cursor = Product.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
// //   const [items, total] = await Promise.all([cursor.exec(), Product.countDocuments(filter)]);
// //   res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
// // };

// // export const getById = async (req, res) => {
// //   const p = await Product.findById(req.params.id);
// //   if (!p) return res.status(404).json({ message: 'Product not found' });
// //   res.json(p);
// // };

// // function extractImagePaths(req) {
// //   if (!req.files || !req.files.length) return [];
// //   return req.files.map((f) => `/uploads/${f.filename}`);
// // }

// // function validateBase(body) {
// //   const { title, brand, category, price } = body;
// //   if (!title || !brand || !category || !(price > 0)) throw new Error('Title, Brand, Category, Price (>0) required');
// // }

// // function parseVariants(body) {
// //   // variants can arrive as JSON string or array of objects
// //   const v = typeof body.variants === 'string' ? JSON.parse(body.variants || '[]') : (body.variants || []);
// //   return Array.isArray(v) ? v : [];
// // }

// // export const createProduct = async (req, res) => {
// //   try {
// //     validateBase(req.body);
// //     const images = [...(req.body.images || []), ...extractImagePaths(req)];
// //     const variants = parseVariants(req.body);

// //     const p = await Product.create({
// //       title: req.body.title,
// //       brand: req.body.brand,
// //       category: req.body.category,
// //       description: req.body.description || '',
// //       images,
// //       price: Number(req.body.price),
// //       oldPrice: Number(req.body.oldPrice || 0),
// //       variants
// //     });

// //     emitInventoryChanged({ productId: p._id, variants: p.variants });
// //     res.status(201).json(p);
// //   } catch (e) {
// //     res.status(400).json({ message: e.message });
// //   }
// // };

// // export const updateProduct = async (req, res) => {
// //   try {
// //     validateBase(req.body);
// //     const images = extractImagePaths(req);
// //     const variants = parseVariants(req.body);

// //     const before = await Product.findById(req.params.id);
// //     if (!before) return res.status(404).json({ message: 'Product not found' });

// //     const updated = await Product.findByIdAndUpdate(
// //       req.params.id,
// //       {
// //         title: req.body.title,
// //         brand: req.body.brand,
// //         category: req.body.category,
// //         description: req.body.description || '',
// //         images: images.length ? [...before.images, ...images] : before.images,
// //         price: Number(req.body.price),
// //         oldPrice: Number(req.body.oldPrice || before.oldPrice || 0),
// //         variants: variants.length ? variants : before.variants,
// //         isActive: req.body.isActive !== undefined ? req.body.isActive : before.isActive
// //       },
// //       { new: true, runValidators: true }
// //     );

// //     if (updated.price < (before.price || 0)) emitPriceDrop({ productId: updated._id, price: updated.price });
// //     res.json(updated);
// //   } catch (e) {
// //     res.status(400).json({ message: e.message });
// //   }
// // };

// // export const deleteProduct = async (req, res) => {
// //   const p = await Product.findByIdAndDelete(req.params.id);
// //   if (!p) return res.status(404).json({ message: 'Product not found' });
// //   res.json({ message: 'Deleted' });
// // };


// // // GET /api/products/:id/reviews  -> list + star breakdown
// // export const getReviews = async (req, res, next) => {
// //   try {
// //     const productId = req.params.id;
// //     const reviews = await Review.find({ product: productId })
// //       .sort('-createdAt')
// //       .populate('user', 'name');

// //     // breakdown 1..5 + avg
// //     const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
// //     let sum = 0;
// //     reviews.forEach(r => { dist[r.rating]++; sum += r.rating; });
// //     const count = reviews.length;
// //     const avg = count ? +(sum / count).toFixed(2) : 0;

// //     res.json({ reviews, stats: { count, avg, dist } });
// //   } catch (e) { next(e); }
// // };

// // // GET /api/products/:id/reviews/eligible  (protect)
// // export const reviewEligible = async (req, res, next) => {
// //   try {
// //     const productId = req.params.id;
// //     // Only if user has an order with this product and not cancelled
// //     const hasOrder = await Order.exists({
// //       user: req.user._id,
// //       'items.product': productId,
// //       status: { $in: ['shipped', 'delivered'] } // tighten as you like
// //     });
// //     res.json({ eligible: !!hasOrder });
// //   } catch (e) { next(e); }
// // };

// // // POST /api/products/:id/reviews  (protect)
// // export const createOrUpdateReview = async (req, res, next) => {
// //   try {
// //     const productId = req.params.id;
// //     const { rating, comment = '' } = req.body;

// //     if (!rating) return res.status(400).json({ message: 'Rating required' });

// //     const hasOrder = await Order.exists({
// //       user: req.user._id,
// //       'items.product': productId,
// //       status: { $in: ['shipped', 'delivered'] }
// //     });
// //     if (!hasOrder) return res.status(403).json({ message: 'Purchase required to review' });

// //     // upsert: user can edit their review
// //     const review = await Review.findOneAndUpdate(
// //       { product: productId, user: req.user._id },
// //       { rating, comment },
// //       { new: true, upsert: true, setDefaultsOnInsert: true }
// //     );

// //     // recompute product rating
// //     const agg = await Review.aggregate([
// //       { $match: { product: new mongoose.Types.ObjectId(productId) } },
// //       { $group: { _id: '$product', count: { $sum: 1 }, avg: { $avg: '$rating' } } }
// //     ]);
// //     const stats = agg[0] || { count: 0, avg: 0 };
// //     await Product.findByIdAndUpdate(productId, {
// //       ratingCount: stats.count,
// //       ratingAvg: Number(stats.avg || 0).toFixed ? Number(stats.avg).toFixed(2) : stats.avg
// //     });

// //     res.status(201).json(review);
// //   } catch (e) { next(e); }
// // };


// import Product from '../models/Product.js';
// import Review from '../models/Review.js';
// import slugify from 'slugify';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const escapeRx = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// const normalizeCategory = (c) => {
//   c = String(c || '').toLowerCase().trim();
//   if (['men', 'mens', 'man', 'male'].includes(c)) return 'men';
//   if (['women', 'womens', 'woman', 'female'].includes(c)) return 'women';
//   if (['kids', 'kid', 'child', 'children'].includes(c)) return 'kids';
//   if (['all', ''].includes(c)) return '';
//   return c;
// };

// // ---------- LIST WITH FILTERS ----------
// export const list = async (req, res, next) => {
//   try {
//     let {
//       q = '',
//       brand = '',
//       category = '',
//       page = 1,
//       limit = 20,
//       priceMin = '',
//       priceMax = '',
//       sort = ''
//     } = req.query;

//     page = Math.max(1, parseInt(page));
//     limit = Math.min(60, Math.max(1, parseInt(limit)));
//     const skip = (page - 1) * limit;

//     const filter = { isActive: { $ne: false } };

//     if (q) {
//       const rx = new RegExp(escapeRx(q.trim()), 'i');
//       filter.$or = [{ title: rx }, { brand: rx }, { category: rx }, { description: rx }];
//     }

//     if (brand) {
//       const arr = String(brand).split(',').map((s) => s.trim()).filter(Boolean);
//       if (arr.length) filter.brand = { $in: arr };
//     }

//     if (category) {
//       const c = normalizeCategory(category);
//       if (c) filter.category = new RegExp(`^${escapeRx(c)}$`, 'i'); // case-insensitive exact match
//     }

//     const min = Number(priceMin);
//     const max = Number(priceMax);
//     if (!Number.isNaN(min) || !Number.isNaN(max)) {
//       filter.price = {};
//       if (!Number.isNaN(min)) filter.price.$gte = min;
//       if (!Number.isNaN(max)) filter.price.$lte = max;
//     }

//     const sortMap = {
//       new: { createdAt: -1 },
//       price_asc: { price: 1 },
//       price_desc: { price: -1 },
//       rating: { ratingAvg: -1, ratingCount: -1 },
//       popular: { ratingCount: -1, createdAt: -1 }
//     };
//     const sortObj = sortMap[String(sort).toLowerCase()] || { createdAt: -1 };

//     const [items, total] = await Promise.all([
//       Product.find(filter).sort(sortObj).skip(skip).limit(limit),
//       Product.countDocuments(filter)
//     ]);

//     res.json({ items, total, page, pages: Math.ceil(total / limit) });
//   } catch (e) {
//     next(e);
//   }
// };

// // ---------- GET BY ID ----------
// export const getById = async (req, res, next) => {
//   try {
//     const p = await Product.findById(req.params.id);
//     if (!p) return res.status(404).json({ message: 'Product not found' });
//     res.json(p);
//   } catch (e) {
//     next(e);
//   }
// };

// // validate variants: unique sku, price/stock >= 0
// const validateVariants = (variants = []) => {
//   const seen = new Set();
//   for (const v of variants) {
//     if (!v.sku) throw new Error('Variant SKU required');
//     if (seen.has(v.sku)) throw new Error('Duplicate SKU detected in variants');
//     seen.add(v.sku);
//     if (v.price < 0 || v.stock < 0) throw new Error('Variant price/stock must be >= 0');
//   }
// };

// // ---------- CREATE ----------
// export const createProduct = async (req, res, next) => {
//   try {
//     const { title, brand, category, description, price, oldPrice, variants } = req.body;

//     if (!title || !brand || !category || !(price > 0)) {
//       return res.status(400).json({ message: 'Title, Brand, Category and Price are required' });
//     }

//     let parsedVariants = [];
//     if (variants) {
//       parsedVariants = Array.isArray(variants) ? variants : JSON.parse(variants);
//       validateVariants(parsedVariants);
//     }

//     const imgs = (req.files || []).map((f) => `/uploads/${path.basename(f.path)}`);

//     const doc = await Product.create({
//       title,
//       brand,
//       category,
//       description: description || '',
//       images: imgs,
//       price,
//       oldPrice: oldPrice || undefined,
//       variants: parsedVariants,
//       isActive: true,
//       slug: `${slugify(title, { lower: true })}-${Date.now().toString().slice(-6)}`
//     });

//     res.status(201).json(doc);
//   } catch (e) {
//     next(e);
//   }
// };

// // ---------- UPDATE ----------
// export const updateProduct = async (req, res, next) => {
//   try {
//     const { title, brand, category, description, price, oldPrice, variants, isActive } = req.body;

//     const update = {};
//     if (title) update.title = title;
//     if (brand) update.brand = brand;
//     if (category) update.category = category;
//     if (description !== undefined) update.description = description;
//     if (price !== undefined) {
//       if (!(price > 0)) return res.status(400).json({ message: 'Price must be > 0' });
//       update.price = price;
//     }
//     if (oldPrice !== undefined) update.oldPrice = oldPrice;
//     if (isActive !== undefined) update.isActive = !!isActive;

//     if (variants) {
//       const parsed = Array.isArray(variants) ? variants : JSON.parse(variants);
//       validateVariants(parsed);
//       update.variants = parsed;
//     }

//     // append new images (if any)
//     if (req.files && req.files.length) {
//       const imgs = (req.files || []).map((f) => `/uploads/${path.basename(f.path)}`);
//       update.$push = { images: { $each: imgs } };
//     }

//     const doc = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
//     if (!doc) return res.status(404).json({ message: 'Product not found' });
//     res.json(doc);
//   } catch (e) {
//     next(e);
//   }
// };

// // ---------- DELETE ----------
// export const deleteProduct = async (req, res, next) => {
//   try {
//     const out = await Product.findByIdAndDelete(req.params.id);
//     if (!out) return res.status(404).json({ message: 'Product not found' });
//     res.json({ success: true });
//   } catch (e) {
//     next(e);
//   }
// };

// // ---------- REVIEWS ----------
// export const getReviews = async (req, res, next) => {
//   try {
//     const list = await Review.find({ product: req.params.id }).populate('user', 'name');
//     res.json(list);
//   } catch (e) {
//     next(e);
//   }
// };

// // user can review only if they have an order for the product (simple stub check allowed)
// export const reviewEligible = async (_req, res) => {
//   res.json({ eligible: true }); // keep simple for demo; integrate order check if needed
// };

// export const createOrUpdateReview = async (req, res, next) => {
//   try {
//     const { rating, comment } = req.body;
//     const userId = req.user._id;
//     const productId = req.params.id;

//     if (!(rating >= 1 && rating <= 5)) return res.status(400).json({ message: 'Rating must be 1..5' });

//     const existing = await Review.findOne({ product: productId, user: userId });
//     if (existing) {
//       existing.rating = rating;
//       existing.comment = comment || '';
//       await existing.save();
//     } else {
//       await Review.create({ product: productId, user: userId, rating, comment: comment || '' });
//     }

//     // update product aggregates
//     const agg = await Review.aggregate([
//       { $match: { product: Product.castObjectId(productId) } },
//       { $group: { _id: '$product', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
//     ]);

//     const { avg = 0, count = 0 } = agg[0] || {};
//     await Product.findByIdAndUpdate(productId, { ratingAvg: avg, ratingCount: count });

//     res.json({ success: true });
//   } catch (e) {
//     next(e);
//   }
// };


import Product from '../models/Product.js';
import Review from '../models/Review.js';
import slugify from 'slugify';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const { Types } = mongoose;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const escapeRx = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const normalizeCategory = (c) => {
  c = String(c || '').toLowerCase().trim();
  if (['men', 'mens', 'man', 'male'].includes(c)) return 'men';
  if (['women', 'womens', 'woman', 'female'].includes(c)) return 'women';
  if (['kids', 'kid', 'child', 'children'].includes(c)) return 'kids';
  if (['all', ''].includes(c)) return '';
  return c;
};

// ---------- LIST WITH FILTERS ----------
export const list = async (req, res, next) => {
  try {
    let {
      q = '',
      brand = '',
      category = '',
      page = 1,
      limit = 20,
      priceMin = '',
      priceMax = '',
      sort = ''
    } = req.query;

    page = Math.max(1, parseInt(page));
    limit = Math.min(60, Math.max(1, parseInt(limit)));
    const skip = (page - 1) * limit;

    // Build with $and so q-filter & category-filter clash na karein
    const andClauses = [{ isActive: { $ne: false } }];

    if (q) {
      const rx = new RegExp(escapeRx(q.trim()), 'i');
      andClauses.push({ $or: [{ title: rx }, { brand: rx }, { category: rx }, { description: rx }] });
    }

    if (brand) {
      const arr = String(brand).split(',').map((s) => s.trim()).filter(Boolean);
      if (arr.length) andClauses.push({ brand: { $in: arr } });
    }

    if (category) {
      const c = normalizeCategory(category);
      if (c) {
        // robust matching for top-categories
        if (c === 'men') {
          andClauses.push({
            $or: [{ category: /\bmen\b/i }, { category: /\bmens?\b/i }, { category: /\bmale\b/i }]
          });
        } else if (c === 'women') {
          andClauses.push({
            $or: [{ category: /\bwomen\b/i }, { category: /\bwomens?\b/i }, { category: /\bfemale\b/i }]
          });
        } else if (c === 'kids') {
          andClauses.push({
            $or: [{ category: /\bkids?\b/i }, { category: /\bchild(ren)?\b/i }]
          });
        } else {
          andClauses.push({ category: new RegExp(escapeRx(c), 'i') });
        }
      }
    }

    // priceMin/priceMax: empty string ko ignore karo
    const hasMin = priceMin !== '' && !Number.isNaN(Number(priceMin));
    const hasMax = priceMax !== '' && !Number.isNaN(Number(priceMax));
    if (hasMin || hasMax) {
      const priceFilter = {};
      if (hasMin) priceFilter.$gte = Number(priceMin);
      if (hasMax) priceFilter.$lte = Number(priceMax);
      andClauses.push({ price: priceFilter });
    }

    const sortMap = {
      new: { createdAt: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      rating: { ratingAvg: -1, ratingCount: -1 },
      popular: { ratingCount: -1, createdAt: -1 }
    };
    const sortObj = sortMap[String(sort).toLowerCase()] || { createdAt: -1 };

    const filter =
      andClauses.length > 1 ? { $and: andClauses } : andClauses[0];

    const [items, total] = await Promise.all([
      Product.find(filter).sort(sortObj).skip(skip).limit(limit),
      Product.countDocuments(filter)
    ]);

    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (e) {
    next(e);
  }
};

// ---------- GET BY ID ----------
export const getById = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (e) {
    next(e);
  }
};

// validate variants: unique sku, price/stock >= 0
const validateVariants = (variants = []) => {
  const seen = new Set();
  for (const v of variants) {
    if (!v.sku) throw new Error('Variant SKU required');
    if (seen.has(v.sku)) throw new Error('Duplicate SKU detected in variants');
    seen.add(v.sku);
    if (v.price < 0 || v.stock < 0) throw new Error('Variant price/stock must be >= 0');
  }
};

// ---------- CREATE ----------
export const createProduct = async (req, res, next) => {
  try {
    const { title, brand, category, description, price, oldPrice, variants } = req.body;

    if (!title || !brand || !category || !(price > 0)) {
      return res.status(400).json({ message: 'Title, Brand, Category and Price are required' });
    }

    let parsedVariants = [];
    if (variants) {
      parsedVariants = Array.isArray(variants) ? variants : JSON.parse(variants);
      validateVariants(parsedVariants);
    }

    const imgs = (req.files || []).map((f) => `/uploads/${path.basename(f.path)}`);

    const doc = await Product.create({
      title,
      brand,
      category,
      description: description || '',
      images: imgs,
      price,
      oldPrice: oldPrice || undefined,
      variants: parsedVariants,
      isActive: true,
      slug: `${slugify(title, { lower: true })}-${Date.now().toString().slice(-6)}`
    });

    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
};

// ---------- UPDATE ----------
export const updateProduct = async (req, res, next) => {
  try {
    const { title, brand, category, description, price, oldPrice, variants, isActive } = req.body;

    const update = {};
    if (title) update.title = title;
    if (brand) update.brand = brand;
    if (category) update.category = category;
    if (description !== undefined) update.description = description;
    if (price !== undefined) {
      if (!(price > 0)) return res.status(400).json({ message: 'Price must be > 0' });
      update.price = price;
    }
    if (oldPrice !== undefined) update.oldPrice = oldPrice;
    if (isActive !== undefined) update.isActive = !!isActive;

    if (variants) {
      const parsed = Array.isArray(variants) ? variants : JSON.parse(variants);
      validateVariants(parsed);
      update.variants = parsed;
    }

    // append new images (if any)
    if (req.files && req.files.length) {
      const imgs = (req.files || []).map((f) => `/uploads/${path.basename(f.path)}`);
      update.$push = { images: { $each: imgs } };
    }

    const doc = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!doc) return res.status(404).json({ message: 'Product not found' });
    res.json(doc);
  } catch (e) {
    next(e);
  }
};

// ---------- DELETE ----------
export const deleteProduct = async (req, res, next) => {
  try {
    const out = await Product.findByIdAndDelete(req.params.id);
    if (!out) return res.status(404).json({ message: 'Product not found' });
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};

// ---------- REVIEWS ----------
export const getReviews = async (req, res, next) => {
  try {
    const list = await Review.find({ product: req.params.id }).populate('user', 'name');
    res.json(list);
  } catch (e) {
    next(e);
  }
};

// user can review only if they have an order for the product (simple stub check allowed)
export const reviewEligible = async (_req, res) => {
  res.json({ eligible: true }); // demo: allow; hook with orders if needed
};

export const createOrUpdateReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user._id;
    const productId = req.params.id;

    if (!(rating >= 1 && rating <= 5)) return res.status(400).json({ message: 'Rating must be 1..5' });

    const existing = await Review.findOne({ product: productId, user: userId });
    if (existing) {
      existing.rating = rating;
      existing.comment = comment || '';
      await existing.save();
    } else {
      await Review.create({ product: productId, user: userId, rating, comment: comment || '' });
    }

    // update product aggregates (cast ObjectId correctly)
    const agg = await Review.aggregate([
      { $match: { product: new Types.ObjectId(productId) } },
      { $group: { _id: '$product', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);

    const { avg = 0, count = 0 } = agg[0] || {};
    await Product.findByIdAndUpdate(productId, { ratingAvg: avg, ratingCount: count });

    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};
