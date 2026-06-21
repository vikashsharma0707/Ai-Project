

// import { Router } from "express";
// import multer from "multer";
// import { protect } from "../middlewares/auth.js";
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
//   priceSuggest,   // ✅ ensure this is exported from controller
// } from "../controllers/aiController.js";

// const r = Router();

// /** Multer: accept an image in memory (field name: "image") */
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (_req, file, cb) => {
//     if (!file.mimetype?.startsWith("image/")) return cb(new Error("Only image files are allowed"));
//     cb(null, true);
//   },
// });

// // -------- Search & Discovery ----------
// r.get("/search", smartSearch);

// // Visual search (multipart/form-data with field "image")
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
// r.get("/forecast", forecast);
// r.get("/price-suggest/:productId", priceSuggest); // protect/adminOnly add karna ho to yahan lagao

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
  assistant,        // ← Enhanced below
  riskScore,
  forecast,
  priceSuggest,generateDraft,checkoutDecision
} from "../controllers/aiController.js";

const r = Router();

/** Multer for visual search */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype?.startsWith("image/")) 
      return cb(new Error("Only image files are allowed"));
    cb(null, true);
  },
});

// -------- Search & Discovery ----------
r.get("/search", smartSearch);
r.post("/visual", upload.single("image"), visualSearch);

// -------- Recommendations -------------
r.get("/reco/similar/:id", recommendSimilar);
r.get("/reco/personal", protect, recommendPersonal);
r.post("/checkout-decision", protect, checkoutDecision);   // ← Add this

// -------- Reviews & Content -----------
r.get("/review-summary/:productId", reviewSummary);

// -------- Sizing ----------------------
r.post("/size", sizeAdvisor);

// -------- Assistant (AI Shopping Agent) ----------
r.post("/assistant", protect, assistant);   // ← Protected now

// -------- Fraud / Risk ----------------
r.post("/risk-score", protect, riskScore);

r.post("/draft", protect, generateDraft);   // ← Add this line
// -------- Forecasting / Pricing -------
r.get("/forecast", forecast);
r.get("/price-suggest/:productId", priceSuggest);

export default r;