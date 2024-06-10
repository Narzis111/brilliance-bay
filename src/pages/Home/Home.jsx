
import { Helmet } from "react-helmet-async";
import Category from "./Category/Category";
import PopularContest from "./PopularContest/PopularContest";
import { useState } from "react";
import img1 from '../../assets/banner1.jpg'
import img2 from '../../assets/banner3.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Advertising from "./Advertising/Advertising";
import BestCreator from "./BestCreator/BestCreator";
const Home = () => {
    const [searchTag, setSearchTag] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = () => {
        setSearchTag(searchInput);
        console.log(searchInput);
    };

    return (
        <div>
            <Helmet>
                <title>BrillianceBay | Home</title>
            </Helmet>
            <Carousel>
                <div className="h-[80vh]">
                    <img className="h-full" src="https://i.ibb.co/xhP6BBx/1-J4-ZQJr-Y2-Qmqk-FGs-ERT7-Qa-Q.png" />
                    <div className="hidden md:block absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white p-6 rounded-xl">
                        <h1 className="mb-4 text-xl font-semibold">
                            From design competitions to coding challenges, destination for creating and participating in contests
                        </h1>
                        <div className="w-[400px] mx-auto">
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="text"

                                    className="grow"
                                    placeholder="Search with Tags"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                                <button className="badge bg-purple-500 badge-info" onClick={handleSearch}>
                                    Search
                                </button>
                            </label>
                        </div>

                    </div>

                </div>

                <div className="h-[80vh]">
                    <img className="h-full" src={img1} />
                    <div className="hidden md:block absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white p-6 rounded-xl">
                        <h1 className="mb-4 text-xl font-semibold">
                            Join the excitement at ContestHub, your hub for dynamic contest creation and participation
                        </h1>
                        <div className="w-[400px] mx-auto">
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="text"

                                    className="grow"
                                    placeholder="Search with Tags"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                                <button className="badge bg-purple-500 badge-info" onClick={handleSearch}>
                                    Search
                                </button>
                            </label>
                        </div>
                    </div>

                </div>

                <div className="h-[80vh]">
                    <img className="h-full" src={img2} />
                    <div className="hidden md:block absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">

                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"

                                className="grow"
                                placeholder="Search with Tags"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button className="badge bg-purple-500 badge-info" onClick={handleSearch}>
                                Search
                            </button>
                        </label>
                    </div>

                </div>

            </Carousel>
            <label className="md:hidden absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 input input-bordered flex items-center gap-2">
                <input
                    type="text"

                    className="grow"
                    placeholder="Search with Tags"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className="badge bg-purple-500 badge-info" onClick={handleSearch}>
                    Search
                </button>
            </label>

            <Category searchTag={searchTag} />
            <PopularContest searchTag={searchTag} />
            <Advertising />
            <BestCreator />
        </div>
    );
};

export default Home;
