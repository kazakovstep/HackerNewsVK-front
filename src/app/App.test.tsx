import React from 'react';
import {render} from '@testing-library/react';
import ItemPage from "../pages/itemPage";
import {RouterProvider} from "@vkontakte/vk-mini-apps-router";
import {router} from "../index";
import {Comment} from "../entities/comment/ui";
import CommentTree from "../widgets/CommentTree/CommentTree";

test('renders ItemPage', () => {
    const {getByText} = render(
        <RouterProvider router={router}>
            <ItemPage/>
        </RouterProvider>
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const linkElement = getByText(/Ссылка на новость/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders Comment', () => {
    const {getByText} = render(
        <RouterProvider router={router}>
            <CommentTree newsId={40236805}/>
        </RouterProvider>
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const linkElement = getByText(/Обновить комментарии/i);
    expect(linkElement).toBeInTheDocument();
});