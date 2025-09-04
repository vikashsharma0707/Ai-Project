// // export const ENDPOINTS = {
// //   auth: { register: '/api/auth/register', login: '/api/auth/login', me: '/api/auth/me' },
// //   products: { base: '/api/products' },
// //    payments: {
// //     cfg: '/api/payments/razorpay/config',
// //     order: '/api/payments/razorpay/order',
// //     verify: '/api/payments/razorpay/verify'
// //   },
// //   orders: { base: '/api/orders', mine: '/api/orders/mine' },
// //   admin: { stats: '/api/admin/stats' },
// //   ai: { search: '/api/ai/search', recommend: '/api/ai/recommend', review: (id)=>`/api/ai/review-summary/${id}`, size:'/api/ai/size', assistant:'/api/ai/assistant', visual:'/api/ai/visual' }
// // };


// export const ENDPOINTS = {
//   auth: {
//     me: '/api/auth/me',
//     login: '/api/auth/login',
//     register: '/api/auth/register',
//   },
//   products: {
//     base: '/api/products',
//     byId: (id) => `/api/products/${id}`,
//   },
//   orders: {
//     base: '/api/orders',
//     mine: '/api/orders/mine'
//   },
//   ai: {
//     search: '/api/ai/search',
//     visual: '/api/ai/visual',
//     recoSimilar: (id) => `/api/ai/reco/similar/${id}`,
//     recoPersonal: '/api/ai/reco/personal',
//     review: (id) => `/api/ai/review-summary/${id}`,
//     size: '/api/ai/size',
//     assistant: '/api/ai/assistant',
//     risk: '/api/ai/risk-score',
//     forecast: (sku) => `/api/ai/forecast?sku=${encodeURIComponent(sku)}`,
//     priceSuggest: (id) => `/api/ai/price-suggest/${id}`
//   }
// };


// /frontend/src/api/endpoints.js
export const ENDPOINTS = {
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },

  admin: {
    stats: "/api/admin/stats",   // 👈 add this
    products: "/api/admin/products",
    orders: "/api/admin/orders",
    // add others if needed
  },
  products: {
    base: '/api/products',
    byId: (id = '') => `/api/products/${encodeURIComponent(String(id))}`,
  },
  orders: {
    base: '/api/orders',
    mine: '/api/orders/mine',
  },
  ai: {
    search: '/api/ai/search',
    visual: '/api/ai/visual', // POST; you can pass ?category=... on the request
    recoSimilar: (id = '') => `/api/ai/reco/similar/${encodeURIComponent(String(id))}`,
    recoPersonal: '/api/ai/reco/personal',
    review: (id = '') => `/api/ai/review-summary/${encodeURIComponent(String(id))}`,
    size: '/api/ai/size',
    assistant: '/api/ai/assistant',
    risk: '/api/ai/risk-score',
    forecast: (sku = '') => `/api/ai/forecast?sku=${encodeURIComponent(String(sku))}`,
    priceSuggest: (id = '') => `/api/ai/price-suggest/${encodeURIComponent(String(id))}`,
  },
};
