
import useContest from '../../../hooks/useContest';
import ContestItem from '../../../components/ContestItem/ContestItem';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = ({ searchTag }) => {
    const [contests, loading] = useContest(searchTag);

    return (
        <section>
          <SectionTitle heading={"Contests by Searching"}></SectionTitle>
            
            <div className="grid md:grid-cols-2 gap-2">
                {loading && <p>Loading...</p>}
                {!loading && contests.map(item => (
                    <ContestItem key={item._id} item={item}></ContestItem>
                ))}
            </div>
        </section>
    );
};

export default Category;
