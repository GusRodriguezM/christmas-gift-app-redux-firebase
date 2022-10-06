import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', //options: checking, non-authenticated, authenticated
    uid: null,
    email: null,
    userName: null,
    photoURL: null,
    errorMessage: null,
    logged: false
  },
  reducers: {
    login: (state, { payload }) => {
        state.status = 'authenticated';
        state.uid = payload.uid;
        state.email = payload.email;
        state.userName = payload.displayName;
        state.photoURL = payload.photoURL;
        state.errorMessage = payload.errorMessage;
    },
    logout: (state, { payload }) => {
        state.status = 'non-authenticated';
        state.uid = null;
        state.email = null;
        state.userName = null;
        state.photoURL = null;
        state.errorMessage = payload.errorMessage;
    },
    checkingUserCredentials: (state, action) => {
      state.status = 'checking';
    },
  },
});

export const { login, logout, checkingUserCredentials } = authSlice.actions;