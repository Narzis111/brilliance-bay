import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();

  // navigation systems
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSocialLogin = (socialProvider) => {
    socialProvider().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName
      }
      axiosPublic.post('/users', userInfo)
        .then(res => {
          console.log(res.data);
          Swal.fire({
            title: 'User Login Successful.',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
          navigate(from);
        })

    });
  };
  return (
    <>

      <div className="divider"><strong>Sign in with</strong></div>
      <div className="p-2 text-center flex justify-center">
        <button onClick={() => handleSocialLogin(googleLogin)} type="button" className="hover:bg-[#4285F4]/90 focus:ring-2 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center flex justify-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
        <img className="w-12 h-12" src="https://i.ibb.co/rw9hKnD/Logo-google-icon-PNG.png
" alt="" />
        </button>
        
      </div>

    </>
  );
};

export default SocialLogin;