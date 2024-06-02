import useContest from "../../../hooks/useContest";
import ContestItem from "../../../components/ContestItem/ContestItem";

const Category = ({ searchTag }) => {
    const [contests, loading] = useContest(searchTag);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <div className="grid md:grid-cols-2 gap-2">
                {
                    contests.map(item => <ContestItem key={item._id} item={item}></ContestItem>)
                }
            </div>
        </section>
    );
};

export default Category;
