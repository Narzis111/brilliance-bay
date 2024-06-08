import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth/useAuth";

const axiosSecure =  axios.create({
    baseURL: 'https://final-project-server-snowy.vercel.app'
})
const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { logOut } = useAuth();

       // request interceptor to add authorization header for every secure call to teh api
       axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    // intercepts 401 and 403 status
    // axiosSecure.interceptors.response.use(function (response) {
    //     return response;
    // }, async (error) => {
    //     const status = error.response.status;
    //     console.log('status error in the interceptor', status);
    //     // for 401 or 403 logout the user and move the user to the login
    //     if (status === 401 || status === 403) {
    //         await logOut();
    //         navigate('/login');
    //     }
    //     return Promise.reject(error);
    // })
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            const status = error.response.status;
            console.log('status error in the interceptor', status);
            // for 401 or 403 logout the user and move the user to the login
            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error setting up the request:', error.message);
        }
        return Promise.reject(error);
    });
    return axiosSecure;
};

export default useAxiosSecure;


