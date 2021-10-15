import medicinesReducer from "./medicines";
import daysLeftReducer from "./daysLeft";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    medicines: medicinesReducer,
    daysLeft: daysLeftReducer
});

export default rootReducer;