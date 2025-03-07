import {createSlice }from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: null,
    error: false,
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
        }
    
});

export const {FETCH_USER_START, FETCH_USER_SUCCESS} = User.actions

export default User.reducer