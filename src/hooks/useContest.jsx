import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useContest = (searchTag = "") => {
    const axiosPublic = useAxiosPublic();
    const { data: contests = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['contests', searchTag], 
        queryFn: async () => {
           console.log(`Fetching contests with tag: ${searchTag}`);
            const res = await axiosPublic.get(`/contests?tag=${searchTag}`);
            // const res = await axiosPublic.get(`/contests`, { params: { tag: searchTag } });
            return res.data;
        }
        
        
    });

    return [contests, loading, refetch];
}

export default useContest;
