import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useContest = (searchTag = "") => {
    const axiosPublic = useAxiosPublic();
    const { data: contests = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['contests', searchTag], 
        queryFn: async () => {
           
            const res = await axiosPublic.get(`/contests`, { params: { tag: searchTag } });
            return res.data;
        }
        
        
    });
console.log(`Fetching contests with tag: ${searchTag}`);
    return [contests, loading, refetch];
}

export default useContest;
