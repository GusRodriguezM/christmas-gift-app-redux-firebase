import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../firebase/config';
import { loadGifts } from '../../../helpers';
import { addGift, setActiveGift, setSavingGift, setGifts } from './';

export const startAddingNewGift = (newGift) => {
    return async(dispatch, getState) => {

        dispatch( setSavingGift() );
        
        const { uid } = getState().auth;

        const newDoc = doc( collection( FirebaseDB, `${uid}/list/gifts` ) );
        await setDoc( newDoc, newGift );

        newGift.id = newDoc.id;

        dispatch( addGift(newGift) );

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

export const startSavingGift = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const { activeGift } = getState().gifts;

        const giftToDB = {...activeGift};
        delete giftToDB.id;

        console.log(giftToDB);
    }
}