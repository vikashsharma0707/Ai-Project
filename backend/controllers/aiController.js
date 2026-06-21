


// // import mongoose from 'mongoose';
// // import Product from '../models/Product.js';
// // import Review from '../models/Review.js';
// // import Order from '../models/Order.js';
// // import { env } from '../config/env.js';
// // import { orChat } from '../utils/openrouter.js';
// // import { embedText } from '../ai/embeddings.js';
// // import { rankProductsByQuery } from '../ai/semanticSearch.js';


// // // backend/controllers/aiController.js
// // import { shoppingAgent } from '../ai/agents/shoppingAgent.js';
// // import { addToCartAgent } from '../ai/agents/cartAgent.js';
// // import { checkoutDecisionAgent } from '../ai/agents/checkoutAgent.js';
// // import { paymentAgent } from '../ai/agents/paymentAgent.js';
// // import Cart from '../models/Cart.js'; // for total calculation

// // const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
// // import { callOpenRouter } from '../utils/openrouter.js'; // safe wrapper; falls back if not configured
// // import { orderDeliveryAgent } from '../ai/agents/orderDeliveryAgent.js';

// // // backend/controllers/aiController.js

// // // import { shoppingAgent } from '../ai/agents/shoppingAgent.js';
// // // import { addToCartAgent } from '../ai/agents/cartAgent.js';
// // // import { checkoutDecisionAgent } from '../ai/agents/checkoutAgent.js';
// // // import { paymentAgent } from '../ai/agents/paymentAgent.js';
// // // import { orderDeliveryAgent } from '../ai/agents/orderDeliveryAgent.js';

// // import {
// //   personalStylistAgent,
// //   sizeAdvisorAgent,
// //   budgetShopperAgent,
// //   occasionPlannerAgent,
// //   wardrobeAssistantAgent,
// //   trendSpotterAgent,
// //   outfitCompleterAgent,
// //   giftSuggesterAgent,
// // } from '../ai/agents/index.js';

// // // import Cart from '../models/Cart.js';

// // // backend/controllers/aiController.js  (or wherever visualSearch is)
// // // import { orChat } from '../utils/openrouter.js';
// // // import { embedText, embedMany } from '../utils/embeddings.js'; // adjust path if needed
// // // import Product from '../models/Product.js';
// // // import { cosine } from '../utils/openrouter.js'; // if you have cosine helper



// // // import Product from '../models/Product.js';
// // import {  embedMany } from '../ai/embeddings.js';
// // // import { orChat } from '../utils/openrouter.js';
// // import { cosine } from '../utils/openrouter.js';
// // // import {
// // //   personalStylistAgent,
// // //   sizeAdvisorAgent,
// // //   budgetShopperAgent,
// // //   occasionPlannerAgent,
// // //   // ... other agents
// // // } from '../ai/agents/index.js';

// // // Image -> text tags using gpt-4o-mini (vision)
// // // Then embed those tags and rank catalog


// // /* -----------------------------
// //    Reviews: Summary
// // -------------------------------- */
// // const heuristicSummary = (reviews) => {
// //   if (!reviews.length) {
// //     return `**Pros:** Not enough data.
// // **Cons:** No reviews yet.
// // **Verdict:** Not enough reviews to form an opinion.`;
// //   }

// //   const positives = reviews.filter(r => (r.rating || 0) >= 4);
// //   const negatives = reviews.filter(r => (r.rating || 0) <= 2);

// //   const pros = positives.slice(0, 5).map(r => (r.comment || '').trim()).filter(Boolean);
// //   const cons = negatives.slice(0, 5).map(r => (r.comment || '').trim()).filter(Boolean);

// //   const prosText = pros.length ? pros.map(p => `- ${p}`).join('\n') : 'None clearly mentioned.';
// //   const consText = cons.length ? cons.map(c => `- ${c}`).join('\n') : 'None clearly mentioned.';

// //   const avg = (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1);
// //   let verdict = 'Mixed feedback; consider reading reviews.';
// //   if (+avg >= 4) verdict = 'Recommended by most buyers.';
// //   else if (+avg <= 2.5) verdict = 'Not recommended by many buyers.';

// //   return `**Pros:**\n${prosText}\n\n**Cons:**\n${consText}\n\n**Verdict:** ${verdict}`;
// // };


// // // backend/controllers/aiController.js
// // export const assistant = async (req, res) => {
// //   try {
// //     const { message } = req.body;
// //     const userId = req.user?._id;

// //     if (!userId) return res.status(401).json({ reply: "Please login first" });

// //     const lowerMsg = message.toLowerCase().trim();

// //    // ====================== STRICT CHAT TO ORDER ======================
// //     if (lowerMsg.includes("order") || lowerMsg.includes("add") || 
// //         lowerMsg.includes("buy") || lowerMsg.includes("kar do")) {

// //       const product = await shoppingAgent(message);

// //       if (!product) {
// //         return res.json({
// //           reply: "❌ This product is not available in our store right now.\n\nPlease try another name like 'Shirt', 'Kurti', or 'Jeans'.",
// //         });
// //       }

// //       // Extract size
// //       let size = "M";
// //       const sizeMatch = message.match(/size\s*([A-Z0-9]+)/i);
// //       if (sizeMatch) size = sizeMatch[1].toUpperCase();

// //       // Add to cart
// //       await addToCartAgent(userId, product._id, size, 1);

// //       // Get total
// //       const cart = await Cart.findOne({ user: userId });
// //       const total = cart?.items?.reduce((sum, i) => sum + (i.price * i.qty), 0) || product.price;

// //       // Direct Razorpay
// //       const paymentData = await paymentAgent(userId, total);

// //       return res.json({
// //         reply: `✅ **${product.title}** (Size: ${size}) successfully added to your cart!\n\n🔄 Opening Razorpay payment gateway...`,
// //         action: "open_razorpay",
// //         paymentData
// //       });
// //     }

// //     // ====================== OTHER AGENTS ======================
// //     if (lowerMsg.includes("stylist") || lowerMsg.includes("outfit") || lowerMsg.includes("look")) {
// //       const result = await personalStylistAgent(message, userId);
// //       return res.json({ reply: result.reply });
// //     }

// //     if (lowerMsg.includes("size") || lowerMsg.includes("height") || lowerMsg.includes("weight")) {
// //       const result = await sizeAdvisorAgent(message);
// //       return res.json({ reply: result.reply });
// //     }

// //     if (lowerMsg.includes("under") || lowerMsg.includes("budget") || lowerMsg.includes("sasta")) {
// //       const result = await budgetShopperAgent(message);
// //       return res.json({ reply: result.reply });
// //     }

// //     if (lowerMsg.includes("ganesh") || lowerMsg.includes("festival") || lowerMsg.includes("wedding") || lowerMsg.includes("occasion")) {
// //       const result = await occasionPlannerAgent(message);
// //       return res.json({ reply: result.reply });
// //     }

// //     if (lowerMsg.includes("track") || lowerMsg.includes("delivery") || lowerMsg.includes("status") || lowerMsg.includes("kab aayega")) {
// //       const result = await orderDeliveryAgent(userId);
// //       return res.json({ reply: result.reply });
// //     }

// //     // Default
// //     return res.json({
// //       reply: "Click any agent card or try:\n• Shirt order kar do size M\n• Track my order",
// //     });

// //   } catch (err) {
// //     console.error("Assistant Error:", err);
// //     res.json({ reply: "Something went wrong. Please try again." });
// //   }
// // };





// // // Add this function
// // export const checkoutDecision = async (req, res) => {
// //   try {
// //     const { items } = req.body;
// //     const userId = req.user?._id;

// //     if (!items || !Array.isArray(items) || items.length === 0) {
// //       return res.json({
// //         message: "Your cart is empty.",
// //         suggestedMethod: "COD",
// //         discountForPrepaid: 0
// //       });
// //     }

// //     const decision = await checkoutDecisionAgent(items, userId);

// //     return res.json({
// //       message: decision.message,
// //       suggestedMethod: decision.suggestedMethod,
// //       canUseCOD: decision.canUseCOD,
// //       discountForPrepaid: decision.discountForPrepaid,
// //       total: decision.total,
// //       finalTotal: decision.finalTotal,
// //       fraudRisk: decision.fraudRisk
// //     });
// //   } catch (err) {
// //     console.error("Checkout Decision Error:", err);
// //     return res.json({
// //       message: "You can pay via COD or Razorpay.",
// //       suggestedMethod: "COD"
// //     });
// //   }
// // };

// // export const reviewSummary = async (req, res, next) => {
// //   try {
// //     const { productId } = req.params;
// //     if (!productId || !isValidId(productId)) {
// //       return res.status(400).json({ summary: 'Invalid product id.', count: 0, avg: 0 });
// //     }

// //     const product = await Product.findById(productId).select('_id');
// //     if (!product) {
// //       return res.status(404).json({ summary: 'Product not found.', count: 0, avg: 0 });
// //     }

// //     const reviews = await Review.find({ product: productId })
// //       .select('rating comment')
// //       .sort({ createdAt: -1 })
// //       .lean();

// //     const count = reviews.length;
// //     const avg = count ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / count) : 0;

// //     // fallback summary
// //     let summary = heuristicSummary(reviews);

// //     // LLM try (optional)
// //     if (reviews.length) {
// //       try {
// //         const text = reviews
// //           .map((r, i) => `${i + 1}. [${r.rating}★] ${r.comment || ''}`)
// //           .join('\n')
// //           .slice(0, 3000);

// //         const prompt = `Summarize these customer reviews for a shopping product in 3 blocks: Pros, Cons, Verdict.
// // Keep neutral tone, no hallucinations, and base only on the given reviews.
// // Reviews:
// // ${text}`;

// //         const llm = await callOpenRouter({
// //           system: 'You are a precise review summarizer for e-commerce.',
// //           user: prompt,
// //         });

// //         if (llm?.trim()) summary = llm.trim();
// //       } catch (e) {
// //         console.warn('OpenRouter summary fallback used:', e.message);
// //       }
// //     }

// //     return res.json({ summary, count, avg: +avg.toFixed(2) });
// //   } catch (e) {
// //     next(e);
// //   }
// // };



// // // backend/controllers/aiController.js

// // export const generateDraft = async (req, res) => {
// //   try {
// //     const { agentType } = req.body;

// //     const drafts = {
// //       // Core Shopping
// //       "chat-to-order": "Nylon T Shirt for Men order kar do size M",

