import { createSlice } from "@reduxjs/toolkit";

const initial = JSON.parse(localStorage.getItem("wishlist") || "[]");

const slice = createSlice({
  name: "wishlist",
  initialState: { items: initial },
  reducers: {
    toggleWish(state, action) {
      const p = action.payload;
      const i = state.items.findIndex(x => x._id === p._id);
      if (i > -1) state.items.splice(i, 1);
      else state.items.push(p);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    removeWish(state, action) {
      const id = action.payload;
      const i = state.items.findIndex(x => x._id === id);
      if (i > -1) state.items.splice(i, 1);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    clearWish(state) {
      state.items = [];
      localStorage.setItem("wishlist", "[]");
    }
  }
});

export const { toggleWish, removeWish, clearWish } = slice.actions;
export default slice.reducer;
