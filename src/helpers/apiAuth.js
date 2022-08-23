export const apiAuth = {

    getUSer: () => new Promise((resolve, reject) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            console.log(user);

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

    saveUser: (user) => new Promise((resolve, reject) => {
        try{
            localStorage.setItem('user', JSON.stringify(user) || '');
            resolve('saved');
        }catch(error){
            reject('error saving the user');
        }
    })

}