// //       // Fashion Agents
// //       "personal-stylist": "Wedding guest ke liye perfect outfit suggest karo under 5000",
// //       "size-advisor": "Height 5'8\" weight 70kg ke liye kurti aur jeans ka size batao",
// //       "budget-shopper": "Under 1500 mein best casual wear dikhao",
// //       "occasion-planner": "Ganesh Chaturthi ke liye traditional festive outfit suggest karo",
// //       "wardrobe-assistant": "Mere paas blue jeans hai, uske saath best top aur shoes suggest karo",
// //       "trend-spotter": "Current summer trends mein kya chal raha hai, best products dikhao",
// //       "outfit-completer": "White shirt ke saath best bottom aur shoes suggest karo",
// //       "gift-suggester": "Girlfriend ke liye anniversary gift under 3000 suggest karo",

// //       // Others
// //       "visual-search": "Is image jaisa similar products dhoondho",
// //       "order-tracking": "Track my order",
// //     };

// //     const defaultMessage = "Hello, mujhe kuch achha suggest karo";

// //     res.json({
// //       type: "draft",
// //       message: drafts[agentType] || defaultMessage,
// //       intent: agentType
// //     });

// //   } catch (error) {
// //     console.error("Generate Draft Error:", error);
// //     res.json({
// //       type: "draft",
// //       message: "Nylon T Shirt for Men order kar do size M",
// //       intent: "chat-to-order"
// //     });
// //   }
// // };

// // // export const generateDraft = async (req, res) => {
// // //   const { agentType } = req.body;

// // //   const drafts = {
// // //     "chat-to-order": "Nylon T Shirt for Men order kar do size M",
// // //     "personal-stylist": "Wedding ke liye casual outfit suggest karo under 5000",
// // //     "size-advisor": "Size advisor for height 5'8\" weight 70kg",
// // //     "visual-search": "Find similar products to this description",
// // //   };

// // //   res.json({
// // //     type: "draft",
// // //     message: drafts[agentType] || "Hello, suggest some good products",
// // //     intent: agentType
// // //   });
// // // };

// // // export const visualSearch = async (req, res) => {
// // //   try {
// // //     const file = req.file;
// // //     const category = String(req.body.category || '').toLowerCase();
// // //     if (!file) return res.json([]);

// // //     // 1) ask model to describe image (compact tags to keep latency small)
// // //     const b64 = file.buffer.toString('base64');
// // //     const mime = file.mimetype || 'image/png';

// // //     const prompt =
// // //       'You are an ecommerce vision tagger. Return a short, comma-separated list of tags '
// // //       + '(category, color, pattern, sleeve/neck type, fabric, fit, gender). No sentences. Example: '
// // //       + '"women, kurti, cotton, floral, green, 3/4 sleeve, straight fit".';

// // //     const { content: tagsText } = await orChat([{
// // //       role: 'user',
// // //       content: [
// // //         { type: 'text', text: prompt },
// // //         { type: 'image_url', image_url: `data:${mime};base64,${b64}` }
// // //       ]
// // //     }]);

// // //     const tags = (tagsText || '').replace(/\n/g,' ').slice(0, 300);

// // //     // 2) embed query tags
// // //     const qVec = await embedText(tags);

// // //     // 3) candidate products (prefilter by category if provided)
// // //     const filter = { isActive: { $ne: false } };
// // //     if (['men','women','kids'].includes(category)) filter.category = new RegExp(`^${category}$`, 'i');
// // //     const products = await Product.find(filter).lean();

// // //     // 4) embed product texts in batch
// // //     const texts = products.map(p =>
// // //       `${p.title} ${p.brand} ${p.category} ${p.description || ''}`.trim()
// // //     );
// // //     const pVecs = await embedMany(texts);

// // //     // 5) cosine rank
// // //     const ranked = products
// // //       .map((p, i) => ({ p, s: cosine(qVec, pVecs[i] || []) }))
// // //       .sort((a,b)=> b.s - a.s)
// // //       .slice(0, 24)
// // //       .map(r => r.p);

// // //     return res.json(ranked);
// // //   } catch (e) {
// // //     console.error('visualSearch error:', e?.message || e);
// // //     return res.json([]);   // never 500; return empty on failure
// // //   }
// // // };






// // export const visualSearch = async (req, res) => {
// //   try {
// //     const file = req.file;
// //     const category = String(req.body.category || '').toLowerCase();

// //     if (!file) {
// //       return res.status(400).json({ message: "No image uploaded" });
// //     }

// //     // 1. Get AI Vision Description (Better Prompt)
// //     const b64 = file.buffer.toString('base64');
// //     const mime = file.mimetype || 'image/jpeg';

// //     const visionPrompt = `You are a fashion product expert. Analyze this image and return ONLY comma-separated tags.
// // Include: gender, category, brand (if visible), color, pattern, style, sleeve/neck, material, fit.
// // Example: "men, shoes, nike, black, running, sneakers, mesh, athletic"`;

// //     const { content: tagsText } = await orChat([{
// //       role: 'user',
// //       content: [
// //         { type: 'text', text: visionPrompt },
// //         { type: 'image_url', image_url: `data:${mime};base64,${b64}` }
// //       ]
// //     }], { model: 'openai/gpt-4o-mini' });

// //     const tags = (tagsText || "fashion, product").replace(/\n/g, ' ').trim();

// //     // 2. Embed the tags
// //     const qVec = await embedText(tags);

// //     // 3. Fetch candidate products
// //     const filter = { isActive: true };
// //     if (['men', 'women', 'kids'].includes(category)) {
// //       filter.category = new RegExp(`^${category}$`, 'i');
// //     }

// //     const products = await Product.find(filter).lean().limit(50);

// //     // 4. Embed all products
// //     const productTexts = products.map(p => 
// //       `${p.title} ${p.brand} ${p.category} ${p.description || ''}`.trim()
// //     );

// //     const pVecs = await embedMany(productTexts);

// //     // 5. Rank by similarity
// //     const ranked = products
// //       .map((p, i) => ({
// //         ...p,
// //         similarity: cosine(qVec, pVecs[i] || [])
// //       }))
// //       .sort((a, b) => b.similarity - a.similarity)
// //       .slice(0, 12);   // Top 12 results

// //     return res.json(ranked);

// //   } catch (e) {
// //     console.error('Visual Search Error:', e?.message || e);
// //     return res.json([]); // Graceful fallback
// //   }
// // };
// // // ---- Search (semantic + typo tolerant + safe fallbacks) ----
// // export const smartSearch = async (req, res, next) => {
// //   try {
// //     const qRaw = String(req.query.q || '').trim();
// //     if (!qRaw) return res.json([]);

// //     // Parse constraints like "under 2k / under 100 rs"
// //     const under = qRaw.match(/under\s*(\d+)\s*(k|rs)?/i);
// //     const budget = under ? (Number(under[1]) * (under[2]?.toLowerCase() === 'k' ? 1000 : 1)) : null;

// //     // Category hints
// //     const qlc = qRaw.toLowerCase();
// //     let catRx = null;
// //     if (/\bwomen|woman|ladies|female\b/.test(qlc)) catRx = /^women$/i;
// //     else if (/\bmen|man|male\b/.test(qlc)) catRx = /^men$/i;
// //     else if (/\bkids|children|child|boys|girls\b/.test(qlc)) catRx = /^kids$/i;

// //     // Pre-filter
// //     const baseFilter = { isActive: { $ne: false } };
// //     if (catRx) baseFilter.category = catRx;

// //     const all = await Product.find(baseFilter).lean();

// //     // Rank (batch embeddings with fallback)
// //     let ranked = await rankProductsByQuery(all, qRaw);

// //     // Budget filter if requested
// //     if (budget != null) ranked = ranked.filter(p => Number(p.price) <= budget);

// //     // Fallback if everything got filtered out
// //     if (!ranked.length) {
// //       const rx = new RegExp(qRaw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
// //       ranked = all.filter(p => rx.test(`${p.title} ${p.brand} ${p.category} ${p.description || ''}`));
// //       if (budget != null) ranked = ranked.filter(p => Number(p.price) <= budget);
// //     }

// //     return res.json(ranked.slice(0, 24));
// //   } catch (e) {
// //     // Final safety net: never 500; return empty array on AI errors
// //     console.error('smartSearch error:', e?.message || e);
// //     return res.json([]);
// //   }
// // };




// // // ---- Recommendations ----
// // // similar by product
// // export const recommendSimilar = async (req, res, next) => {
// //   try {
// //     const id = req.params.id;
// //     if (!isValidId(id)) return res.json([]);
// //     const p = await Product.findById(id).lean();
// //     if (!p) return res.json([]);
// //     const items = await Product.find({
// //       _id: { $ne: p._id },
// //       isActive: { $ne: false },
// //       $or: [{ brand: p.brand }, { category: p.category }]
// //     }).limit(12).lean();
// //     res.json(items);
// //   } catch (e) { next(e); }
// // };

// // // personalized feed (views/orders heuristic)
// // export const recommendPersonal = async (req, res, next) => {
// //   try {
// //     const userId = req.user?._id;
// //     if (!userId) return res.json([]); // must be logged in
// //     const orders = await Order.find({ user: userId }).lean();
// //     const freqBrand = new Map();
// //     const freqCat = new Map();
// //     for (const o of orders) {
// //       for (const it of o.items || []) {
// //         if (it.title && it.title.brand) freqBrand.set(it.title.brand, (freqBrand.get(it.title.brand) || 0) + 1);
// //         if (it.size) {} // ignore
// //       }
// //     }
// //     // fallback on recent popular
// //     let items = await Product.find({ isActive: { $ne: false } }).sort({ ratingCount: -1, createdAt: -1 }).limit(24).lean();
// //     if (freqBrand.size) {
// //       const topBrand = [...freqBrand.entries()].sort((a,b)=>b[1]-a[1])[0][0];
// //       items = await Product.find({ brand: topBrand, isActive: { $ne: false } }).limit(24).lean();
// //     }
// //     res.json(items);
// //   } catch (e) { next(e); }
// // };



// // // ---- Size Advisor ----
// // // --- Size Advisor (rule-based; no PII stored) ---
// // export const sizeAdvisor = async (req, res) => {
// //   try {
// //     let {
// //       gender = "men",           // men | women | kids
// //       category = "",            // topwear, shirt, tshirt, kurta, dress, etc.
// //       heightCm = 0,             // number
// //       weightKg = 0,             // number
// //       fit = "regular",          // slim | regular | loose
// //       brand = "",               // optional
// //     } = req.body || {};

// //     gender = String(gender || "men").toLowerCase();
// //     fit    = String(fit || "regular").toLowerCase();
// //     brand  = String(brand || "").toLowerCase();
// //     category = String(category || "").toLowerCase();

// //     heightCm = Number(heightCm);
// //     weightKg = Number(weightKg);
// //     if (!heightCm || !weightKg) {
// //       return res.status(400).json({ message: "heightCm & weightKg required" });
// //     }

// //     // --- simple heuristic: estimate chest/bust from height + weight
// //     // Not medical—just to bucket sizes.
// //     const estChest = Math.round(0.55 * heightCm + 0.23 * weightKg); // ~ for men tops
// //     const estBust  = Math.round(0.53 * heightCm + 0.24 * weightKg); // ~ for women tops

// //     // --- size charts (cm)
// //     const charts = {
// //       men: [
// //         { size: "S",  chest: [86, 94]  },
// //         { size: "M",  chest: [94, 100] },
// //         { size: "L",  chest: [100,106] },
// //         { size: "XL", chest: [106,112] },
// //         { size: "XXL", chest: [112,118] },
// //         { size: "3XL", chest: [118,126] },
// //       ],
// //       women: [
// //         { size: "XS", bust: [76, 82]  },
// //         { size: "S",  bust: [82, 88]  },
// //         { size: "M",  bust: [88, 94]  },
// //         { size: "L",  bust: [94, 100] },
// //         { size: "XL", bust: [100,106] },
// //         { size: "XXL", bust: [106,112] },
// //       ],
// //     };

// //     const table = gender === "women" ? charts.women : charts.men;

// //     // pick bucket by measurement
// //     const pickByRange = (val, key) => {
// //       for (const row of table) {
// //         const [lo, hi] = row[key];
// //         if (val >= lo && val < hi) return row.size;
// //       }
// //       return table.at(-1).size; // largest fallback
// //     };

// //     let baseSize = gender === "women"
// //       ? pickByRange(estBust, "bust")
// //       : pickByRange(estChest, "chest");

// //     // brand adjustments (some brands run small/large)
// //     // +1 => upsize, -1 => downsize
// //     const brandAdjMap = {
// //       "zara": -1, "hm": 0, "h&m": 0, "levi": 0, "levis": 0, "us polo": +1,
// //       "roadster": 0, "allen solly": -1, "peter england": 0
// //     };
// //     const sizesOrder = ["XS","S","M","L","XL","XXL","3XL","4XL"];
// //     const idxOf = (s) => sizesOrder.indexOf(s);

// //     const bump = (s, delta) => {
// //       const i = idxOf(s);
// //       if (i < 0) return s;
// //       return sizesOrder[Math.min(sizesOrder.length-1, Math.max(0, i + delta))];
// //     };

// //     // brand tweak
// //     const bDelta = brandAdjMap[brand] ?? 0;
// //     baseSize = bump(baseSize, bDelta);

// //     // fit tweak
// //     if (fit === "slim")   baseSize = bump(baseSize, -1);
// //     if (fit === "loose")  baseSize = bump(baseSize, +1);

// //     // category tweak (if bottom-wear you can customize later)
// //     // keeping top-wear for now

// //     const noteParts = [];
// //     noteParts.push(`Based on ${heightCm}cm / ${weightKg}kg`);
// //     if (fit !== "regular") noteParts.push(`${fit} fit preference`);
// //     if (bDelta !== 0) noteParts.push(`brand adjustment ${bDelta > 0 ? "+1 (runs small)" : "-1 (runs large)"}`);

// //     return res.json({
// //       recommendation: baseSize,
// //       reason: noteParts.join(", "),
// //       inputs: { gender, category, heightCm, weightKg, fit, brand },
// //       chartUsed: gender,
// //     });
// //   } catch (e) {
// //     console.error(e);
// //     res.status(500).json({ message: "size advisor failed" });
// //   }
// // };






// // // ... your existing functions (smartSearch, visualSearch, etc.)

// // /**
// //  * AI Shopping Assistant - Multi-Agent Orchestrator
// // //  */

// // // export const assistant = async (req, res) => {
// // //   try {
// // //     const { message } = req.body;
// // //     const userId = req.user?._id;
// // //     if (!userId) return res.status(401).json({ reply: "Please login first" });

// // //     const lowerMsg = message.toLowerCase().trim();

// // //     // Order / Add to Cart Intent
// // //     if (lowerMsg.includes("order") || lowerMsg.includes("add") || 
// // //         lowerMsg.includes("buy") || lowerMsg.includes("kar do")) {

// // //       const product = await shoppingAgent(message);

// // //       if (!product) {
// // //         return res.json({
// // //           reply: "Sorry, I couldn't find any matching product. Try 'Nike shirt' or 'Kurti under 1000'",
// // //         });
// // //       }

// // //       // Extract size
// // //       let size = "M";
// // //       const sizeMatch = message.match(/size\s*([A-Z0-9]+)/i);
// // //       if (sizeMatch) size = sizeMatch[1].toUpperCase();

// // //       await addToCartAgent(userId, product._id, size, 1);

// // //       const cart = await Cart.findOne({ user: userId });
// // //       const cartItems = cart?.items || [];

// // //       const decision = await checkoutDecisionAgent(cartItems, userId);

// // //       return res.json({
// // //         reply: `✅ **${product.title}** (Size: ${size}) successfully added to your cart!\n\n${decision.message}`,
// // //         action: "show_payment_options",
// // //         productAdded: product.title,
// // //         cartTotal: decision.total || product.price
// // //       });
// // //     }

// // //     // Payment handling
// // //     if (lowerMsg.includes("online") || lowerMsg.includes("razorpay") || 
// // //         lowerMsg.includes("2") || lowerMsg.includes("card")) {
// // //       const cart = await Cart.findOne({ user: userId });
// // //       if (!cart?.items?.length) {
// // //         return res.json({ reply: "Your cart is empty. Add products first!" });
// // //       }

// // //       const total = cart.items.reduce((sum, i) => sum + (i.price * i.qty), 0);
// // //       const paymentData = await paymentAgent(userId, total);

// // //       return res.json({
// // //         reply: "🔄 Opening Razorpay payment gateway...",
// // //         action: "open_razorpay",
// // //         paymentData
// // //       });
// // //     }

// // //     if (lowerMsg.includes("cod") || lowerMsg.includes("cash") || lowerMsg.includes("1")) {
// // //       return res.json({
// // //         reply: "✅ Order placed with Cash on Delivery!\nTrack it in My Orders.",
// // //         action: "cod_success"
// // //       });
// // //     }

// // //     // Default fallback
// // //     return res.json({
// // //       reply: "Try something like:\n• 'Order Nike shirt size M'\n• 'Add kurti to cart'\n• 'Online payment'",
// // //     });

// // //   } catch (err) {
// // //     console.error("Assistant Error:", err);
// // //     res.json({ reply: "Something went wrong. Please try again." });
// // //   }
// // // };




// // // export const assistant = async (req, res) => {
// // //   try {
// // //     const { message } = req.body;
// // //     const userId = req.user?._id;
// // //     if (!userId) return res.status(401).json({ reply: "Please login first" });

// // //     const lowerMsg = message.toLowerCase().trim();

// // //     // ====================== ORDER TRACKING ======================
// // //     if (lowerMsg.includes("track") || lowerMsg.includes("delivery") || 
// // //         lowerMsg.includes("status") || lowerMsg.includes("kab aayega") || 
// // //         lowerMsg.includes("order status")) {

// // //       const result = await orderDeliveryAgent(userId, message);
      
// // //       // If multiple orders, show options
// // //       if (result.orders && result.orders.length > 1) {
// // //         let reply = "You have multiple orders. Which one would you like to track?\n\n";
        
// // //         result.orders.forEach((order, index) => {
// // //           const shortId = order._id.toString().slice(-6);
// // //           reply += `${index + 1}. Order #${shortId} - ${order.status} (₹${order.total})\n`;
// // //         });

// // //         reply += "\nReply with the number (e.g. '1' or 'Track order 1')";

// // //         return res.json({
// // //           reply,
// // //           action: "multi_order_select",
// // //           orders: result.orders.map(o => ({
// // //             id: o._id,
// // //             shortId: o._id.toString().slice(-8),
// // //             status: o.status,
// // //             total: o.total
// // //           }))
// // //         });
// // //       }

// // //       // Single order or no order
// // //       return res.json({ 
// // //         reply: result.reply, 
// // //         action: "order_tracking" 
// // //       });
// // //     }

// // //     // ====================== ADD TO CART ======================
// // //     if (lowerMsg.includes("order") || lowerMsg.includes("add") || 
// // //         lowerMsg.includes("buy") || lowerMsg.includes("kar do")) {

// // //       const product = await shoppingAgent(message);

// // //       if (!product) {
// // //         return res.json({
// // //           reply: "Sorry, I couldn't find any matching product. Try 'Nike shirt' or 'Kurti under 1000'",
// // //         });
// // //       }

// // //       let size = "M";
// // //       const sizeMatch = message.match(/size\s*([A-Z0-9]+)/i);
// // //       if (sizeMatch) size = sizeMatch[1].toUpperCase();

// // //       await addToCartAgent(userId, product._id, size, 1);

// // //       const cart = await Cart.findOne({ user: userId });
// // //       const cartItems = cart?.items || [];

// // //       const decision = await checkoutDecisionAgent(cartItems, userId);

// // //       return res.json({
// // //         reply: `✅ **${product.title}** (Size: ${size}) successfully added to your cart!\n\n${decision.message}`,
// // //         action: "show_payment_options",
// // //         productAdded: product.title,
// // //         cartTotal: decision.total || product.price
// // //       });
// // //     }

// // //     // Inside assistant function:
// // // if (lowerMsg.includes("stylist") || lowerMsg.includes("outfit") || lowerMsg.includes("look")) {
// // //   const result = await personalStylistAgent(message, userId);
// // //   return res.json({ reply: result.reply });
// // // }

// // // if (lowerMsg.includes("size") || lowerMsg.includes("height") || lowerMsg.includes("weight")) {
// // //   const result = await sizeAdvisorAgent(message);
// // //   return res.json({ reply: result.reply });
// // // }

