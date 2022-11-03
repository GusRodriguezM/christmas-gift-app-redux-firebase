import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { addGift, cleanList, deleteGiftById, duplicateGift, editGift, setGifts, setImageContent, setSavingGift } from "../../../store/slices/gifts/giftsSlice";
import { startAddingNewGift, startDeletingGift, startDeletingGifts, startDuplicatingGift, startLoadingGifts, startSavingGift, startUploadingFile } from "../../../store/slices/gifts/thunks";
import { loadGifts } from "../../../helpers";
import { gift, giftToEdit } from "../../fixtures/giftsFixtures";
import Toast from "../../../components/styles/Toast/Toast";

//Mocking the sweetalert component
jest.mock('../../../components/styles/Toast/Toast', () => ({
    fire: jest.fn(),
}));

/**
 * How to test.
 * 
 * Configure the environments (one for development and other for testing) with your own firebase configuration
 * REACT_APP_APIKEY = 
 * REACT_APP_AUTHDOMAIN = 
 * REACT_APP_PROJECTID = 
 * REACT_APP_STORAGEBUCKET = 
 * REACT_APP_MESSAGINGSENDERID = 
 * REACT_APP_APPID = 
 * 
 * Remember to do it in two separate files
 * .env.development -> for the development environment
 * .env.tes -> for the test environment
 * 
 * If there is no data in your firebase project for testing you can run the 'first test' as many times as you
 * want. But first comment the block of code that deletes data from firebase and keep it to run the other tests
 * 
 * The 'second test' can be run without problems.
 * 
 * The third test needs to have at least one gift in your database. I set the activeGift to be the first 
 * element of the gifts retrieved from firebase. If you have more than one element you can change that element
 * to be the activeGift
 * 
 * The 'fourth test' works in the same way as the third. You can change the element from the gifts retrieved
 * from firebase and modify the object 'giftToDuplicate'
 * 
 * The 'fifth test' needs to have at least one gift in your database. You can change the element from the gifts 
 * of the database, you only need the id
 * 
 * The 'sixth test' needs to have one element or more (more is preferable) to see the removal of all the elements
 * from the database
 * 
 * The 'seventh test' can be run without affecting others tests.
 * 
 * NOTE: To see how it works in a more explicit way I recommend to run one by one, this means to comment the 
 * other tests you do not want to see 
 * 
 * E.g. If you want to see the edition of a gift then you need to comment the other tests that can affect it
 * (fifth and sixth test)
 */

