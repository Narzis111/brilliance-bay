import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/banner1.jpg'
import img2 from '../../../assets/banner3.jpg'
import img3 from '../../../assets/banner2.jpeg'


const Banner = () => {
    return (
        <Carousel>
            <div className="max-h-[80vh]">
                <img className="max-h-[80vh]" src={img1} />
                <div className="absolute left-40 top-1/2 bg-white p-6 rounded-xl">
                   <h1 className="mb-4 text-xl font-semibold">
                   Unleash your creativity - ultimate platform for your innovative project contests and winner selection

 </h1>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search" />
                        <button className="badge badge-info">Search</button>
                    </label>
                </div>


            </div>
            <div className="max-h-[80vh]">
                <img  src={img2} />
                <div className="absolute bottom-40 left-80 ml-[200px]">
                    
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search" />
                        
                        <button className="badge badge-info">Search</button>
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
                        <input type="text" className="grow" placeholder="Search" />
                        <button className="badge badge-info">Search</button>
                    </label>
                </div>

            </div>
                    
        </Carousel>
    );
};

export default Banner;