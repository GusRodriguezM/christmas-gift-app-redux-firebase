import { authSlice, checkingUserCredentials, login, logout } from "../../../store/slices/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Tests in the authSlice file', () => {

    test('Should return the initial state and the reducer should be named "auth"', () => {

        //Checking if the name of the reducer is correct
        const state = authSlice.reducer( initialState, {} );
        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');

    });

    test('Should do the authentication (login)', () => {

        //Calling the login action
        const state = authSlice.reducer( initialState, login(demoUser) );

        //We expect the login to fill the data into the user state
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            userName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        })

    });

    test('Should do the logout without args', () => {

        //We call the logout action without args
        const state = authSlice.reducer( authenticatedState, logout() );

        //We expect that the info of the user gets deleted and the status flag changes
        expect(state).toEqual({
            status: 'non-authenticated',
            uid: null,
            email: null,
            userName: null,
            photoURL: null,
            errorMessage: undefined
        })

    });

    test('Should do the logout with args', () => {

        //Setting an error message
        const errorMessage = 'Invalid credentials';
        
        //Calliing the logout action with arguments 
        const state = authSlice.reducer( authenticatedState, logout({errorMessage}) );

        //When the logout action is called with arguments we expect an error message in the user state
        expect(state).toEqual({
            status: 'non-authenticated',
            uid: null,
            email: null,
            userName: null,
            photoURL: null,
            errorMessage: errorMessage
        })

    });

    test('Should change the status to "checking" ', () => {

        //When the checkingUserCredentils is called we expect a change in the user status
        const state = authSlice.reducer( authenticatedState, checkingUserCredentials() );
        expect(state.status).toBe('checking');

    });

});