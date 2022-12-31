import { configureStore } from '@reduxjs/toolkit';
import allProductSlice from './features/allProduct/allProductSlice';
import offcanvasSlice from './features/offcanvas/offcanvasSlice';
import productSlice from './features/product/productSlice';
import uiSlice from './features/ui/uiSlice';
import userSlice from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    offcanvas: offcanvasSlice,
    allProducts: allProductSlice,
    product: productSlice,
    ui: uiSlice,
  },
});
