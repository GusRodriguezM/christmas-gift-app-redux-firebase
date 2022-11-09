import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "../../components/styles/theme/theme";
import { AuthRoutes } from "../../router/AuthRoutes";
import { authSlice } from "../../store/slices/auth";
import { uiSlice } from "../../store/slices/ui";
import { nonAuthenticatedState } from "../fixtures/authFixtures";

describe('Tests in the <AuthRoutes />', () => {

    test('Should render the component correctly', () => {

        //Mocking the store
        const store = configureStore({
            reducer: {
                auth: authSlice.reducer,
                ui: uiSlice.reducer,
            },
            preloadedState: {
                auth: nonAuthenticatedState
            }
        });

        //Rendering the component
        const { container } = render(
            <Provider store={ store }>
                <MemoryRouter initialEntries={['/login']}>
                    <ThemeProvider theme={ theme }>
                        <AuthRoutes />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );

        //Expecting that the component rendered matches with the snapshot
        expect( container ).toMatchSnapshot();

        //Expecting that the component have the elements for an input, link, heading and button
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
        expect( screen.getAllByRole('textbox').length ).toBe(1);
        expect( screen.getAllByRole('link').length ).toBe(1);
        expect( screen.getAllByRole('button').length ).toBe(2);

    });

});