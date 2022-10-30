import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        msgError: ''
    },
    reducers: {
        setErrorMessage: (state, {payload}) => {
            state.msgError = payload;
        },
        removeErrorMessage: (state) => {
            state.msgError = '';
        },
    },
});

export const { setErrorMessage, removeErrorMessage } = uiSlice.actions;