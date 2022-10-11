import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../firebase/config';

export const startNewGift = () => {
    return async(dispatch, getState) => {
        
        const { uid } = getState().auth;

        const newGift = {
            name: '',
            price: '',
            to: '',
            quantity: '',
            imageURL: ''
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/list/gifts` ) );
        const docResp = await setDoc( newDoc, newGift );

    }
}