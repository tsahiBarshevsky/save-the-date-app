/* Medicine reducer actions */
/* ======================== */

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
};

export const removeItem = (index) => {
    return {
        type: 'REMOVE_ITEM',
        payload: index
    }
};

export const updateActive = (id, active) => {
    return {
        type: 'UPDATE_ACTIVE',
        payload: { id: id, active: active }
    }
};

/* DaysLeft reducer actions */
/* ======================== */

export const setDaysLeft = () => {
    return {
        type: 'SET_DAYS_LEFT'
    };
};