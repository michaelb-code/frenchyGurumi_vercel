import { configureStore } from '@reduxjs/toolkit';

//REDUCERS
import Article from './reducers/article.reducer';
import User from './reducers/user.reducer';
import Commande from './reducers/commande.reducer';
import BestSeller from './reducers/bestSeller.reducer';
import Avis from './reducers/avis.reducer';

const store = configureStore({
    reducer: {
        article: Article,
        user: User,
        commande: Commande,
        bestSeller: BestSeller,
        avis: Avis
    },
})

export default store;
