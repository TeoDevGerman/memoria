import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './scss/styles.scss';

import { AddMemo } from './AddMemo';
import { App } from './App';
import { Impressum } from './Impressum';
import { MemoList } from './MemoList';
import { MemoPage } from './MemoPage';
import { MemosContextProvider } from './MemosContextProvider';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'MemoPage/:memoId',
                element: <MemoPage />,
            },
            {
                path: '',
                element: <MemoList />,
            },
            {
                path: '/Impressum',
                element: <Impressum />,
            },
            {
                path: '/AddMemo',
                element: <AddMemo />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MemosContextProvider>
            <RouterProvider router={router} />
        </MemosContextProvider>
    </React.StrictMode>
);
