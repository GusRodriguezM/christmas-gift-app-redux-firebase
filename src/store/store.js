import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth';
import { giftsSlice } from './slices/gifts';
import { modalSlice } from './slices/modal';
import { uiSlice } from './slices/ui/';

export const store = configureStore({
  reducer: {
    gifts: giftsSlice.reducer,
    modal: modalSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
  },
});