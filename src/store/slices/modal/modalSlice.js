import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    option: '', //options: edit, duplicate
    type: '' //options: form, visualize
  },
  reducers: {
    openModal: (state, action) => {
        state.open = true;
        state.option = action.payload.option;
        state.type = action.payload.type;
    },
    closeModal: (state) => {
        state.open = false;
        state.option = '';
        state.type = '';
    }
  },
});

export const { 
  closeModal, 
  openModal,
} = modalSlice.actions;