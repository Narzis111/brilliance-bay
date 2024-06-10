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

            const response = await axios.get(`https://final-project-server-snowy.vercel.app/contests/${id}`);
            setViews(response.data);
            console.log(response.data);

        };

        fetchDetails();
    }, [id]);


    const { contestName, contestPrice, prizeMoney, taskSubmissionInstructions, contestDeadline, image, numberOfParticipants, tags, contestDescription } = views || {};


    return (
        <div>
            <div>
            <div className="max-w-[780px] mx-auto mt-6 h-[300px] mb-3">
                        <img className="w-full h-full" src={image} alt={contestName} />
                    </div>
            </div>
           
                    
                    <div className="text-center space-y-3">

                        <h1 className="text-2xl font-bold">Title: {contestName}</h1>


                        <h1>Category: {tags}</h1>

                        <h1>Total Participants: {numberOfParticipants}</h1>


                        <p>Detail: {contestDescription}</p>
                        <p>Last Date: {contestDeadline}</p>
                        <p>Reward: Prizemoney: $ {prizeMoney}</p>
                        <p>Instruction: {taskSubmissionInstructions}</p>

                      
                         <hr />
      <div className='p-4 max-w-[400px] mx-auto'>
       
          <Button onClick={() => setIsOpen(true)} label={'Registration'} />
      
        </div>

      {/* Modal */}
      <BookingModal
        isOpen={isOpen}
        closeModal={closeModal}
        bookingInfo={{
          ...views,
          price: contestPrice,
          user_email: user?.email,
          user_name: user?.displayName,
          user_photo: user?.photoURL
         
        }}
      />
      <hr />
      <div className='p-4 flex items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>${contestPrice}</div>
      </div>
    </div>

            </div>
       
    );
};


export default Detail;