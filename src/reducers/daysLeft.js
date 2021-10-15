const daysLeftReducer = (state = 15, action) => {
    switch (action.type) {
        case 'SET_DAYS_LEFT':
            return action.daysLeft;
        default:
            return state;
    }
}

export default daysLeftReducer;