
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth/useAuth";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useAuth();

  const { register, handleSubmit, reset, formState: { errors }, } = useForm();

  // navigation systems
  const navigate = useNavigate();

  const onSubmit = data => {
    console.log(data);
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email
            }
            console.log(userInfo);
            axiosPublic.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  console.log('user added to the database')
                  reset();
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/');
                }
              })


          })
          .catch(error => console.log(error))
      })
  };



  // Image URL validation
  //   const urlPattern = /^(https?):\/\/.*$/i;
  //   if (!urlPattern.test(image)) {
  //     toast.error('Please provide a valid image URL');
  //     return;
  //   }


  return (
    <>
      <Helmet>
        <title>
          BrillianceBay|Register
        </title>

      </Helmet>

      <div className="hero min-h-screen">
        <div className="hero-content mt-20 flex-col lg:flex-row-reverse">
          <div className="text-center h-[500px] lg:w-[500px] lg:text-left">
            <img className='w-full h-full object-cover' src="https://i.ibb.co/yBqJCHT/logo.png" alt="" />

          </div>
          <div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card flex-shrink-0 w-full border-2 border-primary max-w-sm shadow-2xl bg-base-100"
            >

              <div className='text-center flex justify-center mt-4'>
              <h1 className="font-bold">Register Here</h1>
              </div>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="input input-bordered"
                    {...register("name", { required: true })}
                  />
                  {errors.fullName && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image Url</span>
                  </label>
                  <input
                    type="text"
                    placeholder="image url"
                    className="input input-bordered"
                    {...register("image")}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password"  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                  })} placeholder="password" className="input input-bordered" />
                  {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                  {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                  {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                  {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6 p-0">
                  <button className="btn bg-primary text-white">Register</button>
                </div>
                <label className="label">
                  Have an account?{" "}
                  <Link to="/login" className="label-text-alt link link-hover">
                    Please Login
                  </Link>
                </label>
                <SocialLogin></SocialLogin>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;