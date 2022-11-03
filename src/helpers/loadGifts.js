import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadGifts = async(uid = '') => {
    // if(!uid) throw new Error('The user id does not exist');
    if(!uid) return null;

    const collectionRef = collection(FirebaseDB, `${uid}/list/gifts`);
    const docs = await getDocs(collectionRef);

    const gifts = [];
    docs.forEach(doc => {
        gifts.push({id: doc.id, ...doc.data()});
    });

    return gifts;
}