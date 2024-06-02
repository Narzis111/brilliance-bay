// import { Helmet } from "react-helmet-async";
// import Banner from "./Banner/Banner";
// import Category from "./Category/Category";
// import Featured from "./Featured/Featured";
// import PopularContest from "./PopularContest/PopularContest";
// import Testimonials from "./Testimonials/Testimonials";


// const Home = () => {
//     return (
//         <div>
//             <Helmet>
//                 <title>BrillianceBay|Home</title>
//             </Helmet>
        
//         <Banner></Banner>
//         <Category></Category>
//         <PopularContest></PopularContest>
//         {/* <Featured></Featured> */}
//         {/* <Testimonials></Testimonials> */}
//         </div>
//     );
// };

// export default Home;
import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import PopularContest from "./PopularContest/PopularContest";
import { useState } from "react";
const Home = () => {
    const [searchTag, setSearchTag] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = () => {
        setSearchTag(searchInput.trim());
      
    };

    return (
        <div>
            <Helmet>
                <title>BrillianceBay | Home</title>
            </Helmet>
        
            <Banner>
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button className="badge badge-info" onClick={handleSearch}>
                        Search
                    </button>
                </label>
            </Banner>
            <Category searchTag={searchTag} />
            <PopularContest />
        </div>
    );
};

export default Home;
