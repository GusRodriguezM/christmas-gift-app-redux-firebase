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

export const gift = {
    id: '4dsFL1c0gXHe6u44tcRn',
    name:'Xbox Series S pro scorpio',
    quantity: '1',
    imageURL: 'https://res.cloudinary.com/gusrom/image/upload/v1666075143/ChristmasApp/t6hj16gcydi92rtjzjuc.jpg',
    toPerson: 'Victor',
    price: '420',
    total: 420
}

export const giftToEdit = {
    id: '4dsFL1c0gXHe6u44tcRn',
    name:'Xbox Series X',
    quantity: '2',
    imageURL: 'https://image.jpg',
    toPerson: 'Jorge',
    price: '520',
    total: 1040
}

export const giftToDuplicate = {
    id: '9ctI204Z6B0sUfFcYTYP',
    name:'Xbox Series S pro scorpio',
    quantity: '1',
    imageURL: 'https://res.cloudinary.com/gusrom/image/upload/v1666075143/ChristmasApp/t6hj16gcydi92rtjzjuc.jpg',
    toPerson: 'Gus',
    price: '420',
    total: 420
}

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

export const imageCloudinary = {
    fileName: 'vocho',
    format: 'jpg',
    secureURL: 'https://res.cloudinary.com/gusrom/image/upload/v1666075143/ChristmasApp/t6hj16gcydi92rtjzjuc.jpg',
}