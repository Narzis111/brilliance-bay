import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import errorimg from "../../assets/404.gif";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>
        BrillianceBay|Error
        </title>
      </Helmet>
      <section className='bg-white '>
        <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
          <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
            <div className=""><img className="w-full h-full" src={errorimg} alt="" /></div>
            <h1 className='mt-3 text-2xl font-bold text-gray-800  md:text-6xl'>
              404
            </h1>
            <h1 className='mt-3 text-2xl font-semibold text-gray-800 md:text-3xl'>
              Something Went Wrong!
            </h1>
            <p className='mt-4 text-gray-500'>Back to Home:</p>

            <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>


              <button className="bg-blue-600 px-6 py-2 text-white rounded-xl" onClick={() => navigate('/')}> Home</button>
            </div>
          </div>
        </div>
      </section>

    </>
  )
};

export default ErrorPage;


