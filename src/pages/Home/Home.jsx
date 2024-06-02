
import { Helmet } from "react-helmet-async";
import Category from "./Category/Category";
import PopularContest from "./PopularContest/PopularContest";
import { useState } from "react";
import img1 from '../../assets/banner1.jpg'
import img2 from '../../assets/banner3.jpg'
import img3 from '../../assets/banner2.jpeg'
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
            <div className="max-h-[80vh]">
                <img className="max-h-[80vh]" src={img1} />
                <div className="absolute left-40 top-1/2 bg-white p-6 rounded-xl">
                    <h1 className="mb-4 text-xl font-semibold">
                        Unleash your creativity - ultimate platform for your innovative project contests and winner selection

                    </h1>
                    <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        
                        className="grow"
                        placeholder="Search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button className="badge bg-purple-500 badge-info" onClick={handleSearch}>
                        Search
                    </button>
                </label>
                    
                </div>


            </div>
            <div className="max-h-[80vh]">
                <img src={img2} />
                <div className="absolute bottom-40 left-80 ml-[200px]">

                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        
                        className="grow"
                        placeholder="Search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button className="badge bg-purple-500 badge-info" onClick={handleSearch}>
                        Search
                    </button>
                </label>
                </div>

            </div>
            <div>
                <img src={img3} />
                <div className="absolute left-40 top-1/2 bg-white p-6 rounded-xl">
                    <h1 className="mb-4 text-xl font-semibold">
                        From design competitions to coding challenges, destination for creating and participating in contests
                    </h1>
                    <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        
                        className="grow"
                        placeholder="Search"
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
     
            <Category searchTag={searchTag} />
            <PopularContest searchTag={searchTag} />
            <Advertising />
            <BestCreator />
        </div>
    );
};

export default Home;
