import { createSlice } from '@reduxjs/toolkit';

export const giftsSlice = createSlice({
  name: 'gifts',
  initialState: {
    gifts: [
      {
        name: 'Stuffed Bear',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556012018-50c5c0da73bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        person: 'Janet',
        price: 10,
      },
      {
        name: 'Xbox Series S',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1019&q=80',
        person: 'Jorge',
        price: 20,
      },
      {
        name: 'Guitar',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        person: 'Victor',
        price: 30,
      }
    ]
  },
  reducers: {
    addGift: (state) => { },
  },
});

export const { addGift } = giftsSlice.actions;