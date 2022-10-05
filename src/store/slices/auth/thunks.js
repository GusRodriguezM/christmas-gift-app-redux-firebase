import { RegisterUserWithEmailPassword, signInWithGoogle } from "../../../firebase/providers";
import { setErrorMessage } from "../ui";
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
        
        if(!result.ok){
            dispatch( logout( result.errorMessage ) );
            dispatch( setErrorMessage(result.errorMessage) );
            return false;
        }

        dispatch( login(result) );
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {

        dispatch( checkingUserCredentials() );

        const { ok, uid, photoURL, errorMessage } = await RegisterUserWithEmailPassword({email, password, displayName});

        if(!ok){
            dispatch( logout({errorMessage}) );
            dispatch( setErrorMessage(errorMessage) );
            return false;
        }
        
        dispatch( login({uid, displayName, email, photoURL}) );

    }

}