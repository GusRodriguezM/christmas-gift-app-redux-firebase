import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'modal',
    initialState: {
        msgError: null
    },
    reducers: {
        setErrorMessage: (state, {payload}) => {
            state.msgError = payload;
        },
        removeErrorMessage: (state) => {
            state.msgError = null;
        },
    },
});

export const { setErrorMessage, removeErrorMessage } = uiSlice.actions;