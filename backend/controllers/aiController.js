// // import Product from '../models/Product.js';
// // import Review from '../models/Review.js';
// // import { embedText } from '../ai/embeddings.js';
// // import { cosineSearch } from '../ai/semanticSearch.js';
// // import { stubRecommend } from '../ai/recommend.js';
// // import { summarizeReviews } from '../ai/reviewSummary.js';
// // import { suggestSize } from '../ai/sizeAdvisor.js';
// // import { aiChat } from '../utils/openrouter.js';

// // export const smartSearch = async (req, res) => {
// //   const q = (req.query.q || '').trim();
// //   if (!q) return res.json([]);
// //   const products = await Product.find().limit(200);
// //   const corpus = products.map(p => ({
// //     id: String(p._id),
// //     text: `${p.title} ${p.brand} ${p.category} ${p.description}`.trim()
// //   }));
// //   const results = await cosineSearch(q, corpus, 10);
// //   const ids = results.map(r => r.id);
// //   const map = new Map(products.map(p => [String(p._id), p]));
// //   res.json(results.map(r => ({ score: r.score, product: map.get(r.id) })));
// // };

// // export const recommend = async (req, res) => {
// //   const { productId } = req.query;
// //   const items = await stubRecommend(productId);
// //   res.json(items);
// // };

// // export const reviewSummary = async (req, res) => {
// //   const { id } = req.params;
// //   const reviews = await Review.find({ product: id }).limit(50);
// //   res.json({ summary: summarizeReviews(reviews) });
// // };

// // export const size = async (req, res) => {
// //   const { height, weight, preference = 'regular' } = req.body;
// //   res.json(suggestSize({ height, weight, preference }));
// // };

// // export const assistant = async (req, res) => {
// //   const { message = '' } = req.body;
// //   const reply = await aiChat(message);
// //   res.json({ reply });
// // };

// // export const visual = async (req, res) => {
// //   const { category = '' } = req.query;
// //   const items = await Product.find(category ? { category } : {}).limit(8).sort({ createdAt: -1 });
// //   res.json(items);
// // };
// // // 


// import mongoose from 'mongoose';
// import Product from '../models/Product.js';
// import Review from '../models/Review.js';

// /** ---------- Helpers (deterministic stubs) ---------- */
// const cosine = (a, b) => {
//   const dot = a.reduce((s, v, i) => s + v * b[i], 0);
//   const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
//   const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
//   return magA && magB ? dot / (magA * magB) : 0;
// };

// const stubEmbed = (text = '') => {
//   // simple deterministic vector by char codes
//   const base = new Array(8).fill(0);
//   for (let i = 0; i < text.length; i++) base[i % base.length] += text.charCodeAt(i) % 13;
//   return base;
// };

// const normalizeCategory = (c = '') => {
//   c = String(c).trim().toLowerCase();
//   if (['men', 'mens', 'man', 'male'].includes(c)) return 'men';
//   if (['women', 'womens', 'woman', 'female'].includes(c)) return 'women';
//   if (['kids', 'kid', 'child', 'children'].includes(c)) return 'kids';
//   return c;
// };

// /** ---------- /api/ai/search?q= ---------- */
// export const smartSearch = async (req, res, next) => {
//   try {
//     const q = String(req.query.q || '').trim();
//     if (!q) return res.json([]);
//     const qVec = stubEmbed(q);

//     const all = await Product.find({ isActive: { $ne: false } }).lean();
//     const ranked = all
//       .map((p) => {
//         const txt = `${p.title} ${p.brand} ${p.category} ${p.description || ''}`;
//         const score = cosine(stubEmbed(txt), qVec);
//         return { ...p, _score: score };
//       })
//       .sort((a, b) => b._score - a._score)
//       .slice(0, 12)
//       .map(({ _score, ...rest }) => rest);

//     res.json(ranked);
//   } catch (e) {
//     next(e);
//   }
// };

// /** ---------- /api/ai/recommend?productId= ---------- */
// export const recommend = async (req, res, next) => {
//   try {
//     const id = req.query.productId;
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.json([]);

