import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../firebase/config';
import { loadGifts } from '../../../helpers';
import { addGift, setSavingGift, setGifts, editGift, deleteGiftById } from './';

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

export const startSavingGift = (giftToEdit) => {
    return async(dispatch, getState) => {
        dispatch( setSavingGift() );

        const { uid } = getState().auth;
        const { activeGift } = getState().gifts;

        const docRef = doc(FirebaseDB, `${uid}/list/gifts/${activeGift.id}`);
        await setDoc(docRef, giftToEdit, { merge: true });

        giftToEdit.id = activeGift.id;
        dispatch( editGift(giftToEdit) );
    }
}

export const startDeletingGift = (id) => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;

        const docRef = doc(FirebaseDB, `${uid}/list/gifts/${id}`);
        await deleteDoc(docRef);

        dispatch( deleteGiftById(id) );
        
    }
}