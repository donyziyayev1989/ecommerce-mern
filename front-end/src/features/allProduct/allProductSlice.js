import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useFetch } from './../../util/useFetch';

const initialState = {
  isLoading: false,
  products: [],
  totalProducts: 0,
  numOfPages: 1,
  page: 1,
  limit: 12,
  categories: [],
};
export const getAllProducts = createAsyncThunk(
  'allProduct/getAllProducts',
  async (_, thunkAPI) => {
    const { limit, page } = thunkAPI.getState().allProducts;
    const skip = limit * (page - 1);
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    const res = await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => thunkAPI.rejectWithValue(error));

    return res;
  }
);
export const getAllCategories = createAsyncThunk(
  'allProduct/getAllCategories',
  async (_, thunkAPI) => {
    let url = 'https://dummyjson.com/products/categories';
    const res = await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => thunkAPI.rejectWithValue(error));

    return res;
  }
);
const allProductSlice = createSlice({
  name: 'allProduct',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page = state.page + 1;
    },
    prevPage: (state) => {
      state.page = state.page - 1;
    },
    goToPage: (state, { payload }) => {
      state.page = payload;
    },
    setLimit: (state, { payload }) => {
      state.limit = Number(payload);
    },
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllProducts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.products = payload.products;
      state.totalProducts = payload.total;
      state.numOfPages = Math.ceil(payload.total / state.limit);
    },
    [getAllProducts.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [getAllCategories.fulfilled]: (state, { payload }) => {
      state.categories = payload;
    },
  },
});

export const { nextPage, goToPage, prevPage, setLimit } =
  allProductSlice.actions;
export default allProductSlice.reducer;
