import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {newsApi} from "../../entities/news"
import {commentApi} from "../../entities/comment";

const reducers = combineReducers({
    [newsApi.reducerPath]: newsApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(newsApi.middleware).concat(commentApi.middleware)
})