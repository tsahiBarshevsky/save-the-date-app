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
        case 'UPDATE_ACTIVE':
            const id = action.payload.id;
            const active = action.payload.active;
            // Find index of the chosen medicine
            const i = state.findIndex(medicine => medicine._id === id);
            let medicines = [...state];
            medicines[i] = { ...medicines[i], active: active };
            return [...medicines];
        default:
            return state;
    }
}

export default medicinesReducer;