import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  total: 0,
  totalProducts: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const { id, count, price } = payload;
      let quantity = count ? Number(count) : 1;

      let existProduct = state.products.find((product) => product.id === id);

      if (existProduct) {
        existProduct.count += quantity;
      } else {
        state.products.push({
          ...payload,
          count: quantity,
        });
        state.totalProducts += 1;
      }
      state.totalQuantity += quantity;
      state.total += price * quantity;
    },
    removeFromCart: (state, { payload }) => {
      const removeProduct = state.products.find(
        (product) => product.id === payload
      );
      state.products = state.products.filter(
        (product) => product.id !== payload
      );
      state.totalProducts -= 1;
      state.totalQuantity -= removeProduct.count;
      state.total -= removeProduct.price * removeProduct.count;
    },
    clearCart: (state) => {
      return {
        products: [],
        total: 0,
        totalProducts: 0,
        totalQuantity: 0,
      };
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
