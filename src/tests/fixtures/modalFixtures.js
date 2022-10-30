export const initialState = {
    open: false,
    option: '', //options: edit, duplicate
    type: '' //options: form, visualize
}

export const openModalToAddGiftState = {
    open: true,
    option: '',
    type: 'form'
}

export const visualizeModalState = {
    open: true,
    option: '',
    type: 'visualize'
}

export const openModalToEditGiftState = {
    open: true,
    option: 'edit',
    type: 'form'
}

export const openModalToDuplicateGiftState = {
    open: true,
    option: 'duplicate',
    type: 'form'
}