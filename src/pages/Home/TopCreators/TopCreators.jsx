import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './TopCreators.css'; // Import custom CSS for additional styling if needed

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
        <div className="top-creators-container mb-20">
            <h2 className="text-xl font-semibold text-center mb-4">Get to know the brilliant minds behind our most successful contests. Explore contests created by our top-rated creators and see why they stand out.</h2>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {topCreators.slice(0, 3).map((creator) => (
                    <SwiperSlide key={creator._id}>
                        <div className="flex flex-col items-center mb-20">
                            <img src={creator.creator_photo || 'https://i.ibb.co/dpC1GPq/profile-3.jpg'} alt={`${creator.creator_name}'s photo`} className="w-20 h-20 rounded-full mb-4" />
                            <h3 className="text-lg font-semibold">{creator.creator_email}</h3>
                            <p>Total Participants: {creator.totalParticipants}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopCreators;
