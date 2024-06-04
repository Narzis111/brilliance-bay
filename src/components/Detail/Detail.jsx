import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BookingModal from "../BookingModal/BookingModal";
import Button from "../Button/Button";
import useAuth from "../../hooks/useAuth/useAuth";
// import { Zoom } from "react-awesome-reveal";

const Detail = () => {
    const { id } = useParams();
    const {user} = useAuth();

    const [isOpen, setIsOpen] = useState(false)
    const [views, setViews] = useState(null);
    
  const closeModal = () => {
    setIsOpen(false)
  }



    useEffect(() => {
        const fetchDetails = async () => {

            const response = await axios.get(`http://localhost:5000/contests/${id}`);
            setViews(response.data);
            console.log(response.data);

        };

        fetchDetails();
    }, [id]);


    const { _id, contestName, contestPrice, prizeMoney, taskSubmissionInstructions, contestDeadline, image, numberOfParticipants, tags, contestDescription } = views || {};


    return (
        <div>
            <div>
            </div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-[320px] h-[300px]">
                        <img className="w-full h-full" src={image} alt={contestName} />
                    </div>
                    <div className="space-y-6 ml-4">

                        <h1 className="text-2xl font-bold">Title: {contestName}</h1>


                        <h1>Category: {tags}</h1>

                        <h1>Total Participants: {numberOfParticipants}</h1>


                        <p>Detail: {contestDescription}</p>
                        <p>Date: {contestDeadline}</p>
                        <p>Reward: {prizeMoney}</p>
                        <p>Instruction: {taskSubmissionInstructions}</p>

                      
                         <hr />
      <div className='p-4'>
        <Button onClick={() => setIsOpen(true)} label={'Registration'} />
      </div>

      {/* Modal */}
      <BookingModal
        isOpen={isOpen}
        closeModal={closeModal}
        bookingInfo={{
          ...views,
          price: contestPrice,
          user: { name: user?.displayName },
        }}
      />
      <hr />
      <div className='p-4 flex items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>${contestPrice}</div>
      </div>
    </div>

                    </div>
                </div>
            </div>
       
    );
};


export default Detail;