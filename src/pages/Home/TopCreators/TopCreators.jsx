import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const TopCreators = () => {
    const axiosSecure = useAxiosSecure();

    const { data: topCreators = [], isLoading, error } = useQuery({
        queryKey: ['topCreators'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/top-creators');
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error fetching top creators: {error.message}</div>;

    return (
        <div>
            <h2 className="text-xl font-semibold text-center">Top 3 Creators</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Photo</th>
                            <th>Creator Email</th>
                            <th>Creator Name</th>
                            <th>Total Participants</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topCreators.map((creator, index) => (
                            <tr key={creator._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={creator.photoURL} alt={`${creator.creator_name}'s photo`} className="w-10 h-10 rounded-full" />
                                </td>
                                <td>{creator.creator_email}</td>
                                <td>{creator.creator_name}</td>
                                <td>{creator.totalParticipants}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopCreators;