// // // if (lowerMsg.includes("under") || lowerMsg.includes("budget") || lowerMsg.includes("sasta")) {
// // //   const result = await budgetShopperAgent(message);
// // //   return res.json({ reply: result.reply });
// // // }

// // // if (lowerMsg.includes("ganesh") || lowerMsg.includes("festival") || lowerMsg.includes("wedding") || 
// // //     lowerMsg.includes("occasion") || lowerMsg.includes("party")) {
// // //   const result = await occasionPlannerAgent(message);
// // //   return res.json({ reply: result.reply });
// // // }


// // //     // ====================== PAYMENT HANDLING ======================
// // //     if (lowerMsg.includes("online") || lowerMsg.includes("razorpay") || 
// // //         lowerMsg.includes("2") || lowerMsg.includes("card") || 
// // //         lowerMsg.includes("upi")) {

// // //       const cart = await Cart.findOne({ user: userId });
// // //       if (!cart?.items?.length) {
// // //         return res.json({ reply: "Your cart is empty. Add products first!" });
// // //       }

// // //       const total = cart.items.reduce((sum, i) => sum + (i.price * i.qty), 0);
// // //       const paymentData = await paymentAgent(userId, total);

// // //       return res.json({
// // //         reply: "🔄 Opening Razorpay payment gateway...",
// // //         action: "open_razorpay",
// // //         paymentData
// // //       });
// // //     }

// // //     if (lowerMsg.includes("cod") || lowerMsg.includes("cash") || lowerMsg.includes("1")) {
// // //       return res.json({
// // //         reply: "✅ Order placed with Cash on Delivery!\nTrack it in My Orders.",
// // //         action: "cod_success"
// // //       });
// // //     }

// // //     // ====================== DEFAULT ======================
// // //     return res.json({
// // //       reply: "Try these:\n• 'Order Nike shirt size M'\n• 'Track my order'\n• 'Wedding outfit suggest karo'",
// // //     });

// // //   } catch (err) {
// // //     console.error("Assistant Error:", err);
// // //     res.json({ reply: "Something went wrong. Please try again." });
// // //   }
// // // };








// // // ---- Fraud Risk Score ----
// // export const riskScore = async (req, res) => {
// //   const {
// //     deviceFingerprint = '',
// //     ipCountry = '',
// //     billingCountry = '',
// //     ordersLast24h = 0,
// //     codAbuseCount = 0,
// //     emailAgeDays = 365,
// //     velocityPerMin = 0
// //   } = req.body || {};

// //   let score = 0;
// //   // basic signals
// //   if (ipCountry && billingCountry && ipCountry !== billingCountry) score += 25;
// //   if (ordersLast24h > 2) score += 20;
// //   if (velocityPerMin > 5) score += 15;
// //   score += Math.min(20, codAbuseCount * 10);
// //   if (emailAgeDays < 30) score += 15;

// //   const action = score >= 60 ? 'block' : score >= 35 ? 'step_up' : 'allow';
// //   return res.json({ score, action });
// // };

// // // ---- Forecast (very simple) ----
// // export const forecast = async (req, res, next) => {
// //   try {
// //     const sku = String(req.query.sku || '').trim();
// //     if (!sku) return res.json({ sku: '', avgPerDay: 0, suggestedReorder: 0 });

// //     // last 30 days sales by SKU
// //     const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
// //     // ensure Order schema has { timestamps: true } so createdAt exists
// //     const orders = await Order.find({ createdAt: { $gte: since } }).lean();

// //     let total = 0;
// //     for (const o of orders) {
// //       for (const it of (o.items || [])) {
// //         if (String(it.sku) === sku) total += Number(it.qty || 0);
// //       }
// //     }

// //     const avgPerDay = Math.round((total / 30) * 100) / 100;
// //     const suggestedReorder = Math.ceil(avgPerDay * 14); // 2 weeks buffer
// //     return res.json({ sku, avgPerDay, suggestedReorder });
// //   } catch (e) {
// //     next(e);
// //   }
// // };



// // import priceSuggestFromProduct from "../ai/priceSuggest.js";

// // export async function priceSuggest(req, res, next) {
// //   try {
// //     const { productId } = req.params;
// //     const product = await Product.findById(productId).lean();
// //     if (!product) return res.status(404).json({ ok: false, error: "Product not found" });

// //     const out = priceSuggestFromProduct(product);
// //     const pct = Math.round(out.deltaPct * 100);
// //     const sign = pct >= 0 ? "+" : "";

// //     return res.json({
// //       ok: true,
// //       current: out.current,
// //       suggested: out.suggested,
// //       deltaPct: pct,
// //       message: `Current ${out.current} → Suggest ${out.suggested} (${sign}${pct}%)`,
// //       details: out.debug
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // }





// // backend/controllers/aiController.js

// import mongoose from 'mongoose';
// import Product from '../models/Product.js';
// import Review from '../models/Review.js';
// import Order from '../models/Order.js';
// import Cart from '../models/Cart.js';
// import { env } from '../config/env.js';
// import { orChat } from '../utils/openrouter.js';
// import { embedText, embedMany } from '../ai/embeddings.js';
// import { rankProductsByQuery } from '../ai/semanticSearch.js';
// import { callOpenRouter } from '../utils/openrouter.js';
// import { cosine } from '../utils/openrouter.js';
// import priceSuggestFromProduct from "../ai/priceSuggest.js";

// // Import all agents
// import { shoppingAgent } from '../ai/agents/shoppingAgent.js';
// import { addToCartAgent } from '../ai/agents/cartAgent.js';
// import { checkoutDecisionAgent } from '../ai/agents/checkoutAgent.js';
// import { paymentAgent } from '../ai/agents/paymentAgent.js';
// import { orderDeliveryAgent } from '../ai/agents/orderDeliveryAgent.js';
// import {
//   personalStylistAgent,
//   sizeAdvisorAgent,
//   budgetShopperAgent,
//   occasionPlannerAgent,
//   wardrobeAssistantAgent,
//   trendSpotterAgent,
//   outfitCompleterAgent,
//   giftSuggesterAgent,
// } from '../ai/agents/index.js';

// const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// // ============================================
// // REVIEW SUMMARY
// // ============================================

// const heuristicSummary = (reviews) => {
//   if (!reviews.length) {
//     return `**Pros:** Not enough data.
// **Cons:** No reviews yet.
// **Verdict:** Not enough reviews to form an opinion.`;
//   }

//   const positives = reviews.filter(r => (r.rating || 0) >= 4);
//   const negatives = reviews.filter(r => (r.rating || 0) <= 2);

//   const pros = positives.slice(0, 5).map(r => (r.comment || '').trim()).filter(Boolean);
//   const cons = negatives.slice(0, 5).map(r => (r.comment || '').trim()).filter(Boolean);

//   const prosText = pros.length ? pros.map(p => `- ${p}`).join('\n') : 'None clearly mentioned.';
//   const consText = cons.length ? cons.map(c => `- ${c}`).join('\n') : 'None clearly mentioned.';

//   const avg = (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1);
//   let verdict = 'Mixed feedback; consider reading reviews.';
//   if (+avg >= 4) verdict = 'Recommended by most buyers.';
//   else if (+avg <= 2.5) verdict = 'Not recommended by many buyers.';

//   return `**Pros:**\n${prosText}\n\n**Cons:**\n${consText}\n\n**Verdict:** ${verdict}`;
// };

// export const reviewSummary = async (req, res, next) => {
//   try {
//     const { productId } = req.params;
//     if (!productId || !isValidId(productId)) {
//       return res.status(400).json({ summary: 'Invalid product id.', count: 0, avg: 0 });
//     }

//     const product = await Product.findById(productId).select('_id');
//     if (!product) {
//       return res.status(404).json({ summary: 'Product not found.', count: 0, avg: 0 });
//     }

//     const reviews = await Review.find({ product: productId })
//       .select('rating comment')
//       .sort({ createdAt: -1 })
//       .lean();

//     const count = reviews.length;
//     const avg = count ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / count) : 0;

//     let summary = heuristicSummary(reviews);

//     // Try LLM for better summary (optional fallback)
//     if (reviews.length) {
//       try {
//         const text = reviews
//           .map((r, i) => `${i + 1}. [${r.rating}★] ${r.comment || ''}`)
//           .join('\n')
//           .slice(0, 3000);

//         const prompt = `Summarize these customer reviews for a shopping product in 3 blocks: Pros, Cons, Verdict.
// Keep neutral tone, no hallucinations, and base only on the given reviews.
// Reviews:
// ${text}`;

//         const llm = await callOpenRouter({
//           system: 'You are a precise review summarizer for e-commerce.',
//           user: prompt,
//         });

//         if (llm?.trim()) summary = llm.trim();
//       } catch (e) {
//         console.warn('OpenRouter summary fallback used:', e.message);
//       }
//     }

//     return res.json({ summary, count, avg: +avg.toFixed(2) });
//   } catch (e) {
//     console.error('Review summary error:', e);
//     next(e);
//   }
// };

// // ============================================
// // MAIN ASSISTANT CONTROLLER
// // ============================================

// export const assistant = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const userId = req.user?._id;

//     if (!userId) {
//       return res.status(401).json({ reply: "Please login first" });
//     }

//     if (!message || typeof message !== 'string') {
//       return res.status(400).json({ reply: "Please provide a valid message." });
//     }

//     const lowerMsg = message.toLowerCase().trim();

//     // ====================== CHAT TO ORDER ======================
//     if (lowerMsg.includes("order") || lowerMsg.includes("add") || 
//         lowerMsg.includes("buy") || lowerMsg.includes("kar do")) {

//       const product = await shoppingAgent(message);

//       if (!product) {
//         return res.json({
//           reply: "❌ This product is not available in our store right now.\n\nPlease try another name like 'Shirt', 'Kurti', or 'Jeans'.",
//         });
//       }

//       // Extract size
//       let size = "M";
//       const sizeMatch = message.match(/size\s*:?\s*([A-Z0-9XL]{1,3})/i);
//       if (sizeMatch) size = sizeMatch[1].toUpperCase();

//       // Add to cart
//       try {
//         await addToCartAgent(userId, product._id, size, 1);
//       } catch (err) {
//         console.error("Add to cart error:", err);
//         return res.status(500).json({ reply: "Failed to add item to cart. Please try again." });
//       }

