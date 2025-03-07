import { configureStore } from '@reduxjs/toolkit';
import Article from './reducers/article.reducer';
import User from './reducers/user.reducer';

export default configureStore({
    reducer: {
        article: Article,
        user: User
    }
})