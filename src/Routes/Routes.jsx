import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Detail from "../components/Detail/Detail";
import AllContests from "../pages/AllContents/AllContests";
import MyCreatedContest from "../pages/Dashboard/Creator/MyCreatedContest/MyCreatedContest";
import ContestSubmitted from "../pages/Dashboard/Creator/ContestSubmitted/ContestSubmitted";
import AddContest from "../pages/Dashboard/Creator/AddContest/AddContest";
import Profile from "../pages/Dashboard/Profile";
import CreatorRoute from "./CreatorRoute";
import ManageContest from "../pages/Dashboard/ManageContest/ManageContest";
import MyParticipated from "../pages/Dashboard/User/MyParticipated/MyParticipated";
import SubmitTask from "../pages/Dashboard/User/SubmitTask/SubmitTask";
import MyWinning from "../pages/Dashboard/MyWinning/MyWinning";
import UserHome from "../pages/Dashboard/UserHome/UserHome";


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
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute> 
      },
      
      {
        path: 'my-booking',
        element: <PrivateRoute><MyParticipated></MyParticipated></PrivateRoute>
      },
      {
        path: 'my-winning',
        element: <PrivateRoute><MyWinning></MyWinning></PrivateRoute>
      },
      {
        path: 'my-submit/:id',
        element: <PrivateRoute><SubmitTask></SubmitTask></PrivateRoute>,
      },

      // creator
      {
        path: 'addContest',
        element: <PrivateRoute><CreatorRoute><AddContest></AddContest></CreatorRoute></PrivateRoute>
      },
  
      {
        path: 'updateContest/:id',
        element:<CreatorRoute><UpdateItem></UpdateItem></CreatorRoute>,
        loader: ({params}) => fetch(`https://final-project-server-snowy.vercel.app/contests/${params.id}`)
      },
      {
        path: 'myCreated',
        element: <PrivateRoute><CreatorRoute><MyCreatedContest></MyCreatedContest></CreatorRoute></PrivateRoute>  
      },
      {
        path: 'submitted',
        element: <PrivateRoute><CreatorRoute><ContestSubmitted></ContestSubmitted></CreatorRoute></PrivateRoute>,
      },
     
      // Admin
      {
        path: 'manage-users',
        element:<PrivateRoute><AdminRoute><AllUsers></AllUsers></AdminRoute></PrivateRoute>
      },
      
      {
        path: 'manageContests',
        element:<AdminRoute><ManageContest></ManageContest></AdminRoute>
      },
   

    ],
  }
]);

export default router;

// https://final-project-server-snowy.vercel.app
// http://localhost:5000