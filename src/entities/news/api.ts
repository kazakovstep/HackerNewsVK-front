import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {formatUnixTimeToDateTime, NewsItem} from './model';

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://hacker-news.firebaseio.com/v0/' }),
    endpoints: (builder) => ({
        getNewsItems: builder.query<NewsItem[], void>({
            query: () => 'newstories.json',
            transformResponse: async (response: number[]) => {
                const newsIds = response.slice(0, 100);
                const newsPromises = newsIds.map((id) =>
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) => res.json())
                );
                const newsItems: NewsItem[] = await Promise.all(newsPromises);
                const formattedNewsItems = newsItems.map(newsItem => ({
                    ...newsItem,
                    time: formatUnixTimeToDateTime(newsItem.time)
                }));

                return formattedNewsItems;
            },
        }),
        getNewsItemById: builder.query<NewsItem, number>({
            query: (id) => `item/${id}.json`
        }),
    }),
});

export const { useGetNewsItemsQuery, useGetNewsItemByIdQuery } = newsApi;