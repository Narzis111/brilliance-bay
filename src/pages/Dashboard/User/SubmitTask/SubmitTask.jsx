import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth/useAuth";
import { Zoom } from "react-awesome-reveal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const SubmitTask = () => {
    const { user } = useAuth() || {};
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const [updates, setUpdates] = useState({});
    const url = `https://final-project-server-snowy.vercel.app/booking/${id}`;

    useEffect(() => {
        axios(url)
            .then(res => {
                console.log(res.data);
                setUpdates(res.data)
            })
    }, [url]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const doc = e.target.doc.value;
        const review_status = 'Pending';

        const submit = {
            submit_doc: doc,
            review_status
        };

        console.log(submit);
      
        try {
            const { data } = await axiosSecure.patch(`/booking/taskview/${id}`, submit);
            console.log(data);
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Task Submitted Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
            }
        } catch (error) {
            console.error("Error submitting task:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to submit task. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Submit Task</title>
            </Helmet>
            <div>
                <Zoom>
                    <h2 className="text-center lg:text-3xl text-xl font-bold hover:animate-heartBeat-2s transition-transform mt-24 mb-4">
                        Submit Your Task Here!
                    </h2>
                </Zoom>
                <h2 className="text-center">Title: {updates.contestName}</h2>
                <h2 className="text-center">Category: {updates.tags}</h2>

                <form onSubmit={handleSubmit} className="max-w-[450px] mx-auto">
                    <div className="flex gap-6">
                        <div className="form-control">
                            <label className="block mt-4 mb-2 dark:text-white">
                                <span className="label-text">Examinee Name</span>
                            </label>
                            <input type="text" defaultValue={user?.email} disabled name="examineeName" className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="block mt-4 mb-2 dark:text-white" htmlFor="Document Link">
                                Your Document Link
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#92b0e7]"
                                placeholder="Insert pdf/image Doc"
                                id="doc"
                                name="doc"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control mt-3">
                        <input className="btn btn-primary btn-block mb-6" type="submit" value="Submit Confirm" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default SubmitTask;
