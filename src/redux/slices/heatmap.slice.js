const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    loading: false,
    page: null,
};

const heatmapSlice = createSlice({
    name: "heatmap",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        }
    }
});

export const heatmapActions = heatmapSlice.actions;

export const selectHeatmapPage = (state) => state.heatmap.page;

const heatmapReducer = heatmapSlice.reducer;
export default heatmapReducer;