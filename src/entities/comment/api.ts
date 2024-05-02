import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CommentItem} from './model';

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://hacker-news.firebaseio.com/v0/'}),
    endpoints: (builder) => ({
        getNewsItemById: builder.query<CommentItem, number>({
            query: (id) => `item/${id}.json`
        }),
        getAllChildren: builder.query<CommentItem[], number>({
            query: (id) => `item/${id}.json?print=pretty`,
            transformResponse: async (response: CommentItem) => {
                const kids = response.kids
                const promises = kids.map((el) =>
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${el}.json`).then((res) => res.json())
                )
                const newsItems: CommentItem[] = await Promise.all(promises);
                const formattedNewsItems = newsItems.filter(newsItem => !newsItem.deleted);
                return formattedNewsItems;
            },
        })
    }),
});

export const {useGetNewsItemByIdQuery, useGetAllChildrenQuery} = commentApi;