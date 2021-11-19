import cartReducer from "./cart";
import authReducer from "./auth";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    cart: cartReducer,
    auth: authReducer
});

export default allReducers;