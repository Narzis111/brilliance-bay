import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyParticipated = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${user?.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <h2 className="text-xl">Number of your participated Contest: {payments.length}</h2>

            <h4 className="text-3xl font-semibold">Your Upcoming Contests</h4>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Image</th>
                            <th>Title</th>
                            <th>Deadline</th>
                            <th>Action</th>
                            <th>Submission Status</th>

                        </tr>
                    </thead>
                    <tbody>

                        {payments.map((payment) => <tr key={payment._id}>
                            <td><div className="w-14 h-14">
                                <img src={payment.image} alt="" />
                            </div></td>
                            <td>{payment.contestName}</td>
                            <td>{payment.contestDeadline}</td>

                            <td>
                                {
                                    // new Date(payment.contestDeadline) > new Date() ?
                                        <Link to={`/dashboard/my-submit/${payment?._id}`}>
                                            <button className="bg-purple-200 p-2 rounde">Submit Task</button>
                                        </Link> 
                                        // <><button disabled={true} className="cursor-not-allowed">Submit Task</button></>
                                }

                            </td>
                            <td>{payment?.review_status ? payment?.review_status : 'Yet to Submit'} </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParticipated;