import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  modalShow: false,
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
  },
});

export const { hideModal, openModal } = uiSlice.actions;
export default uiSlice.reducer;
