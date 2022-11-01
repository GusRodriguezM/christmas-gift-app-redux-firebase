import { signInWithGoogle } from "../../../firebase/providers";
import { checkingAuthentication, checkingUserCredentials, login, logout, startGoogleSignIn } from "../../../store/slices/auth";
import { demoUser } from "../../fixtures/authFixtures";
import Toast from "../../../components/styles/Toast/Toast";

//Mocking the functions from the providers file (firebase functions for the authentication)
jest.mock('../../../firebase/providers', () => ({
    signInWithGoogle: jest.fn(),
}));

//Mocking the sweetalert component
jest.mock('../../../components/styles/Toast/Toast', () => ({
    fire: jest.fn(),
}));

describe('Tests in the auth thunk file', () => {
    
    //A mockup of the dispatch function
    const dispatch = jest.fn();

    //To avoid weird behaviours the mocks needs to be cleared to its default value
    beforeEach( () => jest.clearAllMocks() );

    test('Should invoke checkAuthCredentials', async() => {

        /**
         * The function is async and thus the test must have an async sentence and we await the response of the 
         * function of the authentication.
         * 
         * The first parenthesis is the calling of the function and the second is the return value of the function,
         * so it needs the dispatch as an argument
         */
        await checkingAuthentication()( dispatch );

        //Finally the test expects that the function has been called with the response of the action creator
        expect( dispatch ).toHaveBeenCalledWith( checkingUserCredentials() );

    });

    test('startGoogleSignIn should call checkingUserCredentials and do the login succesfully', async() => {

        //Making an object as a type of response when the login is successful
        const loginData = { ok: true, ...demoUser };

        /**
         * Calling the function from firebase providers. 
         * In the same sentence we put as an argument the object created previously
         */
        await signInWithGoogle.mockResolvedValue( loginData );

        //First we call the from the thunks and then we pass the dispatch as an argument
        await startGoogleSignIn()( dispatch );

        //Expecting that the dispatch executes the action to check the user credentials
        expect( dispatch ).toHaveBeenCalledWith( checkingUserCredentials() );
        //Expecting that the dispatch executes the login action with the mocked data
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
        //Finally if all its correct the notification should appear with the name of the user
        expect( Toast.fire ).toHaveBeenCalledWith({ 
            icon: 'info',
            title: `Welcome back, ${loginData.displayName}`
        });

    });

    test('startGoogleSignIn should call checkingUserCredentials and do the logout', async() => {

        //Making an object as a type of response when the login fails
        const loginData = { ok: false, errorMessage: 'Something went wrong!' }

        //Now the simulation works as if the login fails
        await signInWithGoogle.mockResolvedValue( loginData );

        //Calling the function from the thunks
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingUserCredentials() );
        //Expect that the dispatch executes the logout action with an error message
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
        //Finally we test that the notification appears with the error
        expect( Toast.fire ).toHaveBeenCalledWith({ 
            icon: 'error',
            title: loginData.errorMessage
        });

    });

});