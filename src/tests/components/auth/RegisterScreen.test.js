import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import theme from "../../../components/styles/theme/theme";
import { authSlice } from "../../../store/slices/auth/authSlice";
import { uiSlice } from "../../../store/slices/ui/uiSlice";
import 'jest-styled-components';
import { ThemeProvider } from "styled-components";
import { nonAuthenticatedState } from "../../fixtures/authFixtures";
import { startCreatingUserWithEmailPassword } from "../../../store/slices/auth/thunks";

//Mocking the function of the thunk to begin with the creation of an user with email and password
const mockStartCreatingUserWithEmailPassword = jest.fn();
jest.mock('../../../store/slices/auth/thunks', () => ({
    startCreatingUserWithEmailPassword: ({email, password, displayName}) => {
        return () => mockStartCreatingUserWithEmailPassword({email, password, displayName})
    } 
}));

//Mocking the store with a fixture of the auth
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer
    },
    preloadedState: {
        auth: nonAuthenticatedState
    }
});

describe('Tests in the <RegisterScreen />', () => {

    //Cleaning all the mocks
    beforeEach( () => jest.clearAllMocks() );

    test('Should render the component correctly and match with the snapshot', () => {

        //Rendering the component
        const { container } = render(
            <Provider store={ store } >
                <MemoryRouter>
                    <ThemeProvider theme={ theme } >
                        <RegisterScreen />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );

        //Expecting that the container matches the snapshot
        expect( container ).toMatchSnapshot();

    });

    test('<RegisterScreen /> should have the components in the form', () => {

        //Rendering the component
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <ThemeProvider theme={ theme } >
                        <RegisterScreen />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );

        //Expecting that the html tag h1 is in the DOM
        expect( screen.getByRole('heading', { level: 1, name: 'Sign in' }) ).toBeInTheDocument;
        
        //Getting the number of inputs and comparing with the real number in the component
        expect( screen.getAllByPlaceholderText('Name').length ).toBe(1);
        expect( screen.getAllByPlaceholderText('Email').length ).toBe(1);
        expect( screen.getAllByPlaceholderText('Password').length ).toBe(2);
        
        //Expecting that the button of the form is in the document
        expect( screen.getByRole('button', {name: 'Register'}) ).toBeInTheDocument;

        //Expecting that the form to have five children (the html elements tested above)
        const registerForm = screen.getByLabelText('register-form');
        expect(registerForm.children.length).toBe(5);

        //Getting the link and expecting to be in the document
        expect( screen.getByRole('link') ).toBeInTheDocument;

    });
    test('The register button should submit the form and call startCreatingUserWithEmailPassword with specific values', () => {

        //Making variables to send to the form
        const name = 'Bruce Wayne';
        const email = 'bruce.wayne@gotica.com';
        const password = '1mn0T84tw4N';
        const password2 = '1mn0T84tw4N';

        //Rendering the component
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <ThemeProvider theme={ theme } >
                        <RegisterScreen />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );

        //Getting the input for the name and firing an event to put the corresponding value
        const nameField = screen.getByPlaceholderText('Name');
        fireEvent.change( nameField, { target: { name: 'name', value: name } } );

        //Getting the input for the email and firing an event to put the corresponding value
        const emailField = screen.getByPlaceholderText('Email');
        fireEvent.change( emailField, { target: { name: 'email', value: email } } )

        //Getting the inputs for the passwords and firing an event to put the corresponding value
        const passwordFields = screen.getAllByPlaceholderText('Password');
        fireEvent.change( passwordFields[0], { target: { name: 'password', value: password } } );
        fireEvent.change( passwordFields[1], { target: { name: 'password2', value: password2 } } );

        //Getting the form reference and firing an event to submit the data
        const registerForm = screen.getByLabelText('register-form');
        fireEvent.submit( registerForm );

        //Expecting that the thunk function have been called with the data we have put it in the form
        expect( mockStartCreatingUserWithEmailPassword ).toHaveBeenCalledWith( {email, password, displayName: name} );

    });

    test('Sweetalert should show if a field in the form is incorrect', () => {

        //Making variables to send to the form
        const name = 'Bruce Wayne';
        const email = 'bruce.wayne@gotica.com';
        const password = '84tw4N';
        const password2 = '1mn0T84tw4N';

        //Rendering the component
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <ThemeProvider theme={ theme } >
                        <RegisterScreen />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );

        const nameField = screen.getByPlaceholderText('Name');
        fireEvent.change( nameField, { target: { name: 'name', value: name } } );

        const emailField = screen.getByPlaceholderText('Email');
        fireEvent.change( emailField, { target: { name: 'email', value: email } } )

        const passwordFields = screen.getAllByPlaceholderText('Password');
        fireEvent.change( passwordFields[0], { target: { name: 'password', value: password } } );
        fireEvent.change( passwordFields[1], { target: { name: 'password2', value: password2 } } );

        const registerForm = screen.getByLabelText('register-form');
        fireEvent.submit( registerForm );

        //Expecting that the error appears in the screen (with sweetalert) by selecting the html tag that contains the thrown error
        expect( screen.getAllByRole('heading', { level: 2, name: 'The passwords should match' }).length ).toBe(1);

    });

});