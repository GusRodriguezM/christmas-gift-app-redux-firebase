import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    option: '',
    type: ''
  },
  reducers: {
    openModal: (state) => {
        state.open = true;
    },
    closeModal: (state) => {
        state.open = false;
        state.option = '';
        state.type = '';
    },
    setOption: (state, action) => {
      state.option = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    }
  },
});

export const { 
  closeModal, 
  openModal,
  setOption, 
  setType, 
} = modalSlice.actions;