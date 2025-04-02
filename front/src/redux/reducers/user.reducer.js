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
        FETCH_USER_START: (state) => {
            state.loading = true;
            state.error = null;
        },

        FETCH_USER_SUCCESS: (state, actions) => {
            state.loading = false;
            state.data = actions.payload;
            state.error = null;
        },
        FETCH_USER_ERROR: (state, actions) => {
            state.loading = false;
            state.error = actions.payload;
        },
        // Ajout de l'action pour mettre à jour les utilisateurs
        setUsers: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const {  FETCH_USER_START, 
                FETCH_USER_SUCCESS, 
                FETCH_USER_ERROR, 
                setUsers
            } = User.actions

export default User.reducer