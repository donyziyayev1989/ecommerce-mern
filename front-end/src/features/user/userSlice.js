import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      console.log(payload);
    },
    registerUser: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export const { loginUser, registerUser } = userSlice.actions;
export default userSlice.reducer;
