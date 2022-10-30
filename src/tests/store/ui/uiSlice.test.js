import { removeErrorMessage, setErrorMessage, uiSlice } from "../../../store/slices/ui/uiSlice";
import { cleanErrorMessageState, errorMessageState, initialState } from "../../fixtures/uiFixtures";

describe('Tests in uiSlice file', () => {

    test('Should return the initial state and the reducer should be named "ui"', () => {

        //First we check if the name of the reducer is correct
        const state = uiSlice.reducer( initialState, {} );
        expect(state).toEqual(initialState);
        expect(uiSlice.name).toBe('ui');

    });

    test('Should set the error message', () => {

        //Check if the error message is set in the state
        const errorMessage = 'Email and password are required';
        const state = uiSlice.reducer( errorMessageState, setErrorMessage(errorMessage) );

        expect(state).toEqual({
            msgError: errorMessage
        });

    });

    test('Should clean the error message', () => {

        //Check if the error message is cleaned after we call the action to remove it
        const state = uiSlice.reducer( errorMessageState, removeErrorMessage() );
        expect(state).toEqual(cleanErrorMessageState);

    });

});