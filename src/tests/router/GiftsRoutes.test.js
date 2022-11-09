import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "../../components/styles/theme/theme";
import { GiftsRoutes } from "../../router/GiftsRoutes";
import { authSlice } from "../../store/slices/auth/authSlice";
import { giftsSlice } from "../../store/slices/gifts/giftsSlice";
import { modalSlice } from "../../store/slices/modal/modalSlice";
import { uiSlice } from "../../store/slices/ui/uiSlice";
import { authenticatedState } from "../fixtures/authFixtures";

describe('Tests in the <GiftsRoutes />', () => {

    test('Should render the component correctly and match with the snapshot', () => {

        //Mocking the store with some states and a default auth state
        const store = configureStore({
            reducer: {
                auth: authSlice.reducer,
                ui: uiSlice.reducer,
                gifts: giftsSlice.reducer,
                modal: modalSlice.reducer
            },
            preloadedState: {
                auth: authenticatedState
            }
        });

        //Rendering the component
        const { container } = render(
            <Provider store={ store } >
                <MemoryRouter initialEntries={['/gifts']}>
                    <ThemeProvider theme={ theme } >
                        <GiftsRoutes />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );

        //Expecting that the rendered component matches with the snapshot
        expect( container ).toMatchSnapshot();

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