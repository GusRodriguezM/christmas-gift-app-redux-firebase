import { signInWithGoogle } from "../../../firebase/providers";
import { checkingUserCredentials, login, logout } from "./"

export const checkingAuthentication = (email, password) => {
    return async( dispatch ) => {
        dispatch( checkingUserCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingUserCredentials() );
        const result = await signInWithGoogle();
        
        if(!result.ok)
            return dispatch( logout( result.errorMessage ) );

        dispatch( login(result) );
    }
}