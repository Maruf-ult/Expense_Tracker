import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import Home from './components/Home/Home';
import Transactions from './components/Transactions/Transactions';
import Login from './components/Login/Login';
import Incomes from './components/Incomes/Incomes';
import Summary from './components/Summary/Summary';
import Errorpage from './components/Errorpage/Errorpage';
import Expenses from './components/Expenses/Expenses';
import SignUp from './SignUp';

const router = createBrowserRouter([

  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path:"/login",
    element:<Login></Login>
  },
  {
    path:"/signup",
    element:<SignUp></SignUp>
  },
  {
    path:"/home",
    element:<Home></Home>,
    errorElement:<Errorpage></Errorpage>,
    children:[
      {
        path:"/home/transaction",
        element:<Transactions></Transactions>
      },
      {
        path:"/home",
        
        element:<Transactions></Transactions>
      },
      {
        path:"/home/incomes",
        element:<Incomes></Incomes>
      },
      {
        path:"/home/expenses",
        element:<Expenses></Expenses>
      },
      {
        path:"/home/summary",
        element:<Summary></Summary>
      },
      // {
      //   path:"/home/logout",
      //   element:<Logout></Logout>
      // }
    ]
  }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
