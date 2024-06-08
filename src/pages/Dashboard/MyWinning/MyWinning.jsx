import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth/useAuth";

const MyWinning = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: winnings = [] } = useQuery({
        queryKey: ['userchart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/winner-user/${user?.email}`)
            return res.data;
           

        }
    });
    console.log('Chart data response:', winnings);
    return (
        <div>
 
         <div>
            <h2 className="text-xl text-center">Your Were Champion for: {winnings.length} times !!!</h2>
            {
                winnings.length > 1 && <h2 className="text-xl text-center text-green-900 font-extrabold"> We believe that you are Genius, Go ahead... !!!</h2>

            }
          
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>You were best among</th>
                         <th>Award Received</th>

                        </tr>
                    </thead>
                    <tbody>

                        {winnings.map((win, index) => <tr key={win._id}>
                            <td>{index+1}</td>
                            <td><div className="w-14 h-14">
                                <img src={win.image} alt="" />
                            </div></td>
                            <td>{win.contestName}</td>
                            <td>{win.contestName}</td>
                            <td>{win.tags}</td>
                            <td>{win.numberOfParticipants}</td>
                            <td>$ {win.prizeMoney}</td>

                            </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default MyWinning;