import { useForm } from 'react-hook-form';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth/useAuth';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { logInUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    //   // navigation systems
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const onSubmit = (data) => {
        const { email, password } = data;

        // log in user
        logInUser(email, password)
            .then((result) => {
                console.log(result.user);
                if (!result || !result.user) {
                    Swal.fire({
                        title: 'Invalid email or password',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    });
                }

                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
    }


    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    }

    return (
        <>
            <Helmet>
                <title>BrillianceBay|Login</title>
            </Helmet>

            <div className="hero min-h-screen lg:mb-10">
                <div className="hero-content flex-col lg:flex-row">
                    {/* <div className="h-[600px] lg:w-[700px] lg:text-left rounded-xl p-6">
                        <img className='w-full h-full object-cover rounded-xl' src="" alt="" />
                    </div> */}

                    <div className="card border-2 border-primary flex-shrink-0 w-full shadow-2xl bg-base-100">
                        <div className='flex justify-center mt-4'>
                            <NavLink to="/">
                                <div className="flex items-center gap-1 w-24 h-24">
                                    <img className="w-full" src="https://i.ibb.co/yBqJCHT/logo.png" alt="" />
                                    
                                </div> 
                            </NavLink>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className='text-red-500'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" className="input input-bordered"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <span className='text-red-500'>This field is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
                            </div>

                        </form>
                       <div className='text-center'>
                       <p>

Need to sign up? <Link to="/register" className="label-text-alt link link-hover">Create an account</Link>

</p>
                       </div>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;