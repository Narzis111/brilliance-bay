import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth/useAuth";

const CreatorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isCreator, isCreatorLoading] = useAdmin();
    const location = useLocation();

    if (loading || isCreatorLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isCreator) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default CreatorRoute;