//     const p = await Product.findById(id).lean();
//     if (!p) return res.json([]);

//     const sameCat = await Product.find({
//       _id: { $ne: p._id },
//       isActive: { $ne: false },
//       $or: [{ brand: p.brand }, { category: p.category }],
//     })
//       .limit(8)
//       .lean();

//     res.json(sameCat);
//   } catch (e) {
//     next(e);
//   }
// };

// /** ---------- /api/ai/review-summary/:id ---------- */
// export const reviewSummary = async (req, res, next) => {
//   try {
//     const productId = req.params.id;

//     // ✅ Guard against invalid/undefined ids (prevents CastError)
//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       return res.json({ summary: 'No reviews yet.' });
//     }

//     const reviews = await Review.find({ product: productId }).lean();
//     if (!reviews.length) return res.json({ summary: 'No reviews yet.' });

//     const avg =
//       Math.round(
//         (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length) * 10
//       ) / 10;

//     const pos = reviews.filter((r) => r.rating >= 4).length;
//     const neg = reviews.filter((r) => r.rating <= 2).length;

//     const summary =
//       `Based on ${reviews.length} review(s), average rating is ${avg}/5. ` +
//       `Common sentiments: ${pos} positive, ${neg} critical. ` +
//       `Highlights mention fit and value for money.`;

//     res.json({ summary });
//   } catch (e) {
//     next(e);
//   }
// };

// /** ---------- /api/ai/size (POST) ---------- */
// export const sizeAdvisor = async (req, res, _next) => {
//   const { height = 170, weight = 70, preference = 'regular' } = req.body || {};
//   // simple deterministic mapping
//   const bmi = weight / Math.pow(height / 100, 2);
//   let size = 'M';
//   if (bmi < 20) size = 'S';
//   else if (bmi > 27) size = 'L';
//   if (preference === 'loose') size = size === 'S' ? 'M' : size === 'M' ? 'L' : 'XL';
//   if (preference === 'slim') size = size === 'L' ? 'M' : size === 'M' ? 'S' : 'XS';
//   res.json({ size, note: 'Deterministic stub size advisor' });
// };

// /** ---------- /api/ai/assistant (POST) ---------- */
// export const assistant = async (req, res, _next) => {
//   const msg = String((req.body && req.body.message) || '').trim().toLowerCase();
//   let reply = 'How can I help you shop today?';
//   if (msg.includes('return')) reply = 'Returns are accepted within 7 days of delivery.';
//   else if (msg.includes('cod')) reply = 'Cash on Delivery (COD) is available on all orders.';
//   else if (msg.includes('size')) reply = 'Tell me your height/weight and fit preference; I will suggest a size.';
//   res.json({ reply });
// };

// /** ---------- /api/ai/visual?category= (POST) ---------- */
// export const visualSearch = async (req, res, next) => {
//   try {
//     const cat = normalizeCategory(req.query.category || '');
//     const filter = { isActive: { $ne: false } };
//     if (cat) filter.category = new RegExp(`^${cat}$`, 'i');

//     const items = await Product.find(filter).limit(10).lean();
//     res.json(items);
//   } catch (e) {
//     next(e);
//   }



// };


import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import Order from '../models/Order.js';
import { env } from '../config/env.js';
import { orChat } from '../utils/openrouter.js';
import { embedText } from '../ai/embeddings.js';
import { rankProductsByQuery } from '../ai/semanticSearch.js';

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
import { callOpenRouter } from '../utils/openrouter.js'; // safe wrapper; falls back if not configured



// import Product from '../models/Product.js';
import {  embedMany } from '../ai/embeddings.js';
// import { orChat } from '../utils/openrouter.js';
import { cosine } from '../utils/openrouter.js';

// Image -> text tags using gpt-4o-mini (vision)
// Then embed those tags and rank catalog


