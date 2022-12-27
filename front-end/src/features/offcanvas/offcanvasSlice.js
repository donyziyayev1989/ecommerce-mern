import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  title: '',
  component: '',
  isSidebarOpen: false,
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
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { show, hide, toggleSidebar } = offcanvasSlice.actions;
export default offcanvasSlice.reducer;
