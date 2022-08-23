import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    logged: false,
    email: '',
  },
  reducers: {
    login: (state, action) => {
        state.logged = true;
        state.email = action.payload;
    },
    logout: (state, action) => {
        state.logged = false;
        state.email = ''
    },
  },
});

export const { login, logout } = authSlice.actions;