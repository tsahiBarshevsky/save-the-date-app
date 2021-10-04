import medicinesReducer from "./medicines";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    medicines: medicinesReducer
});

export default rootReducer;