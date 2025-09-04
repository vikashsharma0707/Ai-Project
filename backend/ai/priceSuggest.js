// ESM
export function toNearest99(n) {
  if (n <= 99) return 99;
  const up = Math.ceil(n / 100) * 100 - 1;     // 1580 -> 1599
  const down = Math.floor(n / 100) * 100 - 1;  // 1580 -> 1499
  return (n - down) < (up - n) ? down : up;
}
export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Deterministic heuristic suggestion (no external API):
 * ratingAvg, ratingCount, total stock => ±25% window, then XX99 rounding.
 */
export default function priceSuggestFromProduct(product) {
  const price = Number(product?.price ?? 0);
  if (!price || price <= 0) {
    return { current: 0, suggested: 0, deltaPct: 0, debug: { reason: "Invalid current price" } };
  }

  const ratingAvg   = Number(product?.ratingAvg ?? 0);    // 0..5
  const ratingCount = Number(product?.ratingCount ?? 0);  // demand proxy
  const stockTotal = Array.isArray(product?.variants)
    ? product.variants.reduce((s, v) => s + (Number(v?.stock ?? 0)), 0)
    : Number(product?.stock ?? 0);

  // Rating factor
  let rf = 0;
  if (ratingAvg >= 4.6) rf = +0.08;
  else if (ratingAvg >= 4.3) rf = +0.05;
  else if (ratingAvg >= 4.0) rf = +0.03;
  else if (ratingAvg >= 3.5) rf = 0;
  else if (ratingAvg >= 3.0) rf = -0.03;
  else rf = -0.07;

  // Stock factor (low stock => price up)
  let sf = 0;
  if (stockTotal <= 10) sf = +0.05;
  else if (stockTotal <= 30) sf = +0.02;
  else if (stockTotal <= 80) sf = 0;
  else if (stockTotal <= 150) sf = -0.03;
  else sf = -0.06;

  // Demand factor (ratingCount proxy)
  let df = 0;
  if (ratingCount > 200) df = +0.06;
  else if (ratingCount > 100) df = +0.04;
  else if (ratingCount > 50) df = +0.02;
  else if (ratingCount < 10) df = -0.01;

  let deltaPct = clamp(rf + sf + df, -0.25, +0.25);

  const raw = price * (1 + deltaPct);
  const suggested = toNearest99(Math.round(raw));
  const finalPct = (suggested - price) / price;

  return {
    current: price,
    suggested,
    deltaPct: finalPct, // 0.07 => +7%
    debug: { ratingAvg, ratingCount, stockTotal, components: { rating: rf, stock: sf, demand: df } }
  };
}