//       // Get total
//       const cart = await Cart.findOne({ user: userId });
//       const total = cart?.items?.reduce((sum, i) => sum + (i.price * i.qty), 0) || product.price;

//       // Direct Razorpay
//       const paymentData = await paymentAgent(userId, total);

//       return res.json({
//         reply: `✅ **${product.title}** (Size: ${size}) successfully added to your cart!\n\n🔄 Opening Razorpay payment gateway...`,
//         action: "open_razorpay",
//         paymentData
//       });
//     }

//     // ====================== PERSONAL STYLIST ======================
//     if (lowerMsg.includes("stylist") || lowerMsg.includes("outfit") || lowerMsg.includes("look")) {
//       const result = await personalStylistAgent(message, userId);
//       return res.json({ reply: result.reply });
//     }

//     // ====================== SIZE ADVISOR ======================
//     if (lowerMsg.includes("size") || lowerMsg.includes("height") || lowerMsg.includes("weight")) {
//       const result = await sizeAdvisorAgent(message);
//       return res.json({ reply: result.reply });
//     }

//     // ====================== BUDGET SHOPPER ======================
//     if (lowerMsg.includes("under") || lowerMsg.includes("budget") || lowerMsg.includes("sasta")) {
//       const result = await budgetShopperAgent(message);
//       return res.json({ reply: result.reply });
//     }

//     // ====================== OCCASION PLANNER ======================
//     if (lowerMsg.includes("ganesh") || lowerMsg.includes("festival") || lowerMsg.includes("wedding") || lowerMsg.includes("occasion")) {
//       const result = await occasionPlannerAgent(message);
//       return res.json({ reply: result.reply });
//     }

//     // ====================== ORDER TRACKING ======================
//     if (lowerMsg.includes("track") || lowerMsg.includes("delivery") || lowerMsg.includes("status") || lowerMsg.includes("kab aayega")) {
//       const result = await orderDeliveryAgent(userId);
//       return res.json({ reply: result.reply });
//     }

//     // ====================== DEFAULT FALLBACK ======================
//     return res.json({
//       reply: "Click any agent card or try:\n• Shirt order kar do size M\n• Track my order",
//     });

//   } catch (err) {
//     console.error("Assistant Error:", err);
//     res.status(500).json({ reply: "Something went wrong. Please try again." });
//   }
// };

// // ============================================
// // CHECKOUT DECISION
// // ============================================

// export const checkoutDecision = async (req, res) => {
//   try {
//     const { items } = req.body;
//     const userId = req.user?._id;

//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return res.json({
//         message: "Your cart is empty.",
//         suggestedMethod: "COD",
//         canUseCOD: true,
//         discountForPrepaid: 0,
//         total: 0,
//         finalTotal: 0,
//         fraudRisk: false
//       });
//     }

//     const decision = await checkoutDecisionAgent(items, userId);

//     return res.json({
//       message: decision.message,
//       suggestedMethod: decision.suggestedMethod,
//       canUseCOD: decision.canUseCOD,
//       discountForPrepaid: decision.discountForPrepaid,
//       total: decision.total,
//       finalTotal: decision.finalTotal,
//       fraudRisk: decision.fraudRisk
//     });
//   } catch (err) {
//     console.error("Checkout Decision Error:", err);
//     return res.status(500).json({
//       message: "You can pay via COD or Razorpay.",
//       suggestedMethod: "COD"
//     });
//   }
// };

// // ============================================
// // GENERATE DRAFT
// // ============================================

// export const generateDraft = async (req, res) => {
//   try {
//     const { agentType } = req.body;

//     if (!agentType) {
//       return res.status(400).json({ 
//         type: "draft",
//         message: "Invalid request",
//         success: false
//       });
//     }

//     const drafts = {
//       // Core Shopping
//       "chat-to-order": "Nylon T Shirt for Men order kar do size M",

//       // Fashion Agents
//       "personal-stylist": "Wedding guest ke liye perfect outfit suggest karo under 5000",
//       "size-advisor": "Height 5'8\" weight 70kg ke liye kurti aur jeans ka size batao",
//       "budget-shopper": "Under 1500 mein best casual wear dikhao",
//       "occasion-planner": "Ganesh Chaturthi ke liye traditional festive outfit suggest karo",
//       "wardrobe-assistant": "Mere paas blue jeans hai, uske saath best top aur shoes suggest karo",
//       "trend-spotter": "Current summer trends mein kya chal raha hai, best products dikhao",
//       "outfit-completer": "White shirt ke saath best bottom aur shoes suggest karo",
//       "gift-suggester": "Girlfriend ke liye anniversary gift under 3000 suggest karo",

//       // Others
//       "visual-search": "Is image jaisa similar products dhoondho",
//       "order-tracking": "Track my order",
//     };

//     const defaultMessage = "Hello, mujhe kuch achha suggest karo";

//     res.json({
//       type: "draft",
//       message: drafts[agentType] || defaultMessage,
//       intent: agentType,
//       success: true
//     });

//   } catch (error) {
//     console.error("Generate Draft Error:", error);
//     res.status(500).json({
//       type: "draft",
//       message: "Nylon T Shirt for Men order kar do size M",
//       intent: "chat-to-order",
//       success: false
//     });
//   }
// };

// // ============================================
// // VISUAL SEARCH
// // ============================================

// export const visualSearch = async (req, res) => {
//   try {
//     const file = req.file;
//     const category = String(req.body.category || '').toLowerCase();

//     if (!file) {
//       return res.status(400).json({ message: "No image uploaded" });
//     }

//     // Get AI Vision Description
//     const b64 = file.buffer.toString('base64');
//     const mime = file.mimetype || 'image/jpeg';

//     const visionPrompt = `You are a fashion product expert. Analyze this image and return ONLY comma-separated tags.
// Include: gender, category, brand (if visible), color, pattern, style, sleeve/neck, material, fit.
// Example: "men, shoes, nike, black, running, sneakers, mesh, athletic"`;

//     const { content: tagsText } = await orChat([{
//       role: 'user',
//       content: [
//         { type: 'text', text: visionPrompt },
//         { type: 'image_url', image_url: `data:${mime};base64,${b64}` }
//       ]
//     }], { model: 'openai/gpt-4o-mini' });

//     const tags = (tagsText || "fashion, product").replace(/\n/g, ' ').trim();

//     // Embed the tags
//     const qVec = await embedText(tags);

//     // Fetch candidate products
//     const filter = { isActive: true };
//     if (['men', 'women', 'kids'].includes(category)) {
//       filter.category = new RegExp(`^${category}$`, 'i');
//     }

//     const products = await Product.find(filter).lean().limit(50);

//     if (!products.length) {
//       return res.json([]);
//     }

//     // Embed all products
//     const productTexts = products.map(p => 
//       `${p.title || ''} ${p.brand || ''} ${p.category || ''} ${p.description || ''}`.trim()
//     );

//     const pVecs = await embedMany(productTexts);

//     // Rank by similarity
//     const ranked = products
//       .map((p, i) => ({
//         ...p,
//         similarity: cosine(qVec, pVecs[i] || [])
//       }))
//       .sort((a, b) => b.similarity - a.similarity)
//       .slice(0, 12);

//     return res.json(ranked);

//   } catch (e) {
//     console.error('Visual Search Error:', e?.message || e);
//     return res.json([]);
//   }
// };

// // ============================================
// // SMART SEARCH (SEMANTIC + TYPO TOLERANT)
// // ============================================

// export const smartSearch = async (req, res, next) => {
//   try {
//     const qRaw = String(req.query.q || '').trim();
//     if (!qRaw) return res.json([]);

//     // Parse constraints like "under 2k" or "under 100 rs"
//     const budgetMatch = qRaw.match(/under\s*(?:rs\.?|₹)?\s*(\d+)\s*([k])?/i);
//     let budget = null;
//     if (budgetMatch) {
//       budget = Number(budgetMatch[1]);
//       if (budgetMatch[2]?.toLowerCase() === 'k') {
//         budget *= 1000;
//       }
//     }

//     // Category hints
//     const qlc = qRaw.toLowerCase();
//     let categoryRegex = null;
//     if (/\bwomen|woman|ladies|female\b/.test(qlc)) {
//       categoryRegex = /^women$/i;
//     } else if (/\bmen|man|male\b/.test(qlc)) {
//       categoryRegex = /^men$/i;
//     } else if (/\bkids|children|child|boys|girls\b/.test(qlc)) {
//       categoryRegex = /^kids$/i;
//     }

//     // Pre-filter
//     const baseFilter = { isActive: { $ne: false } };
//     if (categoryRegex) {
//       baseFilter.category = categoryRegex;
//     }

//     const allProducts = await Product.find(baseFilter).lean();

//     // Rank by semantic similarity
//     let ranked = await rankProductsByQuery(allProducts, qRaw);

//     // Apply budget filter if specified
//     if (budget != null) {
//       ranked = ranked.filter(p => Number(p.price) <= budget);
//     }

//     // Fallback if no results: regex search
//     if (!ranked.length) {
//       const searchRegex = new RegExp(qRaw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
//       ranked = allProducts.filter(p => 
//         searchRegex.test(`${p.title || ''} ${p.brand || ''} ${p.category || ''} ${p.description || ''}`)
//       );
      
//       if (budget != null) {
//         ranked = ranked.filter(p => Number(p.price) <= budget);
//       }
//     }

//     return res.json(ranked.slice(0, 24));
//   } catch (e) {
//     console.error('smartSearch error:', e?.message || e);
//     return res.json([]);
//   }
// };

// // ============================================
// // RECOMMENDATIONS - SIMILAR PRODUCTS
// // ============================================

// export const recommendSimilar = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     if (!isValidId(id)) {
//       return res.json([]);
//     }

//     const product = await Product.findById(id).lean();
//     if (!product) {
//       return res.json([]);
//     }

//     const items = await Product.find({
//       _id: { $ne: product._id },
//       isActive: { $ne: false },
//       $or: [
//         { brand: product.brand },
//         { category: product.category }
//       ]
//     }).limit(12).lean();

//     res.json(items);
//   } catch (e) {
//     console.error('recommendSimilar error:', e);
//     next(e);
//   }
// };

// // ============================================
// // RECOMMENDATIONS - PERSONALIZED FEED
// // ============================================

