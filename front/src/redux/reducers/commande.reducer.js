import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: null,
    error: false,
};

export const Commande = createSlice({
    name: "commande",
    initialState,
    reducers: {
        FETCH_ORDER_START: (state) => {
            state.loading = true;
            state.error = null;
        },
        FETCH_ORDER_SUCCESS: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        FETCH_ORDER_ERROR: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Ajout de l'action pour mettre à jour les commandes
        setOrders: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const {  FETCH_ORDER_START,
                FETCH_ORDER_SUCCESS,
                FETCH_ORDER_ERROR,
                setOrders } 
                = Commande.actions;

export default Commande.reducer;