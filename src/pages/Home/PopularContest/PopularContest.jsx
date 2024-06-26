import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import ContestItem from "../../../components/ContestItem/ContestItem";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";


const PopularContest = () => {
    const axiosPublic = useAxiosPublic();
    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['contests'], 
        queryFn: async () => {
           
            const res = await axiosPublic.get(`/allcontest-popular`);
            
            return res.data;
        }
        
        
    });
    if (isLoading) return <LoadingSpinner></LoadingSpinner>


   
    const popular = contests.sort((a, b) => b.numberOfParticipants - a.numberOfParticipants);



    return (
        <section>
            <SectionTitle heading={"Popular Contest Section"}></SectionTitle>
            <h2 className="text-xl max-w-[700px] mx-auto font-semibold text-center mb-4">
            Check out our most popular contests that have captivated the attention of numerous participants. Join the fun and compete in our top-rated challenges.
            </h2>
            <div className="grid md:grid-cols-2 gap-2">
                {
                    popular.slice(0, 5).map(item => (
                        <ContestItem key={item._id} item={item}></ContestItem>
                    ))
                }
            </div>
            <Link to={`/all-contests`}>
                <button className="w-full my-3 bg-purple-400">Show All</button>
        </Link>
        </section>
    );
};

export default PopularContest;