// export const recommendPersonal = async (req, res, next) => {
//   try {
//     const userId = req.user?._id;
//     if (!userId) {
//       return res.json([]);
//     }

//     const orders = await Order.find({ user: userId }).lean();
//     const freqBrand = new Map();
//     const freqCategory = new Map();

//     // Build frequency maps from orders
//     for (const order of orders) {
//       for (const item of (order.items || [])) {
//         // Safely access nested product fields
//         const itemBrand = item.product?.brand || item.brand;
//         const itemCategory = item.product?.category || item.category;

//         if (itemBrand) {
//           freqBrand.set(itemBrand, (freqBrand.get(itemBrand) || 0) + 1);
//         }
//         if (itemCategory) {
//           freqCategory.set(itemCategory, (freqCategory.get(itemCategory) || 0) + 1);
//         }
//       }
//     }

//     // Get recommendations
//     let items = [];

//     if (freqBrand.size > 0) {
//       // User has purchase history - recommend from favorite brand
//       const topBrand = [...freqBrand.entries()].sort((a, b) => b[1] - a[1])[0][0];
//       items = await Product.find({
//         brand: topBrand,
//         isActive: { $ne: false }
//       }).limit(24).lean();
//     } else {
//       // No history - return popular items
//       items = await Product.find({ isActive: { $ne: false } })
//         .sort({ ratingCount: -1, createdAt: -1 })
//         .limit(24)
//         .lean();
//     }

//     res.json(items);
//   } catch (e) {
//     console.error('recommendPersonal error:', e);
//     next(e);
//   }
// };

// // ============================================
// // SIZE ADVISOR
// // ============================================

// export const sizeAdvisor = async (req, res) => {
//   try {
//     let {
//       gender = "men",
//       category = "",
//       heightCm = 0,
//       weightKg = 0,
//       fit = "regular",
//       brand = "",
//     } = req.body || {};

//     // Validate and normalize inputs
//     gender = String(gender || "men").toLowerCase();
//     fit = String(fit || "regular").toLowerCase();
//     brand = String(brand || "").toLowerCase();
//     category = String(category || "").toLowerCase();

//     heightCm = Number(heightCm);
//     weightKg = Number(weightKg);

//     // Validate required fields
//     if (!heightCm || !weightKg || heightCm < 100 || heightCm > 250 || weightKg < 20 || weightKg > 200) {
//       return res.status(400).json({ 
//         message: "Please provide valid height (cm) and weight (kg). Height: 100-250cm, Weight: 20-200kg" 
//       });
//     }

//     // Estimate chest/bust from height + weight
//     const estChest = Math.round(0.55 * heightCm + 0.23 * weightKg);
//     const estBust = Math.round(0.53 * heightCm + 0.24 * weightKg);

//     // Size charts (cm)
//     const charts = {
//       men: [
//         { size: "S", chest: [86, 94] },
//         { size: "M", chest: [94, 100] },
//         { size: "L", chest: [100, 106] },
//         { size: "XL", chest: [106, 112] },
//         { size: "XXL", chest: [112, 118] },
//         { size: "3XL", chest: [118, 126] },
//       ],
//       women: [
//         { size: "XS", bust: [76, 82] },
//         { size: "S", bust: [82, 88] },
//         { size: "M", bust: [88, 94] },
//         { size: "L", bust: [94, 100] },
//         { size: "XL", bust: [100, 106] },
//         { size: "XXL", bust: [106, 112] },
//       ],
//     };

//     const table = gender === "women" ? charts.women : charts.men;

//     // Pick size bucket by measurement
//     const pickByRange = (val, key) => {
//       for (const row of table) {
//         const [lo, hi] = row[key];
//         if (val >= lo && val < hi) return row.size;
//       }
//       return table[table.length - 1].size;
//     };

//     let baseSize = gender === "women"
//       ? pickByRange(estBust, "bust")
//       : pickByRange(estChest, "chest");

//     // Brand adjustments (some brands run small/large)
//     const brandAdjMap = {
//       "zara": -1,
//       "hm": 0,
//       "h&m": 0,
//       "levi": 0,
//       "levis": 0,
//       "us polo": 1,
//       "roadster": 0,
//       "allen solly": -1,
//       "peter england": 0
//     };

//     const sizesOrder = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];
//     const idxOf = (s) => sizesOrder.indexOf(s);

//     const bump = (s, delta) => {
//       const i = idxOf(s);
//       if (i < 0) return s;
//       return sizesOrder[Math.min(sizesOrder.length - 1, Math.max(0, i + delta))];
//     };

//     // Apply brand adjustment
//     const bDelta = brandAdjMap[brand] ?? 0;
//     baseSize = bump(baseSize, bDelta);

//     // Apply fit adjustment
//     if (fit === "slim") baseSize = bump(baseSize, -1);
//     if (fit === "loose") baseSize = bump(baseSize, 1);

//     // Build explanation
//     const noteParts = [];
//     noteParts.push(`Based on ${heightCm}cm / ${weightKg}kg`);
//     if (fit !== "regular") noteParts.push(`${fit} fit preference`);
//     if (bDelta !== 0) {
//       noteParts.push(`brand adjustment ${bDelta > 0 ? "+1 (runs small)" : "-1 (runs large)"}`);
//     }

//     return res.json({
//       recommendation: baseSize,
//       reason: noteParts.join(", "),
//       inputs: { gender, category, heightCm, weightKg, fit, brand },
//       chartUsed: gender,
//     });
//   } catch (e) {
//     console.error('sizeAdvisor error:', e);
//     res.status(500).json({ message: "Size advisor failed. Please try again." });
//   }
// };

// // ============================================
// // FRAUD RISK SCORE
// // ============================================

// export const riskScore = async (req, res) => {
//   try {
//     const {
//       deviceFingerprint = '',
//       ipCountry = '',
//       billingCountry = '',
//       ordersLast24h = 0,
//       codAbuseCount = 0,
//       emailAgeDays = 365,
//       velocityPerMin = 0
//     } = req.body || {};

//     let score = 0;

//     // Basic fraud signals
//     if (ipCountry && billingCountry && ipCountry !== billingCountry) score += 25;
//     if (ordersLast24h > 2) score += 20;
//     if (velocityPerMin > 5) score += 15;
//     score += Math.min(20, codAbuseCount * 10);
//     if (emailAgeDays < 30) score += 15;

//     const action = score >= 60 ? 'block' : score >= 35 ? 'step_up' : 'allow';

//     return res.json({ score, action });
//   } catch (e) {
//     console.error('riskScore error:', e);
//     res.status(500).json({ score: 0, action: 'allow' });
//   }
// };

// // ============================================
// // FORECAST (SIMPLE INVENTORY FORECAST)
// // ============================================

// export const forecast = async (req, res, next) => {
//   try {
//     const sku = String(req.query.sku || '').trim();
//     if (!sku) {
//       return res.json({ sku: '', avgPerDay: 0, suggestedReorder: 0 });
//     }

//     // Last 30 days sales by SKU
//     const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
//     const orders = await Order.find({ createdAt: { $gte: since } }).lean();

//     let total = 0;
//     for (const order of orders) {
//       for (const item of (order.items || [])) {
//         if (String(item.sku) === sku) {
//           total += Number(item.qty || 0);
//         }
//       }
//     }

//     const avgPerDay = Math.round((total / 30) * 100) / 100;
//     const suggestedReorder = Math.ceil(avgPerDay * 14); // 2 weeks buffer

//     return res.json({ sku, avgPerDay, suggestedReorder });
//   } catch (e) {
//     console.error('forecast error:', e);
//     next(e);
//   }
// };

// // ============================================
// // PRICE SUGGEST
// // ============================================

// export async function priceSuggest(req, res, next) {
//   try {
//     const { productId } = req.params;

//     if (!isValidId(productId)) {
//       return res.status(400).json({ ok: false, error: "Invalid product ID" });
//     }

//     const product = await Product.findById(productId).lean();
//     if (!product) {
//       return res.status(404).json({ ok: false, error: "Product not found" });
//     }

//     const out = priceSuggestFromProduct(product);
//     const pct = Math.round(out.deltaPct * 100);
//     const sign = pct >= 0 ? "+" : "";

//     return res.json({
//       ok: true,
//       current: out.current,
//       suggested: out.suggested,
//       deltaPct: pct,
//       message: `Current ${out.current} → Suggest ${out.suggested} (${sign}${pct}%)`,
//       details: out.debug
//     });
//   } catch (err) {
//     console.error('priceSuggest error:', err);
//     next(err);
//   }
// }

// export default {
//   assistant,
//   checkoutDecision,
//   reviewSummary,
//   generateDraft,
//   visualSearch,
//   smartSearch,
//   recommendSimilar,
//   recommendPersonal,
//   sizeAdvisor,
//   riskScore,
//   forecast,
//   priceSuggest
// };


// backend/controllers/aiController.js

import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { env } from '../config/env.js';
import { orChat } from '../utils/openrouter.js';
import { embedText, embedMany } from '../ai/embeddings.js';
import { rankProductsByQuery } from '../ai/semanticSearch.js';
import { callOpenRouter } from '../utils/openrouter.js';
import { cosine } from '../utils/openrouter.js';
import priceSuggestFromProduct from "../ai/priceSuggest.js";

// Import all agents
import { shoppingAgent } from '../ai/agents/shoppingAgent.js';
import { addToCartAgent } from '../ai/agents/cartAgent.js';
import { checkoutDecisionAgent } from '../ai/agents/checkoutAgent.js';
import { paymentAgent } from '../ai/agents/paymentAgent.js';
import { orderDeliveryAgent } from '../ai/agents/orderDeliveryAgent.js';
import {
  personalStylistAgent,
  sizeAdvisorAgent,
  budgetShopperAgent,
  occasionPlannerAgent,
  wardrobeAssistantAgent,
  trendSpotterAgent,
  outfitCompleterAgent,
  giftSuggesterAgent,
} from '../ai/agents/index.js';

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Helper: whole-word match instead of fragile substring match.
// This avoids false positives like "add" matching "address",
// or "order" matching inside "Track my order" before the
// tracking-intent check gets a chance to run.
const hasWord = (text, words) =>
  words.some((w) => new RegExp(`\\b${w}\\b`, 'i').test(text));

