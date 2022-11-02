import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { addGift, setSavingGift } from "../../../store/slices/gifts/giftsSlice";
import { startAddingNewGift } from "../../../store/slices/gifts/thunks";
import { gift } from "../../fixtures/giftsFixtures";
import Toast from "../../../components/styles/Toast/Toast";

//Mocking the sweetalert component
jest.mock('../../../components/styles/Toast/Toast', () => ({
    fire: jest.fn(),
}));

describe('Tests in the gifts thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('startAddingNewGift should create a new note', async() => {

        const uid = 'TEST-UID';
        getState.mockReturnValue( { auth: { uid } } );

        delete gift.id;
        
        await startAddingNewGift( gift )( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( setSavingGift() );
        expect( dispatch ).toHaveBeenCalledWith( addGift({
           id: expect.any( String ),
           ...gift
        }) );
        expect( Toast.fire ).toHaveBeenCalledWith({
            icon: 'success',
            title: 'A new gift has been added to your list'
        });

        //Delete data from firebase
        const collectionRef = collection( FirebaseDB, `${uid}/list/gifts` );
        const docs = await getDocs( collectionRef );

        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );
        await Promise.all( deletePromises );

    });

});