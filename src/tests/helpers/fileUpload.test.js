import 'setimmediate';
import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../helpers";

cloudinary.config({
    cloud_name: 'gusrom',
    api_key: '925729933297976',
    api_secret: 'ng1fi5sHpmY6n6oWYmMHK7wFeNM',
    secure: true
});

describe('Tests in the fileUpload file', () => {

    test('Should upload an image to Cloudinary', async() => {

        //Setting the info of the image to send it to Cloudinary
        const imageURL = 'https://images.unsplash.com/photo-1484591974057-265bb767ef71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';
        const resp = await fetch(imageURL);
        const blob = await resp.blob();
        const file = new File([blob], 'image.jpg');

        //Getting the response from Cloudinary through our helper file. If the response is an object the test pass
        const content = await fileUpload(file);
        expect(typeof content).toBe('object');

        //Splitting the url into substrings
        const segments = content.secureURL.split('/');
        
        //Getting the image id and the folder name from the array of substrings
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');
        const folderName = segments[ segments.length - 2 ];


        //Waiting for the response from cloudinary. We send the folder name and the image id previously obtained
        const cloudinaryResp = await cloudinary.api.delete_resources([`${folderName}/${imageId}`], { resource_type: 'image' });

        /**
         * If in the response we get and object with a property delete and inside the folder and the id and 
         * the value of deleted then it's donde, the test passes
         * {
         *  deleted: { 'ChristmasApp/hpqsfuqwkj28yuibzqwc': 'deleted' },
         *  ...
         * }
         * console.log(cloudinaryResp);
         */

    });

    test('Should return null', async () => {

        //If nothing is sent to cloudinary then we should get null from our helper file
        const file = new File([], 'image.jpg');
        const content = await fileUpload(file);
        expect(content).toBe(null);

    });

});