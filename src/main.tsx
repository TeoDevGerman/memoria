import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, LoaderFunctionArgs } from 'react-router-dom';

import './index.css';
import './Memo.ts';
import './scss/styles.scss';

import memoDB from './db.ts';
import { App } from './App.tsx';
import { Impressum } from './Impressum.tsx';
import { MemoPage } from './MemosPage.tsx';
import { AddMemo } from './AddMemo.tsx';

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
