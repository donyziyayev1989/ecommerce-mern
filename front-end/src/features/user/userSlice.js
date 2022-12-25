import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMember: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleMember: (state, { payload }) => {
      state.isMember = payload;
    },
  },
});

export const { toggleMember } = userSlice.actions;
export default userSlice.reducer;
