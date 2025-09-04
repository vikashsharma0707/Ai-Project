// import { createSlice } from '@reduxjs/toolkit';

// const initial = JSON.parse(localStorage.getItem('cart') || '[]');

// const slice = createSlice({
//   name: 'cart',
//   initialState: { items: initial },
//   reducers: {
//     addToCart: (st, { payload })=>{
//       const idx = st.items.findIndex(i => i.sku === payload.sku);
//       if (idx >= 0) st.items[idx].qty += payload.qty || 1;
//       else st.items.push({ ...payload, qty: payload.qty || 1 });
//       localStorage.setItem('cart', JSON.stringify(st.items));
//     },
//     updateQty: (st, { payload: { sku, qty } })=>{
//       const it = st.items.find(i => i.sku === sku);
//       if (it) it.qty = Math.max(1, qty);
//       localStorage.setItem('cart', JSON.stringify(st.items));
//     },
//     removeFromCart: (st, { payload: sku })=>{
//       st.items = st.items.filter(i => i.sku !== sku);
//       localStorage.setItem('cart', JSON.stringify(st.items));
//     },
//     clearCart: (st)=>{ st.items = []; localStorage.setItem('cart', '[]'); }
//   }
// });

// export const { addToCart, updateQty, removeFromCart, clearCart } = slice.actions;
// export default slice.reducer;



import { createSlice } from '@reduxjs/toolkit';

/** Safe load/save */
const load = () => {
  try { return JSON.parse(localStorage.getItem('cart') || '[]'); }
  catch { return []; }
};
const save = (items) => localStorage.setItem('cart', JSON.stringify(items));

const slice = createSlice({
  name: 'cart',
  initialState: { items: load() },
  reducers: {
    addToCart: (st, { payload }) => {
      // robust sku + qty
      const sku =
        payload?.sku ||
        payload?.variants?.[0]?.sku ||
        (payload?._id || payload?.id || 'SKU').toString();

      const qty = Math.max(1, Number(payload?.qty || 1));

      const idx = st.items.findIndex(i => i.sku === sku);
      if (idx >= 0) {
        st.items[idx].qty = Math.min(999, (Number(st.items[idx].qty) || 1) + qty);
      } else {
        st.items.push({ ...payload, sku, qty });
      }
      save(st.items);
    },

    updateQty: (st, { payload: { sku, qty } }) => {
      const it = st.items.find(i => i.sku === sku);
      if (it) {
        it.qty = Math.max(1, Number(qty || 1));
        save(st.items);
      }
    },

    removeFromCart: (st, { payload: sku }) => {
      st.items = st.items.filter(i => i.sku !== sku);
      save(st.items);
    },

    clearCart: (st) => {
      st.items = [];
      save(st.items);
    }
  }
});

export const { addToCart, updateQty, removeFromCart, clearCart } = slice.actions;

/** 🔁 Backward-compat alias so old imports like { addItem } keep working */
export const addItem = slice.actions.addToCart;

export default slice.reducer;
