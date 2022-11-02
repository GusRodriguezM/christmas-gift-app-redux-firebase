import { loginWithEmailPassword, logoutFirebase, RegisterUserWithEmailPassword, signInWithGoogle } from "../../../firebase/providers";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../store/slices/auth/thunks";
import { checkingUserCredentials, login, logout } from "../../../store/slices/auth/authSlice";
import { demoUser } from "../../fixtures/authFixtures";
import { clearGiftsLogout } from "../../../store/slices/gifts";
import Toast from "../../../components/styles/Toast/Toast";

//Mocking the functions from the providers file (firebase functions for the authentication)
jest.mock('../../../firebase/providers');

//Mocking the sweetalert component
jest.mock('../../../components/styles/Toast/Toast', () => ({
    fire: jest.fn(),
}));

describe('Tests in the auth thunk file', () => {
    
    //A mockup of the dispatch function
    const dispatch = jest.fn();

    const loginData = { ok: true, ...demoUser };
    const loginErrorData = { ok: false, errorMessage: 'Something went wrong!' };

    const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

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

        //Now the simulation works as if the login fails
        await signInWithGoogle.mockResolvedValue( loginErrorData );

        //Calling the function from the thunks
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingUserCredentials() );
        //Expect that the dispatch executes the logout action with an error message
        expect( dispatch ).toHaveBeenCalledWith( logout( loginErrorData.errorMessage ) );
        //Finally we test that the notification appears with the error
        expect( Toast.fire ).toHaveBeenCalledWith({ 
            icon: 'error',
            title: loginErrorData.errorMessage
        });

    });

    test('startCreatingUserWithEmailPassword should call checkingUserCredentials register an user and do the login', async() => {

        //Waiting the response from the function to register an user
        await RegisterUserWithEmailPassword.mockResolvedValue( loginData );
        
        //Calling the function with the dispatch and the formData
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingUserCredentials() );
        //Expecting that the dispatch fires the login with the demoUser data
        expect( dispatch ).toHaveBeenCalledWith( login( demoUser ) );
        //Finally we expect that the notification fires
        expect( Toast.fire ).toHaveBeenCalledWith({
            icon: "info",
            text: "Start adding some gifts to your list!",
            title: `Welcome, ${demoUser.displayName}`
        });


    });

    test('startCreatingUserWithEmailPassword should call checkingUserCredentials, fail creating an user and do the logout', async() => {

        //Waiting the response from the function of the providers
        await RegisterUserWithEmailPassword.mockResolvedValue( loginErrorData );

        //Calling the function from the thunks
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingUserCredentials() );
        //Expecting that the dispatch fires the logout action with an error message
        expect( dispatch ).toHaveBeenCalledWith( logout( {errorMessage: loginErrorData.errorMessage} ) );
        expect( Toast.fire ).toHaveBeenCalledWith({ 
            icon: 'error',
            title: loginErrorData.errorMessage
        });

    });

    test('startLoginWithEmailPassword should call checkingUserCredentials and do the login', async() => {

        //Waiting the response from the function of the providers
        await loginWithEmailPassword.mockResolvedValue( loginData );

        //Deleting the displayName property from the formData object
        delete formData.displayName;

        //Waiting for the response from the function of our thunks
        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingUserCredentials() );
        //Expecting that the dispatch fires de login action
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
        expect( Toast.fire ).toHaveBeenCalledWith({ 
            icon: 'info',
            title: `Welcome back, ${loginData.displayName}`
        });

    });

    test('startLoginWithEmailPassword should call checkingUserCredentials and do the logout', async() => {

        //Simulating that the function from the providers returns the object from above
        await loginWithEmailPassword.mockResolvedValue( loginErrorData );

        //Deleting the displayName property from the formData object
        delete formData.displayName;

        //Then we wait for the response of the function that performs the login. And we send both objects defined previously
        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingUserCredentials() );
        //Expecting the calling of the logout with the error message
        expect( dispatch ).toHaveBeenCalledWith( logout( loginErrorData.errorMessage ) );
        expect( Toast.fire ).toHaveBeenCalledWith({ 
            icon: 'error',
            title: loginErrorData.errorMessage
        });

    });

    test('startLogout should call logoutFirebase, clearGiftsLogout and logout', async() => {

        //Waiting the response from startLogout
        await startLogout()( dispatch );

        //Expect that the logout have been called
        expect( logoutFirebase ).toHaveBeenCalled();
        //Then we expect that the dispatch fires the action to clear the list of gifts
        expect( dispatch ).toHaveBeenCalledWith( clearGiftsLogout() );
        //Then we expect that the dispatch fires the logout action
        expect( dispatch ).toHaveBeenCalledWith( logout() );
        //Finally we just expect that the notification appears
        expect( Toast.fire ).toHaveBeenCalledWith({
            icon: 'info',
            title: 'Goodbye!',
            text: 'Please, come back soon!'
        })

    });

});