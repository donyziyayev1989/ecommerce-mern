import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useFetch } from './../../util/useFetch';

const initialFiltersState = {
  categories: [],
  selectedCategory: '',
  minPrice: 0,
  maxPrice: 0,
  search: '',
};

const initialState = {
  isLoading: false,
  products: [],
  totalProducts: 0,
  numOfPages: 1,
  page: 1,
  limit: 12,
  quickViewId: null,
  isSearchLoading: false,
  quickSearchItems: [],
  ...initialFiltersState,
};
export const getAllProducts = createAsyncThunk(
  'allProduct/getAllProducts',
  async (_, thunkAPI) => {
    const { limit, page, selectedCategory, search } =
      thunkAPI.getState().allProducts;
    const skip = limit * (page - 1);
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    if (selectedCategory) {
      url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${skip}`;
    }
    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
    }

    const res = await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => thunkAPI.rejectWithValue(error));

    return res;
  }
);
export const searchProducts = createAsyncThunk(
  'allProduct/searchProducts',
  async (_, thunkAPI) => {
    const { search } = thunkAPI.getState().allProducts;
    let url;
    url = `https://dummyjson.com/products/search?q=${search}`;
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
    setCategory: (state, { payload }) => {
      state.selectedCategory = payload;
      state.page = 1;
    },
    setMinPrice: (state, { payload }) => {
      state.minPrice = payload;
    },
    setMaxPrice: (state, { payload }) => {
      state.maxPrice = payload;
    },
    clearFilters: (state) => {
      state.selectedCategory = '';
      state.page = 1;
    },
    setViewId: (state, { payload }) => {
      state.quickViewId = payload;
    },
    handleValue: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
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
    [searchProducts.pending]: (state) => {
      state.isSearchLoading = true;
    },
    [searchProducts.fulfilled]: (state, { payload }) => {
      state.isSearchLoading = false;
      state.quickSearchItems = payload.products.slice(0, 10);
    },
    [searchProducts.rejected]: (state) => {
      state.isSearchLoading = false;
    },
  },
});

export const {
  nextPage,
  goToPage,
  prevPage,
  setLimit,
  setCategory,
  setMinPrice,
  setMaxPrice,
  clearFilters,
  setViewId,
  handleValue,
  searchHandle,
} = allProductSlice.actions;
export default allProductSlice.reducer;
