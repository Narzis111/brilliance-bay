import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';

const useAuth = () => {

    const all = useContext(AuthContext);
    return all;
};

export default useAuth;