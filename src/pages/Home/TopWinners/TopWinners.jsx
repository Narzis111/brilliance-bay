import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Slider from "react-slick";
// Import slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TopWinners.css"; // Import custom CSS for additional styling if needed
import { Link } from "react-router-dom";
// import SectionTitle from "../../../components/SectionTitle/SectionTitle";

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };
    

    return (
        <div>
            <div className="relative">
                {/* Parallax advertising section */}
                <div className="featured-item bg-fixed bg-transparent pt-8 my-20">

                    <div className="max-w-[350PX] mx-auto">
                        <h1 className="text-3xl mb-4 text-orange-700 flex justify-around font-bold">JOIN US & WIN GIFTS</h1>
                    </div>

                    <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-60 pb-20 md:pt-12 md:px-36">
                        <div className="flex-1 flex justify-center mb-3">
                            <img src="https://i.ibb.co/GvksKpS/download-3.jpg" className="w-1/2 h-full object-cover" alt="" />

                        </div>
                        <div className="md:ml-10 flex-1">

                            {/* <p className="uppercase ">Where can i get some?</p> */}
                            <p className="bg-[#D1BCF9] md:rounded-full md:p-16">Engage in thrilling competitions that push the boundaries of your imagination and abilities.
                                Dive into a world of endless possibilities, where your talents are celebrated and rewarded.
                                Explore new horizons and challenge yourself to reach greater heights with every contest.
                                Immerse yourself in a vibrant community of creators and innovators, all striving for excellence.
                                Elevate your skills and showcase your unique perspective to a global audience.
                                Embrace the opportunity to stand out from the crowd and make your mark on the world.
                                Join a movement dedicated to empowering individuals to unleash their full potential through creativity and innovation.
                                <Link to='/register'><button className="btn btn-outline border-0 border-b-4">Register Now</button></Link>
                            </p>

                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-center mb-6">Top 3 Winners</h2>
            <p className="text-xl font-semibold text-center max-w-[700px] mx-auto mb-6 text-gray-700">Join our contests and you could be our next top winner! Showcase your talent and compete to win amazing prizes. Dont miss out on the fun and excitement!</p>
            <Slider {...settings}>
                {topWinners.slice(0, 3).map((winner, index) => (
                    <div key={winner._id} className="p-4">
                        <div className="flex justify-center border-2 border-blue-300 flex-row text-center items-center bg-white p-6 rounded-lg shadow-lg">
                            <div className="w-36 h-36 rounded-full mr-8">
                                <img src={winner.user_photo || 'https://i.ibb.co/XCGYmqS/users.jpg'} alt={`${winner.user_name}'s photo`} className="w-36 h-36 rounded-full mb-4" />

                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">{winner.user_name}</h3>
                                <p className="text-gray-700">{winner.user_email}</p>
                                <p className="text-lg font-semibold">Rank: {index + 1}</p>
                                <p className="text-gray-700">Number of Wins: {winner.count}</p>


                            </div> </div>


                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TopWinners;
