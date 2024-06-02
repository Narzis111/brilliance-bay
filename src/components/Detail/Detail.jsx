import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
// import { Zoom } from "react-awesome-reveal";

const Detail = () => {
    const { id } = useParams();

    const [views, setViews] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {

            const response = await axios.get(`http://localhost:5000/contests/${id}`);
            setViews(response.data);
            console.log(response.data);

        };

        fetchDetails();
    }, [id]);


    const { _id, contestName, contestPrice, prizeMoney, taskSubmissionInstructions, contestDeadline, image, numberOfParticipants, tags, contestDescription } = views || {};
    const { user } = useAuth() || {};

    // const handleTake = (_id, creator_email) => {
    //     console.log(_id);
    //     console.log(creator_email);
    // };

    return (
        <div>
            <div>
                         </div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-[320px] h-[300px]">
                        <img className="w-full h-full" src={image} alt={contestName} />
                    </div>
                    <div  className="space-y-6 ml-4">
                        
                            <h1 className="text-2xl font-bold">Title: {contestName}</h1>
                       
                        
                            <h1>Category: {tags}</h1>
                        
                            <h1>Total Participants: {numberOfParticipants}</h1>
                    
                       
                            <p>Detail: {contestDescription}</p>
                            <p>Detail: {contestDeadline}</p>
                            <p>Detail: {prizeMoney}</p>
                       
                        
                            <p>Date: {taskSubmissionInstructions}</p>
                      
                        {/* {user?.email !== creator_email && ( */}
                        {user?.email && (
                            <Link to={`/take/${_id}`}>
                                <button className="btn btn-primary text-white mt-3">Take Assignment</button>
                            </Link>
                        ) }
                        
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Detail;