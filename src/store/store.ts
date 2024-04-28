import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {newsApi} from "../entities/news"

const reducers = combineReducers({
    [newsApi.reducerPath]: newsApi.reducer
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(newsApi.middleware)
})