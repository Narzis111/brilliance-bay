import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const TopWinners = () => {
    const axiosSecure = useAxiosSecure();

    const { data: topWinners = [], isLoading, error } = useQuery({
        queryKey: ['topWinners'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/top-winners');
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error fetching top winners: {error.message}</div>;

    return (
        <div>
            <h2 className="text-xl font-semibold text-center">Top 3 Winners</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Photo</th>
                            <th>User Email</th>
                            <th>User Name</th>
                            <th>Number of Wins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topWinners.map((winner, index) => (
                            <tr key={winner._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={winner.photoURL} alt={`${winner.user_name}'s photo`} className="w-10 h-10 rounded-full" />
                                </td>
                                <td>{winner.user_email}</td>
                                <td>{winner.user_name}</td>
                                <td>{winner.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopWinners;
