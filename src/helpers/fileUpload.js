export const fileUpload = async(file) => {
    // if(!file)
    //     throw new Error('There is no image to upload');
    if(!file) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/gusrom/upload';

    const formData = new FormData();

    formData.append('upload_preset', 'christmas-app');
    formData.append('file', file);

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if(!resp.ok)
            throw new Error('The image could not be uploaded');

        const cloudResp = await resp.json();

        return {
            fileName: cloudResp.original_filename,
            format: cloudResp.format,
            secureURL: cloudResp.secure_url,
        };
        
    } catch (error) {
        console.log(error);
        // throw new Error(error);
        return null;
    }

}