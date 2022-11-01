//Initial state for the gifts slice
export const initialState = {
    gifts: [],
    activeGift: null, //id, name, price, to, quantity, imgURL
    isSaving: false,
    messageSaved: '',
    imageContent: {
      name: '',
      imageURL: ''
    }
}

/**
 * A state when an image is added to the form 
 * E.g. This is made when a gift is going to be added or edited
 */
export const initialStateWithImageContent = {
    gifts: [],
    activeGift: null, //id, name, price, to, quantity, imgURL
    isSaving: false,
    messageSaved: '',
    imageContent: {
        name: 'vocho.jpg',
        imageURL: 'https://res.cloudinary.com/gusrom/image/upload/v1666075143/ChristmasApp/t6hj16gcydi92rtjzjuc.jpg'
    }
}

//The isSaving property indicates that the process of manipulating a gift is being made
export const isSavingInitialState = {
    gifts: [],
    activeGift: null, //id, name, price, to, quantity, imgURL
    isSaving: true,
    messageSaved: '',
    imageContent: {
      name: '',
      imageURL: ''
    }
}

//The state when a gift has been added to the list
export const addGiftState = {
    gifts: [
        {
            id: '4dsFL1c0gXHe6u44tcRn',
            name:'Xbox Series S pro scorpio',
            quantity: '1',
            imageURL: 'https://res.cloudinary.com/gusrom/image/upload/v1666075143/ChristmasApp/t6hj16gcydi92rtjzjuc.jpg',
            toPerson: 'Victor',
            price: '420',
            total: 420
        }
    ],
    activeGift: null, //id, name, price, to, quantity, imgURL
    isSaving: false,
    messageSaved: '',
    imageContent: {
      name: '',
      imageURL: ''
    }
}

//The state when a gift has been edited 
export const editGiftState = {
    gifts: [
        {
            id: '4dsFL1c0gXHe6u44tcRn',
            name:'Xbox Series X',
            quantity: '2',
            imageURL: 'https://image.jpg',
            toPerson: 'Jorge',
            price: '520',
            total: 1040
        }
    ],
    activeGift: null, //id, name, price, to, quantity, imgURL
    isSaving: false,
    messageSaved: '',
    imageContent: {
      name: '',
      imageURL: ''
    }
}

//This state have two gifst because the second is a duplicate of the first
export const duplicateGiftState = {
    gifts: [
        {
            id: '4dsFL1c0gXHe6u44tcRn',
            name:'Xbox Series S pro scorpio',
            quantity: '1',
            imageURL: 'https://res.cloudinary.com/gusrom/image/upload/v1666075143/ChristmasApp/t6hj16gcydi92rtjzjuc.jpg',
            toPerson: 'Victor',
            price: '420',
            total: 420
        },
        {
            id: '9ctI204Z6B0sUfFcYTYP',
            name:'Xbox Series S pro scorpio',
            quantity: '1',
            imageURL: 'https://res.cloudinary.com/gusrom/image/upload/v1666075143/ChristmasApp/t6hj16gcydi92rtjzjuc.jpg',
            toPerson: 'Gus',
            price: '420',
            total: 420
        }
    ],
    activeGift: null, //id, name, price, to, quantity, imgURL
    isSaving: false,
    messageSaved: '',
    imageContent: {
      name: '',
      imageURL: ''
    }
}

/**
 * This example shows a list with one gift and an active gift in the state.
 * Meaning the gift will be edited or duplicated
 */
export const addGiftStateWithActiveGift = {
    gifts: [
        {
            id: '4dsFL1c0gXHe6u44tcRn',
            name:'Xbox Series S pro scorpio',
            quantity: '1',
            imageURL: 'https://res.cloudinary.com/gusrom/image/upload/v1666075143/ChristmasApp/t6hj16gcydi92rtjzjuc.jpg',
            toPerson: 'Victor',
            price: '420',
            total: 420
        }
    ],
    activeGift: {
        id: '4dsFL1c0gXHe6u44tcRn',
        name:'Xbox Series S pro scorpio',
        quantity: '1',
        imageURL: 'https://res.cloudinary.com/gusrom/image/upload/v1666075143/ChristmasApp/t6hj16gcydi92rtjzjuc.jpg',
        toPerson: 'Victor',
        price: '420',
        total: 420
    },
    isSaving: false,
    messageSaved: '',
    imageContent: {
      name: '',
      imageURL: ''
    }
}

//A simple example of the structure of a gift
export const gift = {
    id: '4dsFL1c0gXHe6u44tcRn',
    name:'Xbox Series S pro scorpio',
    quantity: '1',
    imageURL: 'https://res.cloudinary.com/gusrom/image/upload/v1666075143/ChristmasApp/t6hj16gcydi92rtjzjuc.jpg',
    toPerson: 'Victor',
    price: '420',
    total: 420
}

//A simple example of an edited gift (the base is the gift above)
export const giftToEdit = {
    id: '4dsFL1c0gXHe6u44tcRn',
    name:'Xbox Series X',
    quantity: '2',
    imageURL: 'https://image.jpg',
    toPerson: 'Jorge',
    price: '520',
    total: 1040
}

//An example of a dulicated gift
export const giftToDuplicate = {
    id: '9ctI204Z6B0sUfFcYTYP',
    name:'Xbox Series S pro scorpio',
    quantity: '1',
    imageURL: 'https://res.cloudinary.com/gusrom/image/upload/v1666075143/ChristmasApp/t6hj16gcydi92rtjzjuc.jpg',
    toPerson: 'Gus',
    price: '420',
    total: 420
}

//A list of gifts used to load the array when an user logs in 
export const gifts = [
    {
        id: '4dsFL1c0gXHe6u44tcRn',
        name:'Xbox Series S pro scorpio',
        quantity: '1',
        imageURL: 'https://res.cloudinary.com/gusrom/image/upload/v1666075143/ChristmasApp/t6hj16gcydi92rtjzjuc.jpg',
        toPerson: 'Victor',
        price: '420',
        total: 420
    },
    {
        id: '9ctI204Z6B0sUfFcYTYP',
        name:'Xbox Series S pro scorpio',
        quantity: '1',
        imageURL: 'https://res.cloudinary.com/gusrom/image/upload/v1666075143/ChristmasApp/t6hj16gcydi92rtjzjuc.jpg',
        toPerson: 'Gus',
        price: '420',
        total: 420
    }
]

//The strucutre of the response from cloudinary when an image is uploaded
export const imageCloudinary = {
    fileName: 'vocho',
    format: 'jpg',
    secureURL: 'https://res.cloudinary.com/gusrom/image/upload/v1666075143/ChristmasApp/t6hj16gcydi92rtjzjuc.jpg',
}