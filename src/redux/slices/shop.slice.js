const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    shop: {}
};

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setShop: (state, action) => {
            state.shop = action.payload;
        }
    }
});

export const shopActions = shopSlice.actions;

export const selectShop = (state) => state.shop.shop;

const shopReducer = shopSlice.reducer;
export default shopReducer;