import { configureStore } from '@reduxjs/toolkit';
import allProductSlice from './features/allProduct/allProductSlice';
import cartSlice from './features/cart/cartSlice';
import productSlice from './features/product/productSlice';
import uiSlice from './features/ui/uiSlice';
import userSlice from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    allProducts: allProductSlice,
    product: productSlice,
    ui: uiSlice,
    cart: cartSlice,
  },
});
