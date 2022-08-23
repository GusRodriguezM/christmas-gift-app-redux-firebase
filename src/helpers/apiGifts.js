export const apiGifts = {

    getGifts: () => new Promise((resolve, reject) => {
        try {
            const list = JSON.parse(localStorage.getItem('gifts'));
            console.log(list);

            setTimeout((
                () => resolve({
                    status: 'ok',
                    data: list
                })
            ), 1000);
        }catch(error){
            reject({
                status: 'error',
                data: []
            })
        }
    }),

    saveGifts: (gifts) => new Promise((resolve, reject) => {
        try {
            localStorage.setItem('gifts', JSON.stringify(gifts) || '');
            resolve('saved');
        } catch (error) {
            reject('error saving the gifts')
        }
    })

}