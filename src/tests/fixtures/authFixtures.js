export const initialState = {
    status: 'checking', //options: checking, non-authenticated, authenticated
    uid: null,
    email: null,
    userName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated', //options: checking, non-authenticated, authenticated
    uid: '123ABC',
    email: 'demo@gmail.com',
    userName: 'Jon Doe',
    photoURL: 'https://photo.jpg',
    errorMessage: null
}

export const nonAuthenticatedState = {
    status: 'non-authenticated', //options: checking, non-authenticated, authenticated
    uid: null,
    email: null,
    userName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: '123ABC',
    email: 'demo@gmail.com',
    displayName: 'Jon Doe',
    photoURL: 'https://photo.jpg',
}