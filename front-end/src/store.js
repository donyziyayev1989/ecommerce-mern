import { configureStore } from '@reduxjs/toolkit';
import offcanvasSlice from './features/offcanvas/offcanvasSlice';
import userSlice from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    offcanvas: offcanvasSlice,
  },
});
