
// import { env } from '../config/env.js';

// const ORIGIN = 'http://localhost:5173';
// const TITLE = 'Myntra Clone';

// const host = 'https://openrouter.ai';
// const chatURL = `${host}/api/v1/chat/completions`;
// const embURL  = `${host}/api/v1/embeddings`;

// function okToCall() {
//   return env.AI_PROVIDER === 'openrouter' && !!env.OPENROUTER_API_KEY;
// }

// export async function orChat(messages, { model = env.AI_MODEL, response_format } = {}) {
//   if (!okToCall()) return { content: 'Stub: AI disabled' };

//   const body = { model: model || 'openai/gpt-4o-mini', messages };
//   if (response_format) body.response_format = response_format;

//   const r = await fetch(chatURL, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
//       'HTTP-Referer': ORIGIN,
//       'X-Title': TITLE,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   });

//   if (!r.ok) throw new Error(`OpenRouter chat ${r.status}`);
//   const j = await r.json();
//   const msg = j.choices?.[0]?.message?.content || '';
//   return { content: msg, raw: j };
// }

// export async function orEmbed(input, { model = env.EMBED_MODEL } = {}) {
//   if (!okToCall()) return { embedding: stubEmbed(input) };

//   const r = await fetch(embURL, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
//       'HTTP-Referer': ORIGIN,
//       'X-Title': TITLE,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ model: model || 'openai/text-embedding-3-small', input })
//   });

//   if (!r.ok) throw new Error(`OpenRouter embed ${r.status}`);
//   const j = await r.json();
//   const emb = j.data?.[0]?.embedding || [];
//   return { embedding: emb, raw: j };
// }

// /** Batch embeddings: input = string[] */
// export async function orEmbedMany(inputs, { model = env.EMBED_MODEL } = {}) {
//   if (!okToCall()) return { embeddings: inputs.map(stubEmbed) };

//   const r = await fetch(embURL, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
//       'HTTP-Referer': ORIGIN,
//       'X-Title': TITLE,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ model: model || 'openai/text-embedding-3-small', input: inputs })
//   });

//   if (!r.ok) throw new Error(`OpenRouter embedMany ${r.status}`);
//   const j = await r.json();
//   const arr = Array.isArray(j.data) ? j.data.map(d => d.embedding || []) : [];
//   return { embeddings: arr, raw: j };
// }

// // ---- deterministic stub helpers ----
// export function stubEmbed(text = '') {
//   const v = new Array(16).fill(0);
//   for (let i = 0; i < text.length; i++) v[i % v.length] += (text.charCodeAt(i) % 17);
//   return v;
// }
// export function cosine(a = [], b = []) {
//   const n = Math.min(a.length, b.length);
//   if (!n) return 0;
//   let dot = 0, ma = 0, mb = 0;
//   for (let i = 0; i < n; i++) { dot += a[i]*b[i]; ma += a[i]*a[i]; mb += b[i]*b[i]; }
//   return ma && mb ? dot / Math.sqrt(ma * mb) : 0;
// }


// utils/openrouter.js
import { env } from '../config/env.js';

const ORIGIN = env.CLIENT_URL || 'http://localhost:5173';
const TITLE  = 'Myntra Clone';

const HOST   = 'https://openrouter.ai';
const CHAT   = `${HOST}/api/v1/chat/completions`;
const EMBED  = `${HOST}/api/v1/embeddings`;

function okToCall() {
  return env.AI_PROVIDER === 'openrouter' && !!env.OPENROUTER_API_KEY;
}

/** Node में fetch ना हो तो dynamic import से उपलब्ध करा दें */
async function getFetch() {
  if (typeof fetch !== 'undefined') return fetch;
  const mod = await import('node-fetch');
  return mod.default;
}

function withTimeout(ms = 18000) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(new Error('Request timeout')), ms);
  return { signal: ac.signal, cancel: () => clearTimeout(t) };
}

