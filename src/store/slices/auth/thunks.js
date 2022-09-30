import { signInWithGoogle } from "../../../firebase/providers";
import { checkingUserCredentials } from "./authSlice"

export const checkingAuthentication = (email, password) => {
    return async( dispatch ) => {
        dispatch( checkingUserCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingUserCredentials() );
        const result = await signInWithGoogle();
        console.log(result);
    }
}