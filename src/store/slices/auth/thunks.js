import { loginWithEmailPassword, logoutFirebase, RegisterUserWithEmailPassword, signInWithGoogle } from "../../../firebase/providers";
import { clearGiftsLogout } from "../gifts";
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

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {

        dispatch( checkingUserCredentials() );

        const result = await loginWithEmailPassword({email, password});

        if(!result.ok){
            dispatch( logout(result.errorMessage) );
            dispatch( setErrorMessage(result.errorMessage) );
            return false;
        }

        dispatch( login(result) );
    }
}

export const startLogout = () => {
    return async(dispatch) => {

        await logoutFirebase();
        dispatch( clearGiftsLogout() );
        dispatch( logout() );

    }
}