describe('Tests in the gifts thunks', () => {

    //Mocking two functions for the thunks
    const dispatch = jest.fn();
    const getState = jest.fn();
    
    //Constants to store data for the gifts store
    const uid = 'TEST-UID';
    let gifts = [];

    //Cleans all the mocks before each test
    beforeEach( () => jest.clearAllMocks() );

    //First test
    test('startAddingNewGift should create a new gift', async() => {
        
        //First we make that the getState return an object (auth) with the user id
        getState.mockReturnValue( { auth: { uid } } );

        //Before sending the gift object the id is removed
        delete gift.id;
        
        //Waiting for the response of the thunk. The gift is send to the thunk, dispatch and getState
        //is send to the async function that is returned from the thunk
        await startAddingNewGift( gift )( dispatch, getState );

        //Expecting the calling of the next functions as an argument of dispatch
        expect( dispatch ).toHaveBeenCalledWith( setSavingGift() );
        //We expect that the addGift action takes an object as an argument when the dispatch fires it
        expect( dispatch ).toHaveBeenCalledWith( addGift({
           id: expect.any( String ),
           ...gift
        }) );
        expect( Toast.fire ).toHaveBeenCalledWith({
            icon: 'success',
            title: 'A new gift has been added to your list'
        });

        /**
         * Delete data from firebase
         * To avoid the loading of innecessary data in firebase each time the tests runs we need an
         * option to delete the gifts that we send
         */
        const collectionRef = collection( FirebaseDB, `${uid}/list/gifts` );
        const docs = await getDocs( collectionRef );

        //We send the reference of the document from firebase and then we wait the promises to be resolved
        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );
        await Promise.all( deletePromises );

    });

    //Second test
    test('startLoadingGifts load the gifts from firebase', async() => {

        getState.mockReturnValue( { auth: { uid } } );
        
        //Waiting for the response of the thunk to load the gifts from firebase
        await startLoadingGifts()( dispatch, getState );

        //Sending the uid of the user and waiting for the response (an array with the gifts)
        gifts = await loadGifts( uid );

        //Finally we expect that the gifts is an object type
        expect(typeof gifts).toBe('object');
        //And expect that the dispatch have been called with setGifts action
        expect( dispatch ).toHaveBeenCalledWith( setGifts( gifts ) );

    });

    //Third test
    test('startSavingGift should edit a gift in the list', async() => {

        //First we make that the getState return an object (auth) with the user id
        //And a gift as an activeGift object
        getState.mockReturnValue( { auth: { uid }, gifts: { activeGift: gifts[0] } } );
        
        //First we delete the id of the gift to edit
        delete giftToEdit.id;

        //Waiting the response of the thunk. We send the gift to edit, the dispatch and getState
        await startSavingGift( giftToEdit )( dispatch, getState );

        //Now the id of the activeGift(gifts[0]) will be the id of the gift to edit
        giftToEdit.id = gifts[0].id;

        expect( dispatch ).toHaveBeenCalledWith( setSavingGift() );
        //Expecting that the dispatch is called with the editGift action and with the gift to edit as an argument
        expect( dispatch ).toHaveBeenCalledWith( editGift( giftToEdit ) );
        expect( Toast.fire ).toHaveBeenCalledWith({
            icon: 'success',
            title: 'Your gift has been edited successfully'
        });               

    });

    //Fourth test
    test('startDuplicatingGift should duplicate a gift', async() => {

        getState.mockReturnValue( { auth: { uid }, gifts: { activeGift: gifts[0] } } );

        //Making an object as if the user send a gift to duplicate
        //The other properties are taken from the activeGift because those are not allowed to edit in this
        //action
        const giftToDuplicate = {
            quantity: 5, 
            toPerson: 'Colt'
        }

        giftToDuplicate.total = giftToDuplicate.quantity * gifts[0].price;

        //Expecting the response from the thunk
        //We send the gift to duplicate, dispatch and getState as an action
        await startDuplicatingGift( giftToDuplicate )( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( setSavingGift() );
        //Expecting that the dispatch is called with the action to duplicate a gift
        //The action expects the id from the activeGift(gifts[0]) and the gift to duplicate
        expect( dispatch ).toHaveBeenCalledWith( duplicateGift( gifts[0].id, giftToDuplicate) );
        expect( Toast.fire ).toHaveBeenCalledWith({
            icon: 'success',
            title: 'Your gift has been duplicated successfully'
        }); 

        
    });

    //Fifth test    
    test('startDeletingGift should delete a gift', async() => {

        getState.mockReturnValue( { auth: { uid } } );

        //Waiting the response of the thunk
        //The id of the gift to delete, dispatch and getState is send as an argument
        await startDeletingGift( gifts[0].id )( dispatch, getState );

        //Expecting that the dispatch is called with the action to delete a gift by the id
        //Then the id of the activeGift(gifts[0]) is send as an argument
        expect( dispatch ).toHaveBeenCalledWith( deleteGiftById( gifts[0].id ) );
        expect( Toast.fire ).toHaveBeenCalledWith({
            icon: 'success',
            title: 'The gift has been deleted successfully'
        });

    });

    //Sixth test
    test('startDeletingGifts should delete all the gifts in the database', async() => {

        //Making the getState to return an object (auth) with the user id
        //And the list of gifts
        getState.mockReturnValue( { auth: { uid }, gifts: { gifts: gifts } } );

        //Waiting for the response of the thunk
        await startDeletingGifts()( dispatch, getState );
    
        //Expecting that the dispatch calls the action to delete or clean all the list of gifts
        expect( dispatch ).toHaveBeenCalledWith( cleanList() );
        expect( Toast.fire ).toHaveBeenCalledWith({
            icon: 'success',
            title: 'All the gifts has been deleted successfully'
        });

    });

    //Seventh test
    test('startUploadingFile should get a response from tha helper that uploads an image', async() => {

        //Setting the info of the image to send it to Cloudinary
        let files = [];
        const imageURL = 'https://images.unsplash.com/photo-1484591974057-265bb767ef71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';
        const resp = await fetch(imageURL);
        const blob = await resp.blob();
        const file = new File([blob], 'image.jpg');
        files.push(file);

        //Waiting the response from the thunk
        //The file made above is pushed into an array of files
        await startUploadingFile( files )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( setSavingGift() );
        //Expecting that the dispatch calls the action to set the image data in a specific structure
        expect( dispatch ).toHaveBeenCalledWith( setImageContent( {
            fileName: expect.any(String),
            format: expect.any(String),
            secureURL: expect.any(String),
        } ) );

    });

});