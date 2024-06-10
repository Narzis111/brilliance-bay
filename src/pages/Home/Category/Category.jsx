
import useContest from '../../../hooks/useContest';
import ContestItem from '../../../components/ContestItem/ContestItem';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

const Category = ({ searchTag }) => {
    const [contests, loading] = useContest(searchTag);

    return (
        <section>
          <SectionTitle heading={"Contests by Searching"}></SectionTitle>
         
         <h2 className="text-xl max-w-[700px] mx-auto font-semibold text-center mb-4">Search and explore a variety of engaging contests tailored to your interests. Participate and showcase your skills in our featured competitions. </h2> 
            <div className="grid md:grid-cols-2 gap-2">
                {loading && <LoadingSpinner></LoadingSpinner>}
                {!loading && contests.slice(0,6).map(item => (
                    <ContestItem key={item._id} item={item}></ContestItem>
                ))}
            </div>
        </section>
    );
};

export default Category;
