import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isSingleLoading: false,
  product: null,
  count: 1,
};

export const getSingleProduct = createAsyncThunk(
  'getSingleProduct/product',
  async (userId, thunkAPI) => {
    const res =
      userId &&
      (await fetch(`https://dummyjson.com/products/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((error) => thunkAPI.rejectWithValue(error)));

    return res;
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