// ============================================
// REVIEW SUMMARY
// ============================================

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

    // Default: pure DB-derived summary (no AI hallucination risk at all)
    let summary = heuristicSummary(reviews);

    // Try LLM for a nicer summary, but ONLY grounded in the actual DB reviews.
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
          system: 'You are a precise review summarizer for e-commerce. Only use the reviews provided. Do not invent details that are not present in the reviews.',
          user: prompt,
        });

        if (llm?.trim()) summary = llm.trim();
      } catch (e) {
        console.warn('OpenRouter summary fallback used:', e.message);
        // summary stays as heuristicSummary (DB-only) — safe fallback
      }
    }

    return res.json({ summary, count, avg: +avg.toFixed(2) });
  } catch (e) {
    console.error('Review summary error:', e);
    next(e);
  }
};

// ============================================
// MAIN ASSISTANT CONTROLLER (FIXED ROUTING)
// ============================================

export const assistant = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ reply: "Please login first" });
    }

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ reply: "Please provide a valid message." });
    }

    const lowerMsg = message.toLowerCase().trim();

    // ====================== ORDER TRACKING (MUST BE FIRST) ======================
    // This has to run BEFORE the "chat to order" block below. Otherwise a
    // message like "Track my order" or "order status" gets wrongly caught
    // by the word "order" in that block and opens Razorpay instead of
    // showing the actual tracking info.
    if (
      hasWord(lowerMsg, ["track", "tracking", "delivery", "status"]) ||
      lowerMsg.includes("kab aayega") ||
      lowerMsg.includes("kahan hai")
    ) {
      const result = await orderDeliveryAgent(userId);
      return res.json({ reply: result.reply });
    }

    // ====================== CHAT TO ORDER (explicit order command — highest priority after tracking) ======================
    // This must be checked BEFORE the stylist/size/budget/occasion advisor
    // blocks below. Otherwise a message like "Nylon T Shirt order kar do
    // size M" gets wrongly caught by the Size Advisor's "size" keyword and
    // the user never gets their item added to cart — they get unsolicited
    // sizing advice instead. An explicit order/buy command always wins,
    // even if the message also happens to mention "size".
    //
    // Removed the bare "add" keyword — it was matching unrelated words like
    // "address" / "additional". Now only clear order-intent phrases trigger this.
    const isOrderIntent =
      hasWord(lowerMsg, ["order", "buy", "purchase"]) ||
      lowerMsg.includes("kar do") ||
      lowerMsg.includes("add to cart") ||
      lowerMsg.includes("cart me add");

    if (isOrderIntent) {
      const product = await shoppingAgent(message);

      if (!product) {
        return res.json({
          reply: "❌ This product is not available in our store right now.\n\nPlease try another name like 'Shirt', 'Kurti', or 'Jeans'.",
        });
      }

      // Extract size
      let size = "M";
      const sizeMatch = message.match(/size\s*:?\s*([A-Z0-9XL]{1,3})/i);
      if (sizeMatch) size = sizeMatch[1].toUpperCase();

      // Add to cart
      try {
        await addToCartAgent(userId, product._id, size, 1);
      } catch (err) {
        console.error("Add to cart error:", err);
        return res.status(500).json({ reply: "Failed to add item to cart. Please try again." });
      }

      // Get total — always read from the DB cart, never a guessed/AI number
      const cart = await Cart.findOne({ user: userId });
      const total = cart?.items?.reduce((sum, i) => sum + (i.price * i.qty), 0) || product.price;

      // Direct Razorpay
      const paymentData = await paymentAgent(userId, total);

      return res.json({
        reply: `✅ **${product.title}** (Size: ${size}) successfully added to your cart!\n\n🔄 Opening Razorpay payment gateway...`,
        action: "open_razorpay",
        paymentData
      });
    }

    // ====================== PERSONAL STYLIST ======================
    // (only reached if isOrderIntent was false)
    if (hasWord(lowerMsg, ["stylist", "outfit", "look"])) {
      const result = await personalStylistAgent(message, userId);
      return res.json({ reply: result.reply });
    }

    // ====================== SIZE ADVISOR ======================
    // Pure sizing questions like "Height 5'8 weight 70kg ke liye size batao"
    // (no order/buy command present) land here.
    if (hasWord(lowerMsg, ["size", "height", "weight"])) {
      const result = await sizeAdvisorAgent(message);
      return res.json({ reply: result.reply });
    }

    // ====================== BUDGET SHOPPER ======================
    if (hasWord(lowerMsg, ["under", "budget", "sasta"])) {
      const result = await budgetShopperAgent(message);
      return res.json({ reply: result.reply });
    }

    // ====================== OCCASION PLANNER ======================
    if (hasWord(lowerMsg, ["ganesh", "festival", "wedding", "occasion"])) {
      const result = await occasionPlannerAgent(message);
      return res.json({ reply: result.reply });
    }

    // ====================== LAST RESORT: PLAIN PRODUCT NAME ======================
    // If none of the keyword intents matched, the message might just be a
    // bare product name/title — e.g. sent from the "Chat to Order" draft box
    // on a product page ("Cotton Printed Regular Fit") without any explicit
    // "order"/"kar do"/"buy" word. In that context the user's intent is
    // still to order it, so try to resolve it against the real product
    // catalog before giving up with the generic fallback message.
    try {
      const product = await shoppingAgent(message);

      if (product) {
        let size = "M";
        const sizeMatch = message.match(/size\s*:?\s*([A-Z0-9XL]{1,3})/i);
        if (sizeMatch) size = sizeMatch[1].toUpperCase();

        await addToCartAgent(userId, product._id, size, 1);

        const cart = await Cart.findOne({ user: userId });
        const total = cart?.items?.reduce((sum, i) => sum + (i.price * i.qty), 0) || product.price;
        const paymentData = await paymentAgent(userId, total);

        return res.json({
          reply: `✅ **${product.title}** (Size: ${size}) successfully added to your cart!\n\n🔄 Opening Razorpay payment gateway...`,
          action: "open_razorpay",
          paymentData
        });
      }
    } catch (err) {
      console.error("Last-resort product match error:", err);
      // fall through to default fallback below
    }

    // ====================== DEFAULT FALLBACK ======================
    return res.json({
      reply: "Click any agent card or try:\n• Shirt order kar do size M\n• Track my order",
    });

  } catch (err) {
    console.error("Assistant Error:", err);
    res.status(500).json({ reply: "Something went wrong. Please try again." });
  }
};

// ============================================
// CHECKOUT DECISION
// ============================================

export const checkoutDecision = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user?._id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.json({
        message: "Your cart is empty.",
        suggestedMethod: "COD",
        canUseCOD: true,
        discountForPrepaid: 0,
        total: 0,
        finalTotal: 0,
        fraudRisk: false
      });
    }

    const decision = await checkoutDecisionAgent(items, userId);

    return res.json({
      message: decision.message,
      suggestedMethod: decision.suggestedMethod,
      canUseCOD: decision.canUseCOD,
      discountForPrepaid: decision.discountForPrepaid,
      total: decision.total,
      finalTotal: decision.finalTotal,
      fraudRisk: decision.fraudRisk
    });
  } catch (err) {
    console.error("Checkout Decision Error:", err);
    return res.status(500).json({
      message: "You can pay via COD or Razorpay.",
      suggestedMethod: "COD"
    });
  }
};

// ============================================
// GENERATE DRAFT
// ============================================

export const generateDraft = async (req, res) => {
  try {
    const { agentType } = req.body;

    if (!agentType) {
      return res.status(400).json({
        type: "draft",
        message: "Invalid request",
        success: false
      });
    }

    const drafts = {
      // Core Shopping
      "chat-to-order": "Nylon T Shirt for Men order kar do size M",

      // Fashion Agents
      "personal-stylist": "Wedding guest ke liye perfect outfit suggest karo under 5000",
      "size-advisor": "Height 5'8\" weight 70kg ke liye kurti aur jeans ka size batao",
      "budget-shopper": "Under 1500 mein best casual wear dikhao",
      "occasion-planner": "Ganesh Chaturthi ke liye traditional festive outfit suggest karo",
      "wardrobe-assistant": "Mere paas blue jeans hai, uske saath best top aur shoes suggest karo",
      "trend-spotter": "Current summer trends mein kya chal raha hai, best products dikhao",
      "outfit-completer": "White shirt ke saath best bottom aur shoes suggest karo",
      "gift-suggester": "Girlfriend ke liye anniversary gift under 3000 suggest karo",

      // Others
      "visual-search": "Is image jaisa similar products dhoondho",
      "order-tracking": "Track my order",
    };

    const defaultMessage = "Hello, mujhe kuch achha suggest karo";

    res.json({
      type: "draft",
      message: drafts[agentType] || defaultMessage,
      intent: agentType,
      success: true
    });

  } catch (error) {
    console.error("Generate Draft Error:", error);
    res.status(500).json({
      type: "draft",
      message: "Nylon T Shirt for Men order kar do size M",
      intent: "chat-to-order",
      success: false
    });
  }
};

// ============================================
// VISUAL SEARCH
// ============================================

