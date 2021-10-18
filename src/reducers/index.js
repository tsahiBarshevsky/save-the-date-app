import medicinesReducer from "./medicines";
import daysLeftReducer from "./daysLeft";
import imageReducer from './image';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    medicines: medicinesReducer,
    daysLeft: daysLeftReducer,
    image: imageReducer
});

export default rootReducer;