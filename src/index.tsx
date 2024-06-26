import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {createHashRouter, RouterProvider} from '@vkontakte/vk-mini-apps-router';
import {AdaptivityProvider, AppRoot, ConfigProvider} from "@vkontakte/vkui";
import {Provider} from "react-redux";
import {store} from "./app/store/store";


import '@vkontakte/vkui/dist/vkui.css';



export const router = createHashRouter([
    {
        path: '/',
        panel: 'main_page',
        view: 'news',
    },
    {
        path: '/news/:id',
        panel: 'item_page',
        view: 'news',
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <ConfigProvider>
        <AdaptivityProvider>
            <AppRoot>
                <RouterProvider router={router}>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </RouterProvider>
            </AppRoot>
        </AdaptivityProvider>
    </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
