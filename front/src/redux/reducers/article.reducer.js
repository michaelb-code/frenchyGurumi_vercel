import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: [],
    loading: null,
    error: false, 
};

export const Article = createSlice({

    name: "article", //nom du slice 
    initialState, //etat initial defini plus haut
    reducers: {
        FETCH_ARTICLE_START: (store) => {
            store.loading = true;
            // on met loading a true pendant la recuperation des donnees
            store.error = null;
        },

        FETCH_ARTICLE_SUCCESS: (store, actions) => {
            store.loading = false; // on met loading a false apres la recuperation des donnees chargement termine
            store.data = actions.payload;
            // on met les donnees recuperees dans le store
            //on stocke les articles recu dans data 
            // store.error = null;
        },
         // Ajout de l'action pour mettre à jour les articles
        setArticles: (store, action) => {
            store.data = action.payload;
        },
        FETCH_ARTICLE_ERROR: (store, actions) => {
            store.loading = false;
            store.error = actions.payload;
        },
        // CLEAR_ARTICLE: (store) => {
        //     store.data = [];
        //     store.loading = null;
        //     store.error = null;
        // }
    }

});

export const { FETCH_ARTICLE_START, FETCH_ARTICLE_SUCCESS, setArticles, FETCH_ARTICLE_ERROR } = Article.actions
// les actions seront utilisées par les composants
export default Article.reducer
// fourni le store de redux a toute notre application