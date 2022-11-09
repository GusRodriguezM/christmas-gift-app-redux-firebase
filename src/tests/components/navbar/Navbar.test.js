import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Navbar } from "../../../components/navbar/Navbar";
import theme from "../../../components/styles/theme/theme";
import { authSlice } from "../../../store/slices/auth/authSlice";
import { startLogout } from "../../../store/slices/auth/thunks";
import { authenticatedState } from "../../fixtures/authFixtures";

//Mocking the thunk to begin the process to the logout
const mockStartLogout = jest.fn();
jest.mock('../../../store/slices/auth/thunks', () => ({
    startLogout: () => mockStartLogout
}));

describe('Tests in the <Navbar />', () => {

    //Mocking the store with an auth state
    const store = configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: authenticatedState
        }
    });

    //Cleaning the mocks
    beforeEach( () => jest.clearAllMocks() );

    test('Should render the component correctly and match with the snapshot', () => {

        //Rendering the component
        const { container } = render(
            <Provider store={ store } >
                <MemoryRouter>
                    <ThemeProvider theme={ theme } >
                        <Navbar />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );

        //Expecting that the result of render the component matches with the snapshot
        expect( container ).toMatchSnapshot();

        //Expecting that the name of the user appears in the navbar
        expect( screen.getByText(`: ${store.getState().auth.userName}`) ).toBeTruthy();

    });

    test('Logout button should call the startLogout action', async() => {

        //Rendering the component
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <ThemeProvider theme={ theme } >
                        <Navbar />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );

        //Getting the reference of the button
        const logoutBtn = screen.getByRole('button', { name: 'Logout' });

        //Firing the event to make the logout
        fireEvent.click( logoutBtn );

        //We expect that the startLogout have been called after clicking the logout button
        expect( mockStartLogout ).toHaveBeenCalled();

    });

});