import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http, { API_BASE } from '../api/http.js';
import { ENDPOINTS } from '../api/endpoints.js';

export const fetchProducts = createAsyncThunk('products/fetch', async (query = {})=>{
  const params = new URLSearchParams(query).toString();
  const { data } = await http.get(`${ENDPOINTS.products.base}?${params}`);
  return data;
});

export const fetchProduct = createAsyncThunk('products/one', async (id)=>{
  const { data } = await http.get(`${ENDPOINTS.products.base}/${id}`);
  return data;
});

export const saveProduct = createAsyncThunk('products/save', async ({ id, form })=>{
  const url = id ? `${ENDPOINTS.products.base}/${id}` : ENDPOINTS.products.base;
  const { data } = await http[id ? 'put':'post'](url, form, { headers: { 'Content-Type': 'multipart/form-data' } });
  return data;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id)=>{
  const { data } = await http.delete(`${ENDPOINTS.products.base}/${id}`); return data;
});

const slice = createSlice({
  name: 'products',
  initialState: { list: [], total: 0, page: 1, pages: 1, current: null },
  reducers: {},
  extraReducers: (b)=>{
    b.addCase(fetchProducts.fulfilled, (st, { payload })=>{
      st.list = payload.items; st.total = payload.total; st.page = payload.page; st.pages = payload.pages;
    });
    b.addCase(fetchProduct.fulfilled, (st, { payload })=>{ st.current = payload; });
    b.addCase(saveProduct.fulfilled, (st, { payload })=>{
      const idx = st.list.findIndex(p => p._id === payload._id);
      if (idx >= 0) st.list[idx] = payload; else st.list.unshift(payload);
    });
    b.addCase(deleteProduct.fulfilled, (st, { meta })=>{
      st.list = st.list.filter(p => p._id !== meta.arg);
    });
  }
});

export const imageURL = (url) => url?.startsWith('/uploads') ? `${API_BASE}${url}` : url;
export default slice.reducer;
