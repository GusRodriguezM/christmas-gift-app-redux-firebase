import { createSlice } from '@reduxjs/toolkit';

export const giftsSlice = createSlice({
  name: 'gifts',
  initialState: {
    gifts: []
  },
  reducers: {
    addGift: (state) => { },
  },
});

export const { addGift } = giftsSlice.actions;