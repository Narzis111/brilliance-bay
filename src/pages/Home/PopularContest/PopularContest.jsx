import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useContest from "../../../hooks/useContest";
import ContestItem from "../../../components/ContestItem/ContestItem";
import { Link } from "react-router-dom";


const PopularContest = () => {
    const [contests] = useContest();

   
    const popular = contests.sort((a, b) => b.numberOfParticipants - a.numberOfParticipants);



    return (
        <section>
            <SectionTitle heading={"Popular Contest Section"}></SectionTitle>
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
