import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false
  },
  reducers: {
    openModal: (state, action) => {
        state.open = true;
    },
    closeModal: (state, action) => {
        state.open = false;
    }
  },
});

export const { openModal, closeModal } = modalSlice.actions;