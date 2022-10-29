import { authSlice, checkingUserCredentials, login, logout } from "../../../store/slices/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Tests in the authSlice file', () => {

    test('Should return the initial state and the reducer should be named "auth"', () => {

        const state = authSlice.reducer( initialState, {} );
        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');

    });

    test('Should do the authentication (login)', () => {

        const state = authSlice.reducer( initialState, login(demoUser) );

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

        const state = authSlice.reducer( authenticatedState, logout() );

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

        const errorMessage = 'Invalid credentials';
        
        const state = authSlice.reducer( authenticatedState, logout({errorMessage}) );

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

        const state = authSlice.reducer( authenticatedState, checkingUserCredentials() );
        expect(state.status).toBe('checking');

    });

});