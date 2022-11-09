import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { AppRouter } from "../../router/AppRouter";
import { authSlice } from "../../store/slices/auth/authSlice";
import { giftsSlice } from "../../store/slices/gifts/giftsSlice";
import { modalSlice } from "../../store/slices/modal/modalSlice";
import { uiSlice } from "../../store/slices/ui/uiSlice";
import { ThemeProvider } from "styled-components";
import theme from "../../components/styles/theme/theme";
import { authenticatedState } from "../fixtures/authFixtures";

//Mocking the custom hook that checks the auth status of the user
jest.mock('../../hooks/useCheckAuth');

describe('Tests in <AppRouter />', () => {

    //Cleaning all the mocks 
    beforeEach( () => jest.clearAllMocks() );

    test('Should show a loading message if the auth status is equal to checking', () => {

        //Returning a value with the mock of the custom hook
        useCheckAuth.mockReturnValue('checking');
        //Rendering the app router
        //We expect that a Loading message renders
        render( <AppRouter /> );
        //If everything went well then we expect that an h1 tag exists in the rendered result
        expect( screen.getByText('Loading...') ).toBeTruthy();

    });

    test('Should show the login if the user is not authenticated', () => {

        //Mocking a store
        const store = configureStore({
            reducer: {
                auth: authSlice.reducer,
                ui: uiSlice.reducer
            }
        });
        
        //Returning a value with the mock of the custom hook
        useCheckAuth.mockReturnValue('non-authenticated');

        //Rendering the component
        //This time we expect the Login Screen to be rendered
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <ThemeProvider theme={ theme }>
                        <AppRouter />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );

        //If the user is not authenticated we expect that the Login Screen gets rendered as a result
        expect( screen.getByRole('heading', { level: 1, name: 'Login' }) ).toBeTruthy();
        
    });

    test('Should show the Gifts Screen if the user is authenticated', () => {

        //Mocking the store with a default value to the auth state
        const store = configureStore({
            reducer: {
                auth: authSlice.reducer,
                ui: uiSlice.reducer,
                gifts: giftsSlice.reducer,
                modal: modalSlice.reducer,
            },
            preloadedState: {
                auth: authenticatedState
            }
        });

        //Returning a value with the mock of the custom hook
        useCheckAuth.mockReturnValue('authenticated');

        //Rendering the component
        //We expect that the Gifts Screen gets rendered
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <ThemeProvider theme={ theme }>
                        <AppRouter />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );

        //Then we just expect the elements of the component exists
        //Expecting the link in the navbar exists
        expect( screen.getByRole('link', { name: 'Christmas Gift App' }) ).toBeTruthy();

        //Expecting the number of the buttons to be 5 
        /**
         * 1. Logout
         * 2. Add Gift
         * 3. Visualize
         * 4. Print
         * 5. Delete All
         */
        expect( screen.getAllByRole('button').length ).toBe(5);
        
        //Expecting to have to h tags in the component
        expect( screen.getAllByRole('heading').length ).toBe(2);
        
        //Expecting that the name of the user appears in the navbar
        expect( screen.getByText(`: ${store.getState().auth.userName}`) ).toBeTruthy();
        
    });

});