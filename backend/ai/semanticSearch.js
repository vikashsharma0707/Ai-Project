// import { embedText } from './embeddings.js';

// const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);

// export const cosineSearch = async (query, corpus, topK = 10) => {
//   const qv = embedText(query);
//   const scored = corpus.map(c => ({ id: c.id, score: dot(qv, embedText(c.text)) }));
//   scored.sort((a, b) => b.score - a.score);
//   return scored.slice(0, topK);
// };


import { embedText, embedMany } from './embeddings.js';
import { cosine } from '../utils/openrouter.js';

export async function rankProductsByQuery(products = [], q = '') {
  const qVec = await embedText(String(q || ''));
  const texts = products.map(p => `${p.title} ${p.brand} ${p.category} ${p.description || ''}`);
  const pVecs = await embedMany(texts);

  const ranked = products.map((p, i) => ({
    score: cosine(qVec, pVecs[i] || []),
    product: p
  }));
  ranked.sort((a, b) => b.score - a.score);
  return ranked.map(r => r.product);
}
