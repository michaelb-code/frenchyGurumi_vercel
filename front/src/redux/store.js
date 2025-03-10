import { configureStore } from '@reduxjs/toolkit';

//REDUCERS
import Article from './reducers/article.reducer';
import User from './reducers/user.reducer';

export const store = configureStore({
    reducer: {
        article: Article,
        user: User
    },
})