import { createBrowserRouter  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";

import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import CreatorRoute from "./CreatorRoute";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Detail from "../components/Detail/Detail";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
            index: true,
            element: <Home></Home>
        },
      
        {
          path: "/order/:category",
            element: <Order></Order>
        },
        {
          path: "/contests/:id",
            element: <Detail></Detail>
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
      children: [
        // all users common routes
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path: 'cart',
          element: <Cart></Cart>
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        }, 
        // only creator routes =======================
        {
          path: 'creatorHome',
          element: <CreatorRoute><AdminHome></AdminHome></CreatorRoute>
        },
        {
          path: 'addItems',
          element:<CreatorRoute><AddItems></AddItems></CreatorRoute>
        },
        {
          path: 'users',
          element:<CreatorRoute><AllUsers></AllUsers></CreatorRoute> 
        },
// =============================
        // only admin routes
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'users',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute> 
        },
        // {
        //   path: 'addItems',
        //   element:<AdminRoute><AddItems></AddItems></AdminRoute>
        // },
        {
          path: 'manageItems',
          element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
        },
        {
          path: 'updateItem/:id',
          element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
        },
       
      ]
    }
  ]);

  export default router;