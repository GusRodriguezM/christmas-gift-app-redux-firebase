import Toast from "../../../components/styles/Toast/Toast";
import { loginWithEmailPassword, logoutFirebase, RegisterUserWithEmailPassword, signInWithGoogle } from "../../../firebase/providers";
import { clearGiftsLogout } from "../gifts";
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
            Toast.fire({
                icon: 'error',
                title: `${result.errorMessage}`
            });
        }else{
            dispatch( login(result) );
            Toast.fire({
                icon: 'info',
                title: `Welcome back, ${result.displayName}`
            });
        }

    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {

        dispatch( checkingUserCredentials() );

        const { ok, uid, photoURL, errorMessage } = await RegisterUserWithEmailPassword({email, password, displayName});

        if(!ok){
            dispatch( logout({errorMessage}) );
            Toast.fire({
                icon: 'error',
                title: `${errorMessage}`
            });
        }else{
            dispatch( login({uid, displayName, email, photoURL}) );
            Toast.fire({
                icon: 'info',
                title: `Welcome, ${displayName}`,
                text: 'Start adding some gifts to your list!'
            });
        }

    }

}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {

        dispatch( checkingUserCredentials() );

        const result = await loginWithEmailPassword({email, password});

        if(!result.ok){
            dispatch( logout(result.errorMessage) );
            Toast.fire({
                icon: 'error',
                title: `${result.errorMessage}`,
            })
        }else{
            dispatch( login(result) );
            Toast.fire({
                icon: 'info',
                title: `Welcome back, ${result.displayName}`,
            });
        }

    }
}

export const startLogout = () => {
    return async(dispatch) => {

        await logoutFirebase();
        dispatch( clearGiftsLogout() );
        dispatch( logout() );
        Toast.fire({
            icon: 'info',
            title: `Goodbye!`,
            text: 'Please, come back soon!'
        });

    }
}