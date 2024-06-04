import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
// import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
// import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";

import ErrorPage from "../components/ErrorPage/ErrorPage";
import Detail from "../components/Detail/Detail";
import AllContests from "../pages/AllContents/AllContests";
import MyCreatedContest from "../pages/Dashboard/Creator/MyCreatedContest/MyCreatedContest";
import ContestSubmitted from "../pages/Dashboard/Creator/ContestSubmitted/ContestSubmitted";
import AddContest from "../pages/Dashboard/Creator/AddContest/AddContest";
import Profile from "../pages/Dashboard/Profile";
import CreatorRoute from "./CreatorRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },

      {
        path: "/contests/:id",
        element: <PrivateRoute><Detail></Detail></PrivateRoute> 
      },
      {
        path: "/all-contests",
        element: <AllContests></AllContests>
      },
      {
        path: "/order/:category",
        element: <Order></Order>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },

    ]
  },
  // new r 1ta layout
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    //       children: [
    //         // all users common routes
    //         {
    //           path: 'userHome',
    //           
    //         },
    //         {
    //           path: 'cart',
    //           element: <Cart></Cart>
    //         },
           
    //         {
    //           path: 'paymentHistory',
    //           element: <PaymentHistory></PaymentHistory>
    //         }, 
    //         // only creator routes =======================

    //         {
    //           path: 'addContest',
    //           element:<AddContest></AddContest>
    //         },
    //         {
    //           path: 'myCreated',
    //           element:<MyCreatedContest></MyCreatedContest> 
    //         },
    //         {
    //           path: 'submitted',
    //           element:<ContestSubmitted></ContestSubmitted> 
    //         },
    // // =============================
    //         // only admin routes
    //         {
    //           path: 'adminHome',
    //           element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
    //         },


    //       ]
    children: [
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute> 
      },
      {
        path: 'payment',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      },

      // creator
      {
        path: 'addContest',
        element: <PrivateRoute><CreatorRoute><AddContest></AddContest></CreatorRoute></PrivateRoute>
      },
      {
        path: 'myCreated',
        element: <PrivateRoute><CreatorRoute><MyCreatedContest></MyCreatedContest></CreatorRoute></PrivateRoute>  
      },
      {
        path: 'submitted',
        element: <PrivateRoute><CreatorRoute><ContestSubmitted></ContestSubmitted></CreatorRoute></PrivateRoute>
      },
     
      // Admin
      {
        path: 'manage-users',
        element:<PrivateRoute><AdminRoute><AllUsers></AllUsers></AdminRoute></PrivateRoute>
      },
      
      {
        path: 'manageItems',
        element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
      },
      {
        path: 'updateItem/:id',
        element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
      },

    ],
  }
]);

export default router;