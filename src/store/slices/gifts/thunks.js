import { collection, deleteDoc, doc, setDoc, writeBatch } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../firebase/config';
import { fileUpload, loadGifts } from '../../../helpers';
import { addGift, setSavingGift, setGifts, editGift, deleteGiftById, cleanList, duplicateGift, setImageURL } from './';

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

export const startDuplicatingGift = (giftToDuplicate) => {
    return async(dispatch, getState) => {

        dispatch( setSavingGift() );

        const { uid } = getState().auth;
        const { activeGift } = getState().gifts;

        giftToDuplicate.imageURL = activeGift.imageURL;
        giftToDuplicate.name = activeGift.name;
        giftToDuplicate.price = activeGift.price;

        const newDoc = doc( collection( FirebaseDB, `${uid}/list/gifts` ) );
        await setDoc( newDoc, giftToDuplicate );

        giftToDuplicate.id = newDoc.id;

        dispatch( duplicateGift(activeGift.id, giftToDuplicate) );
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

export const startDeletingGifts = () => {
    return async(dispatch, getState) => {
        
        //Getting the user id and the gifts array from the store
        const { uid } = getState().auth;
        const { gifts } = getState().gifts;

        //We use batch writes. Basically this instruction allows to execute a set of different operations
        const batch = writeBatch(FirebaseDB);

        //Loop over the array of gifts to delete. We send the reference to the doc
        gifts.forEach(gift => {
            batch.delete( doc(FirebaseDB, `${uid}/list/gifts/${gift.id}`) );
        });

        //Finally, we commit the batch
        await batch.commit();

        //We clean the array in the store
        dispatch( cleanList() );

    }
}

export const startUploadingFile = (files = []) => {
    return async(dispatch) => {
        dispatch( setSavingGift() );

        const imageURL = await fileUpload( files[0] );

        dispatch( setImageURL(imageURL) );

    }
}