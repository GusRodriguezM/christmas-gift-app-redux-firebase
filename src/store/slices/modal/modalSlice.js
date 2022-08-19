import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    option: ''
  },
  reducers: {
    openModal: (state) => {
        state.open = true;
    },
    closeModal: (state) => {
        state.open = false;
    },
    setOption: (state, action) => {
      state.option = action.payload;
    }
  },
});

export const { openModal, closeModal, setOption } = modalSlice.actions;