/* -----------------------------
   Reviews: Summary
-------------------------------- */
const heuristicSummary = (reviews) => {
  if (!reviews.length) {
    return `**Pros:** Not enough data.
**Cons:** No reviews yet.
**Verdict:** Not enough reviews to form an opinion.`;
  }

  const positives = reviews.filter(r => (r.rating || 0) >= 4);
  const negatives = reviews.filter(r => (r.rating || 0) <= 2);

  const pros = positives.slice(0, 5).map(r => (r.comment || '').trim()).filter(Boolean);
  const cons = negatives.slice(0, 5).map(r => (r.comment || '').trim()).filter(Boolean);

  const prosText = pros.length ? pros.map(p => `- ${p}`).join('\n') : 'None clearly mentioned.';
  const consText = cons.length ? cons.map(c => `- ${c}`).join('\n') : 'None clearly mentioned.';

  const avg = (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1);
  let verdict = 'Mixed feedback; consider reading reviews.';
  if (+avg >= 4) verdict = 'Recommended by most buyers.';
  else if (+avg <= 2.5) verdict = 'Not recommended by many buyers.';

  return `**Pros:**\n${prosText}\n\n**Cons:**\n${consText}\n\n**Verdict:** ${verdict}`;
};

export const reviewSummary = async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId || !isValidId(productId)) {
      return res.status(400).json({ summary: 'Invalid product id.', count: 0, avg: 0 });
    }

    const product = await Product.findById(productId).select('_id');
    if (!product) {
      return res.status(404).json({ summary: 'Product not found.', count: 0, avg: 0 });
    }

    const reviews = await Review.find({ product: productId })
      .select('rating comment')
      .sort({ createdAt: -1 })
      .lean();

    const count = reviews.length;
    const avg = count ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / count) : 0;

    // fallback summary
    let summary = heuristicSummary(reviews);

    // LLM try (optional)
    if (reviews.length) {
      try {
        const text = reviews
          .map((r, i) => `${i + 1}. [${r.rating}★] ${r.comment || ''}`)
          .join('\n')
          .slice(0, 3000);

        const prompt = `Summarize these customer reviews for a shopping product in 3 blocks: Pros, Cons, Verdict.
Keep neutral tone, no hallucinations, and base only on the given reviews.
Reviews:
${text}`;

        const llm = await callOpenRouter({
          system: 'You are a precise review summarizer for e-commerce.',
          user: prompt,
        });

        if (llm?.trim()) summary = llm.trim();
      } catch (e) {
        console.warn('OpenRouter summary fallback used:', e.message);
      }
    }

    return res.json({ summary, count, avg: +avg.toFixed(2) });
  } catch (e) {
    next(e);
  }
};

export const visualSearch = async (req, res) => {
  try {
    const file = req.file;
    const category = String(req.body.category || '').toLowerCase();
    if (!file) return res.json([]);

    // 1) ask model to describe image (compact tags to keep latency small)
    const b64 = file.buffer.toString('base64');
    const mime = file.mimetype || 'image/png';

    const prompt =
      'You are an ecommerce vision tagger. Return a short, comma-separated list of tags '
      + '(category, color, pattern, sleeve/neck type, fabric, fit, gender). No sentences. Example: '
      + '"women, kurti, cotton, floral, green, 3/4 sleeve, straight fit".';

    const { content: tagsText } = await orChat([{
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: `data:${mime};base64,${b64}` }
      ]
    }]);

    const tags = (tagsText || '').replace(/\n/g,' ').slice(0, 300);

    // 2) embed query tags
    const qVec = await embedText(tags);

    // 3) candidate products (prefilter by category if provided)
    const filter = { isActive: { $ne: false } };
    if (['men','women','kids'].includes(category)) filter.category = new RegExp(`^${category}$`, 'i');
    const products = await Product.find(filter).lean();

    // 4) embed product texts in batch
    const texts = products.map(p =>
      `${p.title} ${p.brand} ${p.category} ${p.description || ''}`.trim()
    );
    const pVecs = await embedMany(texts);

    // 5) cosine rank
    const ranked = products
      .map((p, i) => ({ p, s: cosine(qVec, pVecs[i] || []) }))
      .sort((a,b)=> b.s - a.s)
      .slice(0, 24)
      .map(r => r.p);

    return res.json(ranked);
  } catch (e) {
    console.error('visualSearch error:', e?.message || e);
    return res.json([]);   // never 500; return empty on failure
  }
};


