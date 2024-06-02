import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth/useAuth';

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    // tan stack query {install diye main routes a wrap korbo autoprovider er moto}
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data
        }


    })
    return [cart, refetch]
};

export default useCart;