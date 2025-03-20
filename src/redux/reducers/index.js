import shopReducer from "../slices/shop.slice";

const { combineReducers } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    shop: shopReducer
});

export default rootReducer;;