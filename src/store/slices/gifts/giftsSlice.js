import { createSlice } from '@reduxjs/toolkit';

export const giftsSlice = createSlice({
  name: 'gifts',
  initialState: {
    gifts: []
  },
  reducers: {
    addGift: (state, action) => {
      state.gifts.push( action.payload );
    },
    deleteGift: (state, action) => {
      const idx = state.gifts.findIndex(st => st.id === action.payload);
      state.gifts.splice(idx, 1);
    },
  },
});

export const { addGift, deleteGift } = giftsSlice.actions;