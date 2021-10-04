export const setMedicines = () => {
    return {
        type: 'SET_MEDICINES'
    };
};

export const addNewItem = (newItem) => {
    return {
        type: 'ADD_ITEM',
        payload: newItem
    }
}

export const removeItem = (index) => {
    return {
        type: 'REMOVE_ITEM',
        payload: index
    }
}