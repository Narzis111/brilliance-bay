import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaRegEdit } from "react-icons/fa";
import { Fade, Zoom } from "react-awesome-reveal";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";


const AllContests = () => {


  const [selectedTags, setselectedTags] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  // data fetch

  const axiosPublic = useAxiosPublic();
  const { data: contents = [], isLoading } = useQuery({
    queryKey: ['contents'],
    queryFn: async () => {

      const res = await axiosPublic.get(`/allAccepted`);
      console.log(res.data.length);
      console.log(contents);
      return res.data;

    }
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>



  // Calculate index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter assignments based on selected difficulty
  const filteredContents = selectedTags === "all"
    ? contents
    : contents.filter(content => content.tags === selectedTags);

  // Slice the filteredContents 
  const currentContents = filteredContents.slice(indexOfFirstItem, indexOfLastItem);
  const handlePerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page 
  };




  return (
    <>
      <Helmet>
        <title>Accepted Contests</title>
      </Helmet>
      <div>
        <div className="mt-5 mb-8">
          <p className="text-center text-3xl font-semibold">
            <span className="mr-3 text-[#FF497C]">
              <i className="bx bxs-alarm-add"></i>
            </span>
            <span className="dark:text-white">All of our verified Contests </span>
          </p>
          <h1 className="text-xs text-center">total data:{contents.length}</h1>
        </div>
      </div>


     
      <div>
        <motion.div className="text-center"
          animate={{
            scale: [1, 1, 1, 1, 1],
            rotate: [0, 0, 360, 360, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
        >
          {/* Content to animate */}
          <h1> Discover Our all Contests</h1>
        </motion.div>
        <Zoom>
          <h2 className="text-center lg:text-3xl text-xl font-bold hover:animate-heartBeat-2s transition-transform">

            <span className="text-xs">number of total contests: {contents.length}</span>
          </h2>
        </Zoom>
        <Fade>
          <p className="max-w-[750px] hover:animate-flash-2s text-center mx-auto py-6">
            Our all contests page is your gateway to discovering the rich array of tools and resources available to enhance and showcase your creativity experience.
          </p>
        </Fade>
      </div>

      <div>
      <h2 className="text-center mb-3 lg:text-3xl text-xl font-bold hover:animate-heartBeat-2s transition-transform">
Select your desired category here 
</h2>
        <div className="flex justify-center mb-4">

          <select
            className="bg-purple-500 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={selectedTags}
            onChange={(e) => setselectedTags(e.target.value)}
          >
            <option value="all">All Tags</option>
            <option value="Image Design Contests">Image Design Contests</option>
            <option value="Article Writing">Article Writing</option>
            <option value="Marketing Strategy">Marketing Strategy</option>
            <option value="Digital advertisement Contests">Digital advertisement Contests</option>
            <option value="Gaming Review">Gaming Review</option>
            <option value="Book Review">Book Review</option>
            <option value="Business Idea Concerts">Business Idea Concerts</option>
            <option value="Movie Review">Movie Review</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {currentContents.map((contest) => (
            <div key={contest._id}>
              <motion.div className="text-center"
                animate={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 360, 360, 0],
                  borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
              >
                {/* Content to animate */}
                <div className="card bg-base-100 h-96 shadow-xl border-2 border-slate-300 hover:border-primary">
                  <div className="max-h-[190px] relative  p-4">
                    <img className='w-full h-full object-fit hover:scale-105' src={contest.image} alt="Item" />
                    <div><p className="text-xs absolute top-6 right-4 bg-blue-200">Created by: <span className='font-bold'> {contest.creator_email}</span></p></div>
                  </div>
                  <div className="flex justify-between w-full p-4">
                    <div className='space-y-2'>
                      <h2 className="card-title hover:underline text-sm"> {contest.contestName}</h2>


                      <h2 className="card-title hover:underline"></h2>
                      <div className="flex justify-between text-xs">
                        <div className="badge bg-purple-300 hover:bg-purple-600">Category: {contest.tags}</div>
 
                      </div>

                      <div className="card-actions justify-center">
                        <div className="join space-x-3">
                          <Link to={`/contests/${contest._id}`}>
                            <button className="btn w-full"> <FaRegEdit className="text-2xl font-bold" />Detail</button>
                          </Link>
                           </div>

                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>


            </div>
          ))}
        </div>
      </div>
 

      {/* Pagination controls */ }
      < div className = "flex justify-center mt-4" >
        <select
          className="bg-white border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          value={itemsPerPage}
          onChange={handlePerPageChange}
        >
          <option value={2}>2 per page</option>
          <option value={4}>4 per page</option>
          <option value={5}>5 per page</option>
        </select>
            </div >

  {/* Pagination display */ }
  < div className = "flex justify-center mt-4" >
    <span className="mr-2">Page:</span>
{
  Array.from({ length: Math.ceil(filteredContents.length / itemsPerPage) }, (_, index) => (
    <button
      key={index}
      className={`px-2 py-1 mx-1 rounded-md hover:bg-gray-200 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}
      onClick={() => setCurrentPage(index + 1)}
    >
      {index + 1}
    </button>
  ))
}


        </div>
        </>
    );
};

export default AllContests;
