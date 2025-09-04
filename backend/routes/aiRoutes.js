// // // // // import { Router } from 'express';
// // // // // import { smartSearch, recommend, reviewSummary, size, assistant, visual } from '../controllers/aiController.js';

// // // // // const r = Router();
// // // // // r.get('/search', smartSearch);
// // // // // r.get('/recommend', recommend);
// // // // // r.get('/review-summary/:id', reviewSummary);
// // // // // r.post('/size', size);
// // // // // r.post('/assistant', assistant);
// // // // // r.post('/visual', visual);
// // // // // export default r;
// // // // import { Router } from 'express';
// // // // import { smartSearch, recommend, reviewSummary, sizeAdvisor, assistant, visualSearch } from '../controllers/aiController.js';
// // // // const r = Router();
// // // // r.get('/search', smartSearch);
// // // // r.get('/recommend', recommend);
// // // // r.get('/review-summary/:id', reviewSummary);
// // // // r.post('/size', sizeAdvisor);
// // // // r.post('/assistant', assistant);
// // // // r.post('/visual', visualSearch);
// // // // export default r;


// // // import { Router } from 'express';
// // // import { protect } from '../middlewares/auth.js';
// // // import {
// // //   smartSearch,
// // //   visualSearch,
// // //   recommendSimilar,
// // //   recommendPersonal,
// // //   reviewSummary,
// // //   sizeAdvisor,
// // //   assistant,
// // //   riskScore,
// // //   forecast,
// // //   priceSuggest
// // // } from '../controllers/aiController.js';

// // // const r = Router();

// // // // Search & discovery
// // // r.get('/search', smartSearch);
// // // r.post('/visual', visualSearch);

// // // // Recommendations
// // // r.get('/reco/similar/:id', recommendSimilar);
// // // r.get('/reco/personal', protect, recommendPersonal);

// // // // Reviews & content
// // // r.get('/review-summary/:productId', reviewSummary);

// // // // Sizing
// // // r.post('/size', sizeAdvisor);

// // // // Assistant
// // // r.post('/assistant', assistant);

// // // // Fraud/Risk
// // // r.post('/risk-score', riskScore);

// // // // Forecasting / Pricing
// // // r.get('/forecast', forecast);
// // // r.get('/price-suggest/:productId', priceSuggest);

// // // export default r;


// // // backend/routes/aiRoutes.js
// // import { Router } from 'express';
// // import multer from 'multer';
// // import { protect } from '../middlewares/auth.js';


// // import {
// //   smartSearch,
// //   visualSearch,
// //   recommendSimilar,
// //   recommendPersonal,
// //   reviewSummary,
// //   sizeAdvisor,
// //   assistant,
// //   riskScore,
// //   forecast,
// //   priceSuggest,
// // } from '../controllers/aiController.js';

// // const r = Router();

// // /** Multer: accept an image in memory (field name: "image") */
// // const upload = multer({
// //   storage: multer.memoryStorage(),
// //   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
// // });

// // // -------- Search & Discovery ----------
// // r.get('/search', smartSearch);

// // // Visual search expects multipart/form-data with field "image"
// // // optional body field: "category"
// // r.post('/visual', upload.single('image'), visualSearch);

// // // -------- Recommendations -------------
// // r.get('/reco/similar/:id', recommendSimilar);
// // r.get('/reco/personal', protect, recommendPersonal);

// // // -------- Reviews & Content -----------
// // r.get('/review-summary/:productId', reviewSummary);


// // // -------- Sizing ----------------------
// // r.post('/size', sizeAdvisor);

// // // -------- Assistant -------------------
// // r.post('/assistant', assistant);

// // // -------- Fraud / Risk ----------------
// // r.post('/risk-score', protect, riskScore); // (optional protect)

// // // -------- Forecasting / Pricing -------
// // r.get('/forecast', forecast);
// // r.get('/price-suggest/:productId', priceSuggest);

// // export default r;


// // backend/routes/aiRoutes.js
// import { Router } from "express";
// import multer from "multer";
// import { protect, adminOnly } from "../middlewares/auth.js";
// import {
//   smartSearch,
//   visualSearch,
//   recommendSimilar,
//   recommendPersonal,
//   reviewSummary,
//   sizeAdvisor,
//   assistant,
//   riskScore,
//   forecast,
//   priceSuggest,
// } from "../controllers/aiController.js";

// const r = Router();

// /** Multer: accept an image in memory (field name: "image") */
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 5 * 1024 * 1024 }, // up to 5MB
//   fileFilter: (_req, file, cb) => {
//     if (!file.mimetype?.startsWith("image/")) {
//       return cb(new Error("Only image files are allowed"));
//     }
//     cb(null, true);
//   },
// });

// // -------- Search & Discovery ----------
// r.get("/search", smartSearch);

// // Visual search expects multipart/form-data with field "image"
// // optional body field: "category"
// r.post("/visual", upload.single("image"), visualSearch);

// // -------- Recommendations -------------
// r.get("/reco/similar/:id", recommendSimilar);
// r.get("/reco/personal", protect, recommendPersonal);

// // -------- Reviews & Content -----------
// r.get("/review-summary/:productId", reviewSummary);

// // -------- Sizing ----------------------
// r.post("/size", sizeAdvisor);

// // -------- Assistant -------------------
// r.post("/assistant", assistant);

// // -------- Fraud / Risk ----------------
// r.post("/risk-score", protect, riskScore);

// // -------- Forecasting / Pricing -------
// // If you don't have adminOnly, remove it and keep `protect` or none.
// r.get("/forecast", forecast);
// r.get("/price-suggest/:productId", protect, adminOnly, priceSuggest);

// export default r;

import { Router } from "express";
import multer from "multer";
import { protect } from "../middlewares/auth.js";
import {
  smartSearch,
  visualSearch,
  recommendSimilar,
  recommendPersonal,
  reviewSummary,
  sizeAdvisor,
  assistant,
  riskScore,
  forecast,
  priceSuggest,   // ✅ ensure this is exported from controller
} from "../controllers/aiController.js";

const r = Router();

/** Multer: accept an image in memory (field name: "image") */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype?.startsWith("image/")) return cb(new Error("Only image files are allowed"));
    cb(null, true);
  },
});

// -------- Search & Discovery ----------
r.get("/search", smartSearch);

// Visual search (multipart/form-data with field "image")
r.post("/visual", upload.single("image"), visualSearch);

// -------- Recommendations -------------
r.get("/reco/similar/:id", recommendSimilar);
r.get("/reco/personal", protect, recommendPersonal);

// -------- Reviews & Content -----------
r.get("/review-summary/:productId", reviewSummary);

// -------- Sizing ----------------------
r.post("/size", sizeAdvisor);

// -------- Assistant -------------------
r.post("/assistant", assistant);

// -------- Fraud / Risk ----------------
r.post("/risk-score", protect, riskScore);

// -------- Forecasting / Pricing -------
r.get("/forecast", forecast);
r.get("/price-suggest/:productId", priceSuggest); // protect/adminOnly add karna ho to yahan lagao

export default r;
