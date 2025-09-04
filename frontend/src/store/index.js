// import { configureStore } from '@reduxjs/toolkit';
// import user from './userSlice.js';
// import products from './productSlice.js';
// import cart from './cartSlice.js';
// import ai from './aiSlice.js';

// const store = configureStore({ reducer: { user, products, cart, ai } });
// export default store;


import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice.js";
import products from "./productSlice.js";
import cart from "./cartSlice.js";
import ai from "./aiSlice.js";
import wishlist from "./wishlistSlice.js";

export default configureStore({
  reducer: { user, products, cart, ai, wishlist }
});
