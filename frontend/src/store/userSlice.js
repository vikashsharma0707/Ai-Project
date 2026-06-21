// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import http from '../api/http.js';
// import { ENDPOINTS } from '../api/endpoints.js';

// export const registerUser = createAsyncThunk('user/register', async (body, { rejectWithValue })=>{
//   try { const { data } = await http.post(ENDPOINTS.auth.register, body); localStorage.setItem('token', data.token); return data; }
//   catch(e){ return rejectWithValue(e.response?.data?.message || 'Register failed'); }
// });

// export const loginUser = createAsyncThunk('user/login', async (body, { rejectWithValue })=>{
//   try { const { data } = await http.post(ENDPOINTS.auth.login, body); localStorage.setItem('token', data.token); return data; }
//   catch(e){ return rejectWithValue(e.response?.data?.message || 'Login failed'); }
// });

// export const fetchMe = createAsyncThunk('user/me', async (_arg, { rejectWithValue })=>{
//   try { const { data } = await http.get(ENDPOINTS.auth.me); return data; }
//   catch(_e){ return rejectWithValue(''); }
// });

// const slice = createSlice({
//   name: 'user',
//   initialState: { me: null, status: 'idle', error: null },
//   reducers: {
//     logout: (st)=>{ localStorage.removeItem('token'); st.me = null; }
//   },
//   extraReducers: (b)=>{
//     b.addCase(fetchMe.fulfilled, (st, { payload })=>{ st.me = payload; });
//     b.addCase(loginUser.fulfilled, (st)=>{ st.status='succeeded'; });
//     b.addCase(registerUser.fulfilled, (st)=>{ st.status='succeeded'; });
//     b.addMatcher((a)=>a.type.endsWith('/rejected'), (st, { payload })=>{ st.error = payload || 'Error'; st.status='failed'; });
//   }
// });

// export const { logout } = slice.actions;
// export default slice.reducer;



// frontend/src/store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../api/http.js';
import { ENDPOINTS } from '../api/endpoints.js';

export const registerUser = createAsyncThunk(
  'user/register',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await http.post(ENDPOINTS.auth.register, body);
      if (data.token) localStorage.setItem('token', data.token);
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await http.post(ENDPOINTS.auth.login, body);
      if (data.token) localStorage.setItem('token', data.token);
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || 'Login failed');
    }
  }
);

export const fetchMe = createAsyncThunk(
  'user/me',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await http.get(ENDPOINTS.auth.me);
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || 'Failed to fetch user');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    me: null,
    status: 'idle',     // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.me = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch Current User
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.me = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMe.rejected, (state) => {
        state.me = null;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;