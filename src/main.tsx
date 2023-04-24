import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './scss/types.ts'


// Import our custom CSS
import './scss/styles.scss'

import {
  createBrowserRouter,
  RouterProvider,
  LoaderFunctionArgs,
} from "react-router-dom";

const memoList = memoDB.getMemos()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Impressum",
    element: <Impressum />,
  },
  {
    path: "/AddMemo",
    element: <AddMemo />,
  },
  {
    path: "MemoPage/:memoId",
    element: <MemoPage />,
    loader: ({ params }: LoaderFunctionArgs) => {
      for (let i = 0; i < memoList.length; i++) {
        if (memoList[i].id == Number(params.memoId)) {
          return memoList[i];
        }
      }
    },
  }
]);




// Import all of Bootstrap's JS
import Impressum from './Impressum.tsx'
import MemoPage from './MemosPage.tsx'
import memoDB from './scss/db.ts'
import AddMemo from './AddMemo.tsx'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>,
)
