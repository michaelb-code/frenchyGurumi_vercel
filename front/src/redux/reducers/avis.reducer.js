import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: null,  
    error: false,
};

export const Avis = createSlice({
    name: "avis",
    initialState,
    reducers: {
        FETCH_AVIS_START: (state) => {
            state.loading = true;
            state.error = null;
        },
        FETCH_AVIS_SUCCESS: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        FETCH_AVIS_ERROR: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Ajout de l'action pour mettre à jour les commandes
        setAvis: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const {  FETCH_AVIS_START,
                FETCH_AVIS_SUCCESS,
                FETCH_AVIS_ERROR,
                setAvis } 
                = Avis.actions;

export default Avis.reducer;
