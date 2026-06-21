


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../api/http.js';
import { ENDPOINTS } from '../api/endpoints.js';

const NO_SUMMARY = 'No reviews yet.';

/** ----------------- Search & Discovery ----------------- **/
export const smartSearch = createAsyncThunk('ai/search', async (q) => {
  const { data } = await http.get(`${ENDPOINTS.ai.search}?q=${encodeURIComponent(q || '')}`);
  return data || [];
});

/**
 * Visual search
 * Supports both:
 *   visual('women')  // category-only
 *   visual({ category: 'women', file }) // image + category
 */
export const visual = createAsyncThunk('ai/visual', async (arg = '') => {
  const category = typeof arg === 'string' ? arg : (arg?.category || '');
  const file = typeof arg === 'object' ? arg?.file : undefined;

  const qs = `?category=${encodeURIComponent(category || '')}`;
  if (file) {
    const fd = new FormData();
    fd.append('image', file); // field name MUST be "image"
    const { data } = await http.post(ENDPOINTS.ai.visual + qs, fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data || [];
  } else {
    const { data } = await http.post(ENDPOINTS.ai.visual + qs);
    return data || [];
  }
});

/** ----------------- Recommendations ----------------- **/
export const recoSimilar = createAsyncThunk('ai/recoSimilar', async (id) => {
  if (!id) return [];
  const { data } = await http.get(ENDPOINTS.ai.recoSimilar(id));
  return data || [];
});

export const recoPersonal = createAsyncThunk('ai/recoPersonal', async () => {
  const { data } = await http.get(ENDPOINTS.ai.recoPersonal);
  return data || [];
});

/** ----------------- Reviews ----------------- **/
export const reviewSummary = createAsyncThunk('ai/review', async (id, { rejectWithValue }) => {
  try {
    if (!id) return NO_SUMMARY;
    const { data } = await http.get(ENDPOINTS.ai.review(id));
    return data?.summary || NO_SUMMARY;
  } catch {
    return rejectWithValue(NO_SUMMARY);
  }
});

/** ----------------- Size Advisor ----------------- **/
export const sizeAdvisor = createAsyncThunk('ai/size', async (body = {}) => {
  const { data } = await http.post(ENDPOINTS.ai.size, body);
  return data;
});

/** ----------------- Assistant ----------------- **/
export const assistant = createAsyncThunk('ai/assistant', async (message = '') => {
  const { data } = await http.post(ENDPOINTS.ai.assistant, { message });
  return data.reply;
});

/** ----------------- Risk / Ops ----------------- **/
export const riskScore = createAsyncThunk('ai/risk', async (context = {}) => {
  const { data } = await http.post(ENDPOINTS.ai.risk, context);
  return data;
});

export const forecast = createAsyncThunk('ai/forecast', async (sku) => {
  const { data } = await http.get(ENDPOINTS.ai.forecast(sku));
  return data;
});

export const priceSuggest = createAsyncThunk('ai/priceSuggest', async (productId) => {
  const { data } = await http.get(ENDPOINTS.ai.priceSuggest(productId));
  return data;
});

/** ----------------- Slice ----------------- **/
const slice = createSlice({
  name: 'ai',
  initialState: {
    search: [],
    visual: [],
    reco: [],
    personal: [],
    summary: NO_SUMMARY,
    reply: '',
    size: null,
    risk: { score: 0, action: 'allow' },
    fc: { sku: '', avgPerDay: 0, suggestedReorder: 0 },
    price: { current: 0, suggestion: null, deltaPct: 0 },
  },
  reducers: {},
  extraReducers: (b) => {
    // search/visual
    b.addCase(smartSearch.fulfilled, (st, { payload }) => { st.search = payload || []; });
    b.addCase(visual.fulfilled, (st, { payload }) => { st.visual = payload || []; });

    // recos
    b.addCase(recoSimilar.fulfilled, (st, { payload }) => { st.reco = payload || []; });
    b.addCase(recoPersonal.fulfilled, (st, { payload }) => { st.personal = payload || []; });

    // reviews
    b.addCase(reviewSummary.fulfilled, (st, { payload }) => { st.summary = payload || NO_SUMMARY; });
    b.addCase(reviewSummary.rejected,  (st, { payload }) => { st.summary = payload || NO_SUMMARY; });

    // assistant / size
    b.addCase(assistant.fulfilled, (st, { payload }) => { st.reply = payload || ''; });
    b.addCase(sizeAdvisor.fulfilled, (st, { payload }) => { st.size = payload || null; });

    // risk / ops
    b.addCase(riskScore.fulfilled, (st, { payload }) => { st.risk = payload || st.risk; });
    b.addCase(forecast.fulfilled, (st, { payload }) => { st.fc = payload || st.fc; });
    b.addCase(priceSuggest.fulfilled, (st, { payload }) => { st.price = payload || st.price; });
  }
});

export default slice.reducer;

// Backward compatibility alias if any component imports old name:
export { reviewSummary as fetchReviewSummary };
export { visual as visualImage };
