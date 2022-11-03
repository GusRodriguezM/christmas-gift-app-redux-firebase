import { loadGifts } from "../../helpers";

describe('Tests in the loadGifts helper file', () => {

    test('Should retrieve an array of gifts from the database', async() => {
        
        //Mocking the user id
        const uid = 'TEST-UID';

        //Waiting for the response of loadGifts
        const gifts = await loadGifts( uid );

        //Expecting that the gifts will be an object
        expect( typeof gifts ).toBe('object');

    });


    test('Should return null if the id its incorrect', async() => {

        //Waiting for the response of loadGifts
        const gifts = await loadGifts();

        //Expecting the result to be null because there is no user id in the argument 
        expect( gifts ).toBe(null);
        
    });

});