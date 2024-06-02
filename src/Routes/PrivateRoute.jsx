
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth/useAuth';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();


    if (loading) {
        return <progress className="progress w-56"></progress>
           
    }
    if (!user) { 
        
        return <Navigate to="/login" state={{from: location}}></Navigate>
    }


    return children;
    
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node,
    }
