import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { authSlice } from "../../../store/slices/auth";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../../store/slices/auth/thunks";
import { uiSlice } from "../../../store/slices/ui";
import { nonAuthenticatedState } from "../../fixtures/authFixtures";
import theme from "../../../components/styles/theme/theme";
import 'jest-styled-components';

//Making mocks of the functions
const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

//Declaring the route of the mocks and for the second passing props like in the login page
jest.mock('../../../store/slices/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email, password}) => {
        return () => mockStartLoginWithEmailPassword({email, password})
    },
}));

//Mocking the store. Using the auth and ui reducer and setting a specific state to the auth
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
    },
    preloadedState: {
        auth: nonAuthenticatedState
    },
});

describe('Tests in the <LoginScreen />', () => {

    //Cleaning the mocks
    beforeEach( () => jest.clearAllMocks() );

    test('Should render the component correctly and match with the snapshot', () => {

        //Rendering the component with the router, a provider for redux and for the styles to the styled components
        const { container } = render(
            <Provider store={ store } >
                <MemoryRouter>
                    <ThemeProvider theme={ theme } >
                        <LoginScreen />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );

        //Finally we expect that the render matches with the snapshot
        expect( container ).toMatchSnapshot();
        
    });
    
    test('<LoginScreen /> should have all the elements of the form', () => {

        //Rendering the component
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <ThemeProvider theme={ theme } >
                        <LoginScreen />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );
        
        //Expecting that the component have the elements for an input, link, heading and button
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
        expect( screen.getAllByRole('textbox').length ).toBe(1);
        expect( screen.getAllByRole('link').length ).toBe(1);
        expect( screen.getAllByRole('button').length ).toBe(2);

    });

    test('The Google button should call startGoogleSignIn', () => {

        //Rendering the component
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <ThemeProvider theme={ theme } >
                        <LoginScreen />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );

        //Getting the reference to the button by a label
        const googleBtn = screen.getByLabelText('googleBtn');
        
        //Firing the click event
        fireEvent.click( googleBtn );

        //Finally we expect that the function to start the login with Google have been called
        expect( mockStartGoogleSignIn ).toHaveBeenCalled();

    });

    test('The login button should submit the form and call startLoginWithEmailPassword with specific values', () => {

        //Constants to send to the form
        const email = 'bruce.wayne@gmail.com';
        const password = '123456';

        //Rendering the component
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <ThemeProvider theme={ theme } >
                        <LoginScreen />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );
        
        //Getting the reference to the input (for the email)
        const emailField = screen.getByPlaceholderText('Email');
        
        //Firing an event to put the value of the variable into the input
        fireEvent.change( emailField, { target: { name: 'email', value: email } } );

        //Getting the reference to the input (for the password)
        const passwordField = screen.getByPlaceholderText('Password');

        //Firing an event to put the value of the variable into the input
        fireEvent.change( passwordField, { target: { name: 'password', value: password } } );

        //Getting the reference to the form
        const loginForm = screen.getByLabelText('login-form');

        //Firing the submit
        fireEvent.submit(loginForm);

        //Expecting that the login with email and password have been called with the expected values
        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith( {email, password} );

    });

    test('Sweetalert should show if a field in the form is incorrect', () => {

        //Variables for the form
        const email = 'bruce.waynegmail.com';
        const password = '123456';

        //Rendering the component
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <ThemeProvider theme={ theme } >
                        <LoginScreen />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );
        
        //Getting the reference for the input (email)
        const emailField = screen.getByPlaceholderText('Email');
        
        //Firing the event to change the value of the input
        fireEvent.change( emailField, { target: { name: 'email', value: email } } );

        //Getting the reference for the input (password)
        const passwordField = screen.getByPlaceholderText('Password');

        //Firing the event to change the value of the input
        fireEvent.change( passwordField, { target: { name: 'password', value: password } } );

        //Getting the reference to the form
        const loginForm = screen.getByLabelText('login-form');

        //Firing the submit of the form
        fireEvent.submit(loginForm);

        //Expecting that the sweetalert notification appears because the email is wrong
        expect( screen.getAllByRole('heading', { name: 'The email is not valid' }).length ).toBe(1);

    });

});