export const visualSearch = async (req, res) => {
  try {
    const file = req.file;
    const category = String(req.body.category || '').toLowerCase();

    if (!file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Get AI Vision Description
    const b64 = file.buffer.toString('base64');
    const mime = file.mimetype || 'image/jpeg';

    const visionPrompt = `You are a fashion product expert. Analyze this image and return ONLY comma-separated tags.
Include: gender, category, brand (if visible), color, pattern, style, sleeve/neck, material, fit.
Example: "men, shoes, nike, black, running, sneakers, mesh, athletic"`;

    const { content: tagsText } = await orChat([{
      role: 'user',
      content: [
        { type: 'text', text: visionPrompt },
        { type: 'image_url', image_url: `data:${mime};base64,${b64}` }
      ]
    }], { model: 'openai/gpt-4o-mini' });

    const tags = (tagsText || "fashion, product").replace(/\n/g, ' ').trim();

    // Embed the tags
    const qVec = await embedText(tags);

    // Fetch candidate products from DB (real catalog, not invented)
    const filter = { isActive: true };
    if (['men', 'women', 'kids'].includes(category)) {
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    const products = await Product.find(filter).lean().limit(50);

    if (!products.length) {
      return res.json([]);
    }

    // Embed all products
    const productTexts = products.map(p =>
      `${p.title || ''} ${p.brand || ''} ${p.category || ''} ${p.description || ''}`.trim()
    );

    const pVecs = await embedMany(productTexts);

    // Rank by similarity
    const ranked = products
      .map((p, i) => ({
        ...p,
        similarity: cosine(qVec, pVecs[i] || [])
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 12);

    return res.json(ranked);

  } catch (e) {
    console.error('Visual Search Error:', e?.message || e);
    return res.json([]);
  }
};

// ============================================
// SMART SEARCH (SEMANTIC + TYPO TOLERANT)
// ============================================

export const smartSearch = async (req, res, next) => {
  try {
    const qRaw = String(req.query.q || '').trim();
    if (!qRaw) return res.json([]);

    // Parse constraints like "under 2k" or "under 100 rs"
    const budgetMatch = qRaw.match(/under\s*(?:rs\.?|₹)?\s*(\d+)\s*([k])?/i);
    let budget = null;
    if (budgetMatch) {
      budget = Number(budgetMatch[1]);
      if (budgetMatch[2]?.toLowerCase() === 'k') {
        budget *= 1000;
      }
    }

    // Category hints
    const qlc = qRaw.toLowerCase();
    let categoryRegex = null;
    if (/\bwomen|woman|ladies|female\b/.test(qlc)) {
      categoryRegex = /^women$/i;
    } else if (/\bmen|man|male\b/.test(qlc)) {
      categoryRegex = /^men$/i;
    } else if (/\bkids|children|child|boys|girls\b/.test(qlc)) {
      categoryRegex = /^kids$/i;
    }

    // Pre-filter
    const baseFilter = { isActive: { $ne: false } };
    if (categoryRegex) {
      baseFilter.category = categoryRegex;
    }

    const allProducts = await Product.find(baseFilter).lean();

    // Rank by semantic similarity (against real DB products only)
    let ranked = await rankProductsByQuery(allProducts, qRaw);

    // Apply budget filter if specified
    if (budget != null) {
      ranked = ranked.filter(p => Number(p.price) <= budget);
    }

    // Fallback if no results: regex search
    if (!ranked.length) {
      const searchRegex = new RegExp(qRaw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      ranked = allProducts.filter(p =>
        searchRegex.test(`${p.title || ''} ${p.brand || ''} ${p.category || ''} ${p.description || ''}`)
      );

      if (budget != null) {
        ranked = ranked.filter(p => Number(p.price) <= budget);
      }
    }

    return res.json(ranked.slice(0, 24));
  } catch (e) {
    console.error('smartSearch error:', e?.message || e);
    return res.json([]);
  }
};

// ============================================
// RECOMMENDATIONS - SIMILAR PRODUCTS
// ============================================

export const recommendSimilar = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidId(id)) {
      return res.json([]);
    }

    const product = await Product.findById(id).lean();
    if (!product) {
      return res.json([]);
    }

    const items = await Product.find({
      _id: { $ne: product._id },
      isActive: { $ne: false },
      $or: [
        { brand: product.brand },
        { category: product.category }
      ]
    }).limit(12).lean();

    res.json(items);
  } catch (e) {
    console.error('recommendSimilar error:', e);
    next(e);
  }
};

// ============================================
// RECOMMENDATIONS - PERSONALIZED FEED
// ============================================

export const recommendPersonal = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.json([]);
    }

    const orders = await Order.find({ user: userId }).lean();
    const freqBrand = new Map();
    const freqCategory = new Map();

    // Build frequency maps from orders
    for (const order of orders) {
      for (const item of (order.items || [])) {
        // Safely access nested product fields
        const itemBrand = item.product?.brand || item.brand;
        const itemCategory = item.product?.category || item.category;

        if (itemBrand) {
          freqBrand.set(itemBrand, (freqBrand.get(itemBrand) || 0) + 1);
        }
        if (itemCategory) {
          freqCategory.set(itemCategory, (freqCategory.get(itemCategory) || 0) + 1);
        }
      }
    }

    // Get recommendations
    let items = [];

    if (freqBrand.size > 0) {
      // User has purchase history - recommend from favorite brand
      const topBrand = [...freqBrand.entries()].sort((a, b) => b[1] - a[1])[0][0];
      items = await Product.find({
        brand: topBrand,
        isActive: { $ne: false }
      }).limit(24).lean();
    } else {
      // No history - return popular items
      items = await Product.find({ isActive: { $ne: false } })
        .sort({ ratingCount: -1, createdAt: -1 })
        .limit(24)
        .lean();
    }

    res.json(items);
  } catch (e) {
    console.error('recommendPersonal error:', e);
    next(e);
  }
};

// ============================================
// SIZE ADVISOR
// ============================================

export const sizeAdvisor = async (req, res) => {
  try {
    let {
      gender = "men",
      category = "",
      heightCm = 0,
      weightKg = 0,
      fit = "regular",
      brand = "",
    } = req.body || {};

    // Validate and normalize inputs
    gender = String(gender || "men").toLowerCase();
    fit = String(fit || "regular").toLowerCase();
    brand = String(brand || "").toLowerCase();
    category = String(category || "").toLowerCase();

    heightCm = Number(heightCm);
    weightKg = Number(weightKg);

    // Validate required fields
    if (!heightCm || !weightKg || heightCm < 100 || heightCm > 250 || weightKg < 20 || weightKg > 200) {
      return res.status(400).json({
        message: "Please provide valid height (cm) and weight (kg). Height: 100-250cm, Weight: 20-200kg"
      });
    }

    // Estimate chest/bust from height + weight
    const estChest = Math.round(0.55 * heightCm + 0.23 * weightKg);
    const estBust = Math.round(0.53 * heightCm + 0.24 * weightKg);

    // Size charts (cm)
    const charts = {
      men: [
        { size: "S", chest: [86, 94] },
        { size: "M", chest: [94, 100] },
        { size: "L", chest: [100, 106] },
        { size: "XL", chest: [106, 112] },
        { size: "XXL", chest: [112, 118] },
        { size: "3XL", chest: [118, 126] },
      ],
      women: [
        { size: "XS", bust: [76, 82] },
        { size: "S", bust: [82, 88] },
        { size: "M", bust: [88, 94] },
        { size: "L", bust: [94, 100] },
        { size: "XL", bust: [100, 106] },
        { size: "XXL", bust: [106, 112] },
      ],
    };

    const table = gender === "women" ? charts.women : charts.men;

    // Pick size bucket by measurement
    const pickByRange = (val, key) => {
      for (const row of table) {
        const [lo, hi] = row[key];
        if (val >= lo && val < hi) return row.size;
      }
      return table[table.length - 1].size;
    };

    let baseSize = gender === "women"
      ? pickByRange(estBust, "bust")
      : pickByRange(estChest, "chest");

    // Brand adjustments (some brands run small/large)
    const brandAdjMap = {
      "zara": -1,
      "hm": 0,
      "h&m": 0,
      "levi": 0,
      "levis": 0,
      "us polo": 1,
      "roadster": 0,
      "allen solly": -1,
      "peter england": 0
    };

    const sizesOrder = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];
    const idxOf = (s) => sizesOrder.indexOf(s);

    const bump = (s, delta) => {
      const i = idxOf(s);
      if (i < 0) return s;
      return sizesOrder[Math.min(sizesOrder.length - 1, Math.max(0, i + delta))];
    };

    // Apply brand adjustment
    const bDelta = brandAdjMap[brand] ?? 0;
    baseSize = bump(baseSize, bDelta);

    // Apply fit adjustment
    if (fit === "slim") baseSize = bump(baseSize, -1);
    if (fit === "loose") baseSize = bump(baseSize, 1);

    // Build explanation
    const noteParts = [];
    noteParts.push(`Based on ${heightCm}cm / ${weightKg}kg`);
    if (fit !== "regular") noteParts.push(`${fit} fit preference`);
    if (bDelta !== 0) {
      noteParts.push(`brand adjustment ${bDelta > 0 ? "+1 (runs small)" : "-1 (runs large)"}`);
    }

    return res.json({
      recommendation: baseSize,
      reason: noteParts.join(", "),
      inputs: { gender, category, heightCm, weightKg, fit, brand },
      chartUsed: gender,
    });
  } catch (e) {
    console.error('sizeAdvisor error:', e);
    res.status(500).json({ message: "Size advisor failed. Please try again." });
  }
};

// ============================================
// FRAUD RISK SCORE
// ============================================

export const riskScore = async (req, res) => {
  try {
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

    // Basic fraud signals
    if (ipCountry && billingCountry && ipCountry !== billingCountry) score += 25;
    if (ordersLast24h > 2) score += 20;
    if (velocityPerMin > 5) score += 15;
    score += Math.min(20, codAbuseCount * 10);
    if (emailAgeDays < 30) score += 15;

    const action = score >= 60 ? 'block' : score >= 35 ? 'step_up' : 'allow';

    return res.json({ score, action });
  } catch (e) {
    console.error('riskScore error:', e);
    res.status(500).json({ score: 0, action: 'allow' });
  }
};

// ============================================
// FORECAST (SIMPLE INVENTORY FORECAST)
// ============================================

export const forecast = async (req, res, next) => {
  try {
    const sku = String(req.query.sku || '').trim();
    if (!sku) {
      return res.json({ sku: '', avgPerDay: 0, suggestedReorder: 0 });
    }

    // Last 30 days sales by SKU
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const orders = await Order.find({ createdAt: { $gte: since } }).lean();

    let total = 0;
    for (const order of orders) {
      for (const item of (order.items || [])) {
        if (String(item.sku) === sku) {
          total += Number(item.qty || 0);
        }
      }
    }

    const avgPerDay = Math.round((total / 30) * 100) / 100;
    const suggestedReorder = Math.ceil(avgPerDay * 14); // 2 weeks buffer

    return res.json({ sku, avgPerDay, suggestedReorder });
  } catch (e) {
    console.error('forecast error:', e);
    next(e);
  }
};

// ============================================
// PRICE SUGGEST
// ============================================

export async function priceSuggest(req, res, next) {
  try {
    const { productId } = req.params;

    if (!isValidId(productId)) {
      return res.status(400).json({ ok: false, error: "Invalid product ID" });
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ ok: false, error: "Product not found" });
    }

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
    console.error('priceSuggest error:', err);
    next(err);
  }
}

export default {
  assistant,
  checkoutDecision,
  reviewSummary,
  generateDraft,
  visualSearch,
  smartSearch,
  recommendSimilar,
  recommendPersonal,
  sizeAdvisor,
  riskScore,
  forecast,
  priceSuggest
};