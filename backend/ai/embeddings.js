// // Deterministic stub embeddings: map chars to numbers, fixed dim=32
// export const embedText = (text) => {
//   const dim = 32;
//   const v = new Array(dim).fill(0);
//   for (let i = 0; i < text.length; i++) {
//     const code = text.charCodeAt(i);
//     v[i % dim] = (v[i % dim] + code * 31) % 1000;
//   }
//   const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
//   return v.map(x => x / norm);
// };


import { env } from '../config/env.js';
import { orEmbed, orEmbedMany, stubEmbed } from '../utils/openrouter.js';

export async function embedText(text = '') {
  try {
    if (env.AI_PROVIDER === 'openrouter') {
      const { embedding } = await orEmbed(String(text || ''));
      if (embedding?.length) return embedding;
    }
  } catch (e) {
    // fallback to stub
  }
  return stubEmbed(String(text || ''));
}

export async function embedMany(texts = []) {
  const inputs = (Array.isArray(texts) ? texts : [texts]).map(t => String(t || ''));
  try {
    if (env.AI_PROVIDER === 'openrouter') {
      const { embeddings } = await orEmbedMany(inputs);
      if (Array.isArray(embeddings) && embeddings.length === inputs.length) return embeddings;
    }
  } catch (e) {
    // fallback to stub below
  }
  return inputs.map(stubEmbed);
}
