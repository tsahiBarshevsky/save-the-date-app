const medicinesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MEDICINES':
            return action.medicines;
        case 'ADD_ITEM':
            state = state.slice();
            return [...state, action.payload];
        case 'REMOVE_ITEM':
            const index = action.payload;
            state = state.slice();
            return [...state.slice(0, index), ...state.slice(index + 1)];
        default:
            return state;
    }
}

export default medicinesReducer;