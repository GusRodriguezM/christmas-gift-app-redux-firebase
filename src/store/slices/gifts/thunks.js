import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../firebase/config';
import { loadGifts } from '../../../helpers';
import { addGift, setActiveGift, setSavingGift, setGifts } from './';

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

export const startLoadingGifts = () => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;
        if(!uid) throw new Error('The user id does not exist');

        const gifts = await loadGifts(uid);

        dispatch( setGifts(gifts) );
    }
}