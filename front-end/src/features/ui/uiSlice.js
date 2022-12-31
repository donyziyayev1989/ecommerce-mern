import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalShow: false,
  offcanvasShow: false,
  offcanvasTitle: '',
  offcanvasComponent: '',
  isSidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    hideModal: (state) => {
      state.modalShow = false;
      document.body.classList.remove('modal-open');
    },
    openModal: (state) => {
      state.modalShow = true;
      document.body.classList.add('modal-open');
    },
    showOffCanvas: (state, { payload }) => {
      state.offcanvasShow = true;
      state.offcanvasTitle = payload.title;
      state.offcanvasComponent = payload.component;
    },
    hideOffCanvas: (state) => {
      state.offcanvasShow = false;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const {
  hideModal,
  openModal,
  showOffCanvas,
  hideOffCanvas,
  toggleSidebar,
} = uiSlice.actions;
export default uiSlice.reducer;
