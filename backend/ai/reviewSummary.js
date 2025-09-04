export const summarizeReviews = (reviews) => {
  if (!reviews.length) return 'No reviews yet. Quality pending crowd wisdom.';
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const pos = reviews.filter(r => r.rating >= 4).length;
  const neg = reviews.filter(r => r.rating <= 2).length;
  return `Average ${avg}/5 from ${reviews.length} reviews. ${pos} positive, ${neg} critical. Fit runs ${avg >= 4 ? 'true-to-size' : avg <= 2.5 ? 'small' : 'slightly varied'}.`;
};
