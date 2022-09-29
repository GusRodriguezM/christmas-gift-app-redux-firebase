import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'non-authenticated', //options: checking, non-authenticated, authenticated
    uid: null,
    email: null,
    userName: null,
    photoURL: null,
    logged: false
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
    checkingUserCredentials: (state, action) => {
      state.status = 'checking';
    },
  },
});

export const { login, logout, checkingUserCredentials } = authSlice.actions;