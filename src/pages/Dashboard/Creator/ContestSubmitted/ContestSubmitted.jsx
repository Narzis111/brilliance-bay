import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import Iframe from "react-iframe";
import { PiFileMagnifyingGlass } from "react-icons/pi";
import { toast } from "react-toastify";

const ContestSubmitted = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [showPreview, setShowPreview] = useState(false);

    const handleEyeClick = () => {
        setShowPreview(true);
    };

    const handleClosePreview = () => {
        setShowPreview(false);
    };

    // Fetch Data
    const {
        data: bookings = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['myContestSubmitted', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/myContestSubmitted/${user?.email}`);
            return data;
        },
    });

    const { mutateAsync } = useMutation({
        mutationFn: async ({ id, review_status, contestName }) => {
            const payload = contestName ? { review_status, contestName } : { review_status };
            const { data } = await axiosSecure.patch(`/contests-winner/${id}`, payload);
            return data;
        },
        onSuccess: () => {
            refetch();
            toast.success('Review status updated successfully!');
        },
        onError: (err) => {
            toast.error(`Error: ${err.response?.data || err.message}`);
        }
    });

    const handleDropdownSelect = async (id, reviewStatus, contestName) => {
        try {
            const payload = reviewStatus === 'Winner' ? { review_status: reviewStatus, contestName } : { review_status: reviewStatus };
            await mutateAsync({ id, ...payload });
        } catch (err) {
            console.error(err);
            toast.error(`Error: ${err.response?.data || err.message}`);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <h2 className="text-xl font-semibold text-center">Number of Submission against your Created Contest: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Submitted By</th>
                            <th>Submitted Document</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>
                                    <div className="w-14 h-14">
                                        <img src={booking.image} alt="" />
                                    </div>
                                </td>
                                <td>{booking.contestName}</td>
                                <td>{booking.user_email}</td>
                                <td>
                                    <button className="ml-6 bg-purple-200" onClick={handleEyeClick}>
                                        <PiFileMagnifyingGlass className="text-2xl text-purple-700"></PiFileMagnifyingGlass>
                                    </button>
                                    {showPreview && (
                                        <div className="preview-overlay" onClick={handleClosePreview}>
                                            <div className="preview-container">
                                                <Iframe title="Document Preview" src={booking.submit_doc} width="100%" height="100%" />
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <details className="dropdown">
                                        <summary className="m-1 btn">Marking</summary>
                                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                            <li>
                                                <a onClick={() => handleDropdownSelect(booking._id, 'Winner', booking.contestName)}>Winner</a>
                                            </li>
                                            <li>
                                                <a onClick={() => handleDropdownSelect(booking._id, 'Unsuccessful')}>Unsuccessful</a>
                                            </li>
                                        </ul>
                                    </details>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContestSubmitted;
