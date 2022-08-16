import { configureStore } from '@reduxjs/toolkit';
import { giftsSlice } from './slices/gifts';

export const store = configureStore({
  reducer: {
    gifts: giftsSlice.reducer,
  },
});