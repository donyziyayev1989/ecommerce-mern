import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isSingleLoading: false,
  product: {},
  count: 1,
};

export const getSingleProduct = createAsyncThunk(
  'getSingleProduct/product',
  async (productId, thunkAPI) => {
    if (productId) {
      const res = await fetch(`https://dummyjson.com/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((error) => thunkAPI.rejectWithValue(error));

      return res;
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [getSingleProduct.pending]: (state) => {
      state.isSingleLoading = true;
    },
    [getSingleProduct.fulfilled]: (state, { payload }) => {
      state.isSingleLoading = false;
      state.product = payload;
    },
    [getSingleProduct.rejected]: (state) => {
      state.isSingleLoading = false;
    },
  },
});

export default productSlice.reducer;
