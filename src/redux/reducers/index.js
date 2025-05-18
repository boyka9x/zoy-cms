import heatmapReducer from "../slices/heatmap.slice";
import shopReducer from "../slices/shop.slice";

const { combineReducers } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    shop: shopReducer,
    heatmap: heatmapReducer,
});

export default rootReducer;;