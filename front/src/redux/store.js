import { configureStore } from '@reduxjs/toolkit';
import Article from './article.reducer';
import User from './user.reducer';

export default configureStore({
    reducer: {
        article: Article,
        user: User
    }
})