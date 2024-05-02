import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {newsApi} from "../../entities/news"
import {commentApi} from "../../entities/comment";
import {reducer as kidsReducer} from "./slices/kidsSlice.slice";

const reducers = combineReducers({
    kids: kidsReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(newsApi.middleware).concat(commentApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>