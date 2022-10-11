import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../firebase/config';
import { addGift, setActiveGift, setSavingGift } from './';

export const startNewGift = () => {
    return async(dispatch, getState) => {

        dispatch( setSavingGift() );
        
        const { uid } = getState().auth;

        const newGift = {
            name: '',
            price: '',
            to: '',
            quantity: '',
            imageURL: ''
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/list/gifts` ) );
        await setDoc( newDoc, newGift );

        newGift.id = newDoc.id;

        // dispatch( addGift(newGift) );
        dispatch( setActiveGift(newGift) );

    }
}