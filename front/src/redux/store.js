import { configureStore } from '@reduxjs/toolkit';

//REDUCERS
import Article from './reducers/article.reducer';
import User from './reducers/user.reducer';
import Commande from './reducers/commande.reducer';

const store = configureStore({
    reducer: {
        article: Article,
        user: User,
        commande: Commande
    },
})

export default store;
