import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, LoaderFunctionArgs, RouterProvider } from 'react-router-dom';

import './scss/styles.scss';

import { AddMemo } from './AddMemo';
import { App } from './App';
import { memoDB } from './db';
import { Impressum } from './Impressum';
import { MemoPage } from './MemosPage';

const memoList = memoDB.getMemos();

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/Impressum',
        element: <Impressum />,
    },
    {
        path: '/AddMemo',
        element: <AddMemo />,
    },
    {
        path: 'MemoPage/:memoId',
        element: <MemoPage />,
        loader: ({ params }: LoaderFunctionArgs) => {
            for (let i = 0; i < memoList.length; i++) {
                if (memoList[i].id == Number(params.memoId)) {
                    return memoList[i];
                }
            }
        },
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
