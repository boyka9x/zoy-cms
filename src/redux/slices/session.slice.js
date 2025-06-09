const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    filter: {
        page: 1,
        limit: 10,
        date: null,
    },
    loading: false,
};

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
});

export const sessionActions = sessionSlice.actions;

export const selectSessionFilter = (state) => state.session.filter;

const sessionReducer = sessionSlice.reducer;
export default sessionReducer;