/* ---------------------------
   Public: Simple chat helper
---------------------------- */
export async function orChat(messages, { model = env.AI_MODEL, response_format } = {}) {
  if (!okToCall()) return { content: 'Stub: AI disabled', raw: null };

  const _fetch = await getFetch();
  const { signal, cancel } = withTimeout();

  const body = { model: model || 'openai/gpt-4o-mini', messages };
  if (response_format) body.response_format = response_format;

  const r = await _fetch(CHAT, {
    method: 'POST',
    signal,
    headers: {
      'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': ORIGIN,
      'X-Title': TITLE,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).finally(cancel);

  if (!r.ok) {
    const text = await safeText(r);
    throw new Error(`OpenRouter chat ${r.status}: ${text}`);
  }
  const j = await r.json();
  const msg = j?.choices?.[0]?.message?.content ?? '';
  return { content: msg, raw: j };
}

/* ---------------------------
   Public: Embeddings (single)
---------------------------- */
export async function orEmbed(input, { model = env.EMBED_MODEL } = {}) {
  if (!okToCall()) return { embedding: stubEmbed(input), raw: null };

  const _fetch = await getFetch();
  const { signal, cancel } = withTimeout();

  const r = await _fetch(EMBED, {
    method: 'POST',
    signal,
    headers: {
      'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': ORIGIN,
      'X-Title': TITLE,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model: model || 'openai/text-embedding-3-small', input })
  }).finally(cancel);

  if (!r.ok) {
    const text = await safeText(r);
    throw new Error(`OpenRouter embed ${r.status}: ${text}`);
  }
  const j = await r.json();
  const emb = j?.data?.[0]?.embedding ?? [];
  return { embedding: emb, raw: j };
}

/* --------------------------------
   Public: Embeddings (batch array)
---------------------------------- */
export async function orEmbedMany(inputs, { model = env.EMBED_MODEL } = {}) {
  if (!okToCall()) return { embeddings: inputs.map(stubEmbed), raw: null };

  const _fetch = await getFetch();
  const { signal, cancel } = withTimeout();

  const r = await _fetch(EMBED, {
    method: 'POST',
    signal,
    headers: {
      'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': ORIGIN,
      'X-Title': TITLE,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model: model || 'openai/text-embedding-3-small', input: inputs })
  }).finally(cancel);

  if (!r.ok) {
    const text = await safeText(r);
    throw new Error(`OpenRouter embedMany ${r.status}: ${text}`);
  }
  const j = await r.json();
  const arr = Array.isArray(j?.data) ? j.data.map(d => d.embedding || []) : [];
  return { embeddings: arr, raw: j };
}

/* --------------------------------
   Convenience wrapper for controllers
   Usage: const text = await callOpenRouter({system, user});
---------------------------------- */
export async function callOpenRouter({ system = '', user = '', model = env.AI_MODEL } = {}) {
  // Stub mode: AI disabled → deterministic summary
  if (!okToCall()) {
    return `Pros: -
Cons: -
Verdict: AI is disabled in this environment.`;
  }

  const messages = [];
  if (system) messages.push({ role: 'system', content: system });
  if (user)   messages.push({ role: 'user',   content: user   });

  const { content } = await orChat(messages, { model });
  return (content || '').trim();
}

/* ---------------------------
   Helpers / Stubs
---------------------------- */
async function safeText(res) {
  try { return await res.text(); } catch { return ''; }
}

// deterministic tiny embedding for stub mode
export function stubEmbed(text = '') {
  const v = new Array(16).fill(0);
  for (let i = 0; i < text.length; i++) v[i % v.length] += (text.charCodeAt(i) % 17);
  return v;
}

export function cosine(a = [], b = []) {
  const n = Math.min(a.length, b.length);
  if (!n) return 0;
  let dot = 0, ma = 0, mb = 0;
  for (let i = 0; i < n; i++) { dot += a[i] * b[i]; ma += a[i] * a[i]; mb += b[i] * b[i]; }
  return ma && mb ? dot / Math.sqrt(ma * mb) : 0;
}
