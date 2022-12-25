import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: true,
  title: '',
  component: '',
};
const offcanvasSlice = createSlice({
  name: 'offcanvas',
  initialState,
  reducers: {
    show: (state, { payload }) => {
      state.show = true;
      state.title = payload.title;
      state.component = payload.component;
    },
    hide: (state) => {
      state.show = false;
    },
  },
});

export const { show, hide } = offcanvasSlice.actions;
export default offcanvasSlice.reducer;
