const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    shop: {},
    loading: false,
};

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        fetchShop: (state, action) => {
            state.loading = true;
        },
        fetchShopSuccess: (state, action) => {
            state.shop = action.payload;
            state.loading = false;
        },
        fetchShopFailure: (state, action) => {
            state.loading = false;
        },

        updateShop: (state, action) => {
            state.shop = { ...state.shop, ...action.payload };
        },
    }
});

export const shopActions = shopSlice.actions;

export const selectShop = (state) => state.shop.shop;

const shopReducer = shopSlice.reducer;
export default shopReducer;