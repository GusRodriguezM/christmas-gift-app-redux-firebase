import { createSlice } from '@reduxjs/toolkit';

export const giftsSlice = createSlice({
  name: 'gifts',
  initialState: {
    gifts: [],
    activeGift: null, //id, name, price, to, quantity, imgURL
    isSaving: false,
    messageSaved: ''
  },
  reducers: {
    addGift: (state, action) => {
      state.gifts.push( action.payload );
      state.isSaving = false;
    },
    editGift: (state, action) => {
      const idx = state.gifts.findIndex(st => st.id === action.payload.id);
      if(idx >= 0){
        state.gifts.splice(idx, 1, action.payload);
      }
    },
    duplicateGift: {
      reducer: (state, action) => {
        const { id, giftToDuplicate } = action.payload;
        const found = state.gifts.findIndex(gift => gift.id === id);
        state.gifts.splice(found + 1, 0, giftToDuplicate);
      },
      prepare: (id, giftToDuplicate) => {
        return {
          payload: {
            id, giftToDuplicate
          }
        }
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
    },
    setGifts: (state, action) => {

    },
    setSavingGift: (state) => {
      state.isSaving = true;
    },
  },
});

export const { addGift, editGift, duplicateGift, deleteGift, cleanList, setActiveGift, deleteActiveGift, setSavingGift } = giftsSlice.actions;