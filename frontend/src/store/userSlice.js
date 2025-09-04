import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../api/http.js';
import { ENDPOINTS } from '../api/endpoints.js';

export const registerUser = createAsyncThunk('user/register', async (body, { rejectWithValue })=>{
  try { const { data } = await http.post(ENDPOINTS.auth.register, body); localStorage.setItem('token', data.token); return data; }
  catch(e){ return rejectWithValue(e.response?.data?.message || 'Register failed'); }
});

export const loginUser = createAsyncThunk('user/login', async (body, { rejectWithValue })=>{
  try { const { data } = await http.post(ENDPOINTS.auth.login, body); localStorage.setItem('token', data.token); return data; }
  catch(e){ return rejectWithValue(e.response?.data?.message || 'Login failed'); }
});

export const fetchMe = createAsyncThunk('user/me', async (_arg, { rejectWithValue })=>{
  try { const { data } = await http.get(ENDPOINTS.auth.me); return data; }
  catch(_e){ return rejectWithValue(''); }
});

const slice = createSlice({
  name: 'user',
  initialState: { me: null, status: 'idle', error: null },
  reducers: {
    logout: (st)=>{ localStorage.removeItem('token'); st.me = null; }
  },
  extraReducers: (b)=>{
    b.addCase(fetchMe.fulfilled, (st, { payload })=>{ st.me = payload; });
    b.addCase(loginUser.fulfilled, (st)=>{ st.status='succeeded'; });
    b.addCase(registerUser.fulfilled, (st)=>{ st.status='succeeded'; });
    b.addMatcher((a)=>a.type.endsWith('/rejected'), (st, { payload })=>{ st.error = payload || 'Error'; st.status='failed'; });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;
