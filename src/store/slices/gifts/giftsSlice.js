import { createSlice } from '@reduxjs/toolkit';

export const giftsSlice = createSlice({
  name: 'gifts',
  initialState: {
    gifts: [],
    activeGift: null, //id, name, price, to, quantity, imgURL
    isSaving: false,
    messageSaved: '',
    imageContent: {
      name: '',
      imageURL: ''
    }
  },
  reducers: {
    addGift: (state, action) => {
      state.gifts.push( action.payload );
      state.isSaving = false;
      state.imageURL = '';
    },
    editGift: (state, action) => {
      state.isSaving = false; 
      state.gifts = state.gifts.map(gift => (
        gift.id === action.payload.id ? action.payload : gift
      ));
      state.imageURL = '';
    },
    duplicateGift: {
      reducer: (state, action) => {
        const { id, giftToDuplicate } = action.payload;
        const found = state.gifts.findIndex(gift => gift.id === id);
        state.gifts.splice(found + 1, 0, giftToDuplicate);
        state.isSaving = false;
        state.imageURL = '';
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
      state.isSaving = false;
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
    clearGiftsLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.activeGift = null;
      state.gifts = [];
    },
    setImageContent: (state, action) => {
      state.imageContent.name = action.payload.fileName +'.'+ action.payload.format;
      state.imageContent.imageURL = action.payload.secureURL;
      state.isSaving = false;
    },
    deleteImageContent: (state) => {
      state.imageContent.name = '';
      state.imageContent.imageURL = '';
    }
  },
});

export const { 
  addGift, 
  cleanList, 
  clearGiftsLogout,
  deleteActiveGift, 
  deleteGiftById, 
  deleteImageContent,
  duplicateGift, 
  editGift, 
  resetSavingGift, 
  setActiveGift, 
  setGifts,
  setImageContent,
  setSavingGift, 
} = giftsSlice.actions;