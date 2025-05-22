import heatmapReducer from "../slices/heatmap.slice";
import sessionReducer from "../slices/session.slice";
import shopReducer from "../slices/shop.slice";

const { combineReducers } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    shop: shopReducer,
    heatmap: heatmapReducer,
    session: sessionReducer,
});

export default rootReducer;;