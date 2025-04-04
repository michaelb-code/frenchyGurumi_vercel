import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const BestSeller = createSlice({
    name: "bestSeller",
    initialState,
    reducers: {
        FETCH_BESTSELLER_START: (state) => {
            state.loading = true;
            state.error = null;
        },
        FETCH_BESTSELLER_SUCCESS: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        FETCH_BESTSELLER_ERROR: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const { 
    FETCH_BESTSELLER_START, 
    FETCH_BESTSELLER_SUCCESS, 
    FETCH_BESTSELLER_ERROR 
} = BestSeller.actions;

export default BestSeller.reducer;