import { createSlice } from '@reduxjs/toolkit';

export const giftsSlice = createSlice({
  name: 'gifts',
  initialState: {
    gifts: [],
    activeGift: null
  },
  reducers: {
    addGift: (state, action) => {
      state.gifts.push( action.payload );
    },
    editGift: (state, action) => {
      const idx = state.gifts.findIndex(st => st.id === action.payload.id);
      if(idx >= 0){
        state.gifts.splice(idx, 1, action.payload);
      }
    },
    deleteGift: (state, action) => {
      const idx = state.gifts.findIndex(st => st.id === action.payload);
      if(idx >= 0){
        state.gifts.splice(idx, 1);
      }
    },
    cleanList: (state) => {
      state.gifts = [];
    },
    setActiveGift: (state, action) => {
      state.activeGift = action.payload;
    },
    deleteActiveGift: (state) => {
      state.activeGift = null;
    }
  },
});

export const { addGift, editGift, deleteGift, cleanList, setActiveGift, deleteActiveGift } = giftsSlice.actions;