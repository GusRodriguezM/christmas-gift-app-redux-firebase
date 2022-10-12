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
      state.isSaving = false; 
      state.gifts = state.gifts.map(gift => (
        gift.id === action.payload.id ? action.payload : gift
      ));
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
    deleteGiftById: (state, action) => {
      state.gifts = state.gifts.filter(gift => gift.id !== action.payload);
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
      state.gifts = action.payload;
    },
    setSavingGift: (state) => {
      state.isSaving = true;
    },
    resetSavingGift: (state) => {
      state.isSaving = false;
    },
  },
});

export const { addGift, editGift, duplicateGift, deleteGiftById, cleanList, setActiveGift, deleteActiveGift, setSavingGift, setGifts, resetSavingGift } = giftsSlice.actions;