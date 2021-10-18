const imageReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_IMAGE_LINK':
            return action.image;
        default:
            return state;
    }
}

export default imageReducer;