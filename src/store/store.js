import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth/authSlice';
import { giftsSlice } from './slices/gifts';
import { modalSlice } from './slices/modal/modalSlice';

export const store = configureStore({
  reducer: {
    gifts: giftsSlice.reducer,
    modal: modalSlice.reducer,
    auth: authSlice.reducer,
  },
});