// ---- Search (semantic + typo tolerant + safe fallbacks) ----
export const smartSearch = async (req, res, next) => {
  try {
    const qRaw = String(req.query.q || '').trim();
    if (!qRaw) return res.json([]);

    // Parse constraints like "under 2k / under 100 rs"
    const under = qRaw.match(/under\s*(\d+)\s*(k|rs)?/i);
    const budget = under ? (Number(under[1]) * (under[2]?.toLowerCase() === 'k' ? 1000 : 1)) : null;

    // Category hints
    const qlc = qRaw.toLowerCase();
    let catRx = null;
    if (/\bwomen|woman|ladies|female\b/.test(qlc)) catRx = /^women$/i;
    else if (/\bmen|man|male\b/.test(qlc)) catRx = /^men$/i;
    else if (/\bkids|children|child|boys|girls\b/.test(qlc)) catRx = /^kids$/i;

    // Pre-filter
    const baseFilter = { isActive: { $ne: false } };
    if (catRx) baseFilter.category = catRx;

    const all = await Product.find(baseFilter).lean();

    // Rank (batch embeddings with fallback)
    let ranked = await rankProductsByQuery(all, qRaw);

    // Budget filter if requested
    if (budget != null) ranked = ranked.filter(p => Number(p.price) <= budget);

    // Fallback if everything got filtered out
    if (!ranked.length) {
      const rx = new RegExp(qRaw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      ranked = all.filter(p => rx.test(`${p.title} ${p.brand} ${p.category} ${p.description || ''}`));
      if (budget != null) ranked = ranked.filter(p => Number(p.price) <= budget);
    }

    return res.json(ranked.slice(0, 24));
  } catch (e) {
    // Final safety net: never 500; return empty array on AI errors
    console.error('smartSearch error:', e?.message || e);
    return res.json([]);
  }
};


// // ---- Visual Search (image optional, category fallback) ----
// export const visualSearch = async (req, res, next) => {
//   try {
//     const cat = String(req.query.category || '').trim().toLowerCase();
//     const filter = { isActive: { $ne: false } };
//     if (cat) filter.category = new RegExp(`^${cat}$`, 'i');
//     // NOTE: full CLIP embedding omitted; stub returns same-category items
//     const items = await Product.find(filter).limit(12).lean();
//     res.json(items);
//   } catch (e) { next(e); }
// };

// ---- Recommendations ----
// similar by product
export const recommendSimilar = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidId(id)) return res.json([]);
    const p = await Product.findById(id).lean();
    if (!p) return res.json([]);
    const items = await Product.find({
      _id: { $ne: p._id },
      isActive: { $ne: false },
      $or: [{ brand: p.brand }, { category: p.category }]
    }).limit(12).lean();
    res.json(items);
  } catch (e) { next(e); }
};

// personalized feed (views/orders heuristic)
export const recommendPersonal = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.json([]); // must be logged in
    const orders = await Order.find({ user: userId }).lean();
    const freqBrand = new Map();
    const freqCat = new Map();
    for (const o of orders) {
      for (const it of o.items || []) {
        if (it.title && it.title.brand) freqBrand.set(it.title.brand, (freqBrand.get(it.title.brand) || 0) + 1);
        if (it.size) {} // ignore
      }
    }
    // fallback on recent popular
    let items = await Product.find({ isActive: { $ne: false } }).sort({ ratingCount: -1, createdAt: -1 }).limit(24).lean();
    if (freqBrand.size) {
      const topBrand = [...freqBrand.entries()].sort((a,b)=>b[1]-a[1])[0][0];
      items = await Product.find({ brand: topBrand, isActive: { $ne: false } }).limit(24).lean();
    }
    res.json(items);
  } catch (e) { next(e); }
};

// // ---- Review Summary (AI) ----
// export const reviewSummary = async (req, res) => {
//   const productId = req.params.productId || req.params.id;
//   if (!isValidId(productId)) return res.json({ summary: 'No reviews yet.' });

