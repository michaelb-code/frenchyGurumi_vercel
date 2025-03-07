import {createSlice }from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: null,
    error: null,
};

export const User = createSlice({

    name: "user", 
    initialState,
    reducers: {
        FETCH_USER_START: (store) => {
            store.loading = true;
        },

        FETCH_USER_SUCCESS: (store, actions) => {
            store.loading = false;
            store.data = actions.payload;
        },
        FETCH_USER_ERROR: (store, actions) => {
            store.loading = false;
            store.error = actions.payload;
        }
    }
});

export const {FETCH_USER_START, FETCH_USER_SUCCESS, FETCH_USER_ERROR} = User.actions

export default User.reducer