import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {CommentItem} from './model';

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://hacker-news.firebaseio.com/v0/' }),
    endpoints: (builder) => ({
        getNewsItemById: builder.query<CommentItem, number>({
            query: (id) => `item/${id}.json`
        }),
    }),
});

export const {useGetNewsItemByIdQuery} = commentApi;