//   const reviews = await Review.find({ product: productId }).lean();
//   if (!reviews.length) return res.json({ summary: 'No reviews yet.' });

//   const avg = Math.round(
//     (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length) * 10
//   ) / 10;

//   if (env.AI_PROVIDER === 'openrouter') {
//     const text = reviews.slice(0, 50).map(r => `- (${r.rating}/5) ${r.comment || ''}`).join('\n');
//     const system = { role: 'system', content: 'Summarize reviews as short bullets with Pros, Cons and a one-line verdict. Keep under 60 words.' };
//     const user   = { role: 'user', content: `Average: ${avg}/5 from ${reviews.length} reviews.\nReviews:\n${text}` };
//     try {
//       const { content } = await orChat([system, user], {});
//       return res.json({ summary: content || 'No reviews yet.' });
//     } catch {
//       // fallthrough to stub
//     }
//   }
//   // stub summary
//   const pos = reviews.filter(r => r.rating >= 4).length;
//   const neg = reviews.filter(r => r.rating <= 2).length;
//   const summary = `Avg ${avg}/5 from ${reviews.length}. Pros: fit, value. Cons: sizing variance. (${pos} positive, ${neg} critical)`;
//   return res.json({ summary });
// };

// ---- Size Advisor ----
// --- Size Advisor (rule-based; no PII stored) ---
export const sizeAdvisor = async (req, res) => {
  try {
    let {
      gender = "men",           // men | women | kids
      category = "",            // topwear, shirt, tshirt, kurta, dress, etc.
      heightCm = 0,             // number
      weightKg = 0,             // number
      fit = "regular",          // slim | regular | loose
      brand = "",               // optional
    } = req.body || {};

    gender = String(gender || "men").toLowerCase();
    fit    = String(fit || "regular").toLowerCase();
    brand  = String(brand || "").toLowerCase();
    category = String(category || "").toLowerCase();

    heightCm = Number(heightCm);
    weightKg = Number(weightKg);
    if (!heightCm || !weightKg) {
      return res.status(400).json({ message: "heightCm & weightKg required" });
    }

    // --- simple heuristic: estimate chest/bust from height + weight
    // Not medical—just to bucket sizes.
    const estChest = Math.round(0.55 * heightCm + 0.23 * weightKg); // ~ for men tops
    const estBust  = Math.round(0.53 * heightCm + 0.24 * weightKg); // ~ for women tops

    // --- size charts (cm)
    const charts = {
      men: [
        { size: "S",  chest: [86, 94]  },
        { size: "M",  chest: [94, 100] },
        { size: "L",  chest: [100,106] },
        { size: "XL", chest: [106,112] },
        { size: "XXL", chest: [112,118] },
        { size: "3XL", chest: [118,126] },
      ],
      women: [
        { size: "XS", bust: [76, 82]  },
        { size: "S",  bust: [82, 88]  },
        { size: "M",  bust: [88, 94]  },
        { size: "L",  bust: [94, 100] },
        { size: "XL", bust: [100,106] },
        { size: "XXL", bust: [106,112] },
      ],
    };

    const table = gender === "women" ? charts.women : charts.men;

    // pick bucket by measurement
    const pickByRange = (val, key) => {
      for (const row of table) {
        const [lo, hi] = row[key];
        if (val >= lo && val < hi) return row.size;
      }
      return table.at(-1).size; // largest fallback
    };

    let baseSize = gender === "women"
      ? pickByRange(estBust, "bust")
      : pickByRange(estChest, "chest");

    // brand adjustments (some brands run small/large)
    // +1 => upsize, -1 => downsize
    const brandAdjMap = {
      "zara": -1, "hm": 0, "h&m": 0, "levi": 0, "levis": 0, "us polo": +1,
      "roadster": 0, "allen solly": -1, "peter england": 0
    };
    const sizesOrder = ["XS","S","M","L","XL","XXL","3XL","4XL"];
    const idxOf = (s) => sizesOrder.indexOf(s);

    const bump = (s, delta) => {
      const i = idxOf(s);
      if (i < 0) return s;
      return sizesOrder[Math.min(sizesOrder.length-1, Math.max(0, i + delta))];
    };

    // brand tweak
    const bDelta = brandAdjMap[brand] ?? 0;
    baseSize = bump(baseSize, bDelta);

    // fit tweak
    if (fit === "slim")   baseSize = bump(baseSize, -1);
    if (fit === "loose")  baseSize = bump(baseSize, +1);

    // category tweak (if bottom-wear you can customize later)
    // keeping top-wear for now

    const noteParts = [];
    noteParts.push(`Based on ${heightCm}cm / ${weightKg}kg`);
    if (fit !== "regular") noteParts.push(`${fit} fit preference`);
    if (bDelta !== 0) noteParts.push(`brand adjustment ${bDelta > 0 ? "+1 (runs small)" : "-1 (runs large)"}`);

    return res.json({
      recommendation: baseSize,
      reason: noteParts.join(", "),
      inputs: { gender, category, heightCm, weightKg, fit, brand },
      chartUsed: gender,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "size advisor failed" });
  }
};

// ---- Assistant Chat ----
export const assistant = async (req, res) => {
  const message = String(req.body?.message || '').trim();
  if (!message) return res.json({ reply: 'How can I help you shop today?' });

  if (env.AI_PROVIDER === 'openrouter') {
    const system = { role: 'system', content: 'You are a helpful shopping assistant of a fashion e-commerce site. Be concise.' };
    const user   = { role: 'user', content: message };
    try {
      const { content } = await orChat([system, user], {});
      return res.json({ reply: content });
    } catch {/* fallback */}
  }

  let reply = 'How can I help you shop today?';
  if (message.includes('return')) reply = 'Returns allowed within 7 days.';
  else if (message.includes('cod')) reply = 'COD is available on all orders.';
  else if (message.includes('size')) reply = 'Share your height/weight & fit preference for size advice.';
  return res.json({ reply });
};


// ---- Fraud Risk Score ----
export const riskScore = async (req, res) => {
  const {
    deviceFingerprint = '',
    ipCountry = '',
    billingCountry = '',
    ordersLast24h = 0,
    codAbuseCount = 0,
    emailAgeDays = 365,
    velocityPerMin = 0
  } = req.body || {};

  let score = 0;
  // basic signals
  if (ipCountry && billingCountry && ipCountry !== billingCountry) score += 25;
  if (ordersLast24h > 2) score += 20;
  if (velocityPerMin > 5) score += 15;
  score += Math.min(20, codAbuseCount * 10);
  if (emailAgeDays < 30) score += 15;

  const action = score >= 60 ? 'block' : score >= 35 ? 'step_up' : 'allow';
  return res.json({ score, action });
};

// ---- Forecast (very simple) ----
export const forecast = async (req, res, next) => {
  try {
    const sku = String(req.query.sku || '').trim();
    if (!sku) return res.json({ sku: '', avgPerDay: 0, suggestedReorder: 0 });

    // last 30 days sales by SKU
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    // ensure Order schema has { timestamps: true } so createdAt exists
    const orders = await Order.find({ createdAt: { $gte: since } }).lean();

    let total = 0;
    for (const o of orders) {
      for (const it of (o.items || [])) {
        if (String(it.sku) === sku) total += Number(it.qty || 0);
      }
    }

    const avgPerDay = Math.round((total / 30) * 100) / 100;
    const suggestedReorder = Math.ceil(avgPerDay * 14); // 2 weeks buffer
    return res.json({ sku, avgPerDay, suggestedReorder });
  } catch (e) {
    next(e);
  }
};

// ---- Price Suggestion (heuristic) ----
// export const priceSuggest = async (req, res, next) => {
//   try {
//     const id = req.params.productId;
//     if (!isValidId(id)) {
//       return res.json({ current: 0, suggestion: null, deltaPct: 0 });
//     }

//     const p = await Product.findById(id).lean();
//     if (!p) {
//       return res.json({ current: 0, suggestion: null, deltaPct: 0 });
//     }

//     const stock = (p.variants || []).reduce((s, v) => s + Number(v.stock || 0), 0);
//     const demandBoost = Math.min(20, Number(p.ratingCount || 0) / 5);
//     const rating = Number(p.ratingAvg || 0);

//     let delta = 0;
//     if (rating >= 4.3 && stock < 20) delta = +7;        // raise 7%
//     else if (rating < 3.4 || stock > 200) delta = -10;  // drop 10%
//     else delta = demandBoost > 10 ? +5 : -5;            // mild bump/haircut

//     const current = Number(p.price || 0);
//     const suggestion = Math.max(99, Math.round((current * (100 + delta)) / 100));
//     return res.json({ current, suggestion, deltaPct: delta });
//   } catch (e) {
//     next(e);
//   }
// };

import priceSuggestFromProduct from "../ai/priceSuggest.js";

export async function priceSuggest(req, res, next) {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).lean();
    if (!product) return res.status(404).json({ ok: false, error: "Product not found" });

    const out = priceSuggestFromProduct(product);
    const pct = Math.round(out.deltaPct * 100);
    const sign = pct >= 0 ? "+" : "";

    return res.json({
      ok: true,
      current: out.current,
      suggested: out.suggested,
      deltaPct: pct,
      message: `Current ${out.current} → Suggest ${out.suggested} (${sign}${pct}%)`,
      details: out.debug
    });
  } catch (err) {
    next(err);
  }
}

// // ---- Fraud Risk Score ----
// export const riskScore = async (req, res) => {
//   const {
//     deviceFingerprint = '',
//     ipCountry = '',
//     billingCountry = '',
//     ordersLast24h = 0,
//     codAbuseCount = 0,
//     emailAgeDays = 365,
//     velocityPerMin = 0
//   } = req.body || {};

//   let score = 0;
//   if (ipCountry && billingCountry && ipCountry !== billingCountry) score += 25;
//   if (ordersLast24h > 2) score += 20;
//   if (velocityPerMin > 5) score += 15;
//   score += Math.min(20, codAbuseCount * 10);
//   if (emailAgeDays < 30) score += 15;

//   const action = score >= 60 ? 'block' : score >= 35 ? 'step_up' : 'allow';
//   return res.json({ score, action });
// };

// // ---- Forecast (very simple) ----
// export const forecast = async (req, res, next) => {
//   try {
//     const sku = String(req.query.sku || '').trim();
//     if (!sku) return res.json({ sku: '', avgPerDay: 0, suggestedReorder: 0 });

//     // sum last 30 days sales by SKU
//     const since = new Date(Date.now() - 30*24*60*60*1000);
//     const orders = await Order.find({ createdAt: { $gte: since } }).lean();
//     let total = 0;
//     for (const o of orders) {
//       for (const it of o.items || []) if (String(it.sku) === sku) total += Number(it.qty || 0);
//     }
//     const avgPerDay = Math.round((total / 30) * 100) / 100;
//     const suggestedReorder = Math.ceil(avgPerDay * 14); // 2 weeks buffer
//     res.json({ sku, avgPerDay, suggestedReorder });
//   } catch (e) { next(e); }
// };

// // ---- Price Suggestion (heuristic) ----
// export const priceSuggest = async (req, res, next) => {
//   try {
//     const id = req.params.productId;
//     if (!isValidId(id)) return res.json({ suggestion: null });
//     const p = await Product.findById(id).lean();
//     if (!p) return res.json({ suggestion: null });

//     const stock = (p.variants || []).reduce((s, v) => s + Number(v.stock || 0), 0);
//     const demandBoost = Math.min(20, Number(p.ratingCount || 0) / 5);
//     const rating = Number(p.ratingAvg || 0);
//     let delta = 0;
//     if (rating >= 4.3 && stock < 20) delta = +7;   // raise 7%
//     else if (rating < 3.4 || stock > 200) delta = -10; // drop 10%
//     else delta = demandBoost > 10 ? +5 : -5;

//     const suggestion = Math.max(99, Math.round((p.price * (100 + delta)) / 100));
//     res.json({ current: p.price, suggestion, deltaPct: delta });
//   } catch (e) { next(e); }
// };
