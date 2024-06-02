import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

import "swiper/css/navigation";
const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setReviews(data)})
    }, [])
    return (
        <section>
          <SectionTitle
          subHeading={"What Our Client Say"}
          heading={"Testimonials"}></SectionTitle> 
        <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                       <div className="flex flex-col items-center my-10 mx-24"> 
                       <Rating style={{ maxWidth: 150 }} value={review.rating} readOnly />
                       <i className="text-7xl mt-5 fa-solid fa-quote-left" />
                        <p className="py-8">{review.details}</p>
                            <h3 className="text-2xl text-orange-400">{review.name}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
    );
};

export default Testimonials;