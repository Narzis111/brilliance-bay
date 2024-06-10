import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { imageUpload } from '../../image/utils'
import useAuth from '../../hooks/useAuth/useAuth'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Register = () => {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate()

  const {
    setLoading,
    createUser,
    googleLogin,
    updateUserProfile
  } = useAuth()
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const image = form.image.files[0]

    try {
      setLoading(true)
      // 1. Upload image and get image url
      const image_url = await imageUpload(image)
      console.log(image_url)
      //2. User Registration
      const result = await createUser(email, password)
      console.log(result)

      // 3. Save username and photo in firebase
      await updateUserProfile(name, image_url);
      navigate('/')
      toast.success('Signup Successful');

    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  // handle google signin
  const handleGoogleSignIn = async () => {
    try {
      await googleLogin()
      toast.success('Signup Successful');
      navigate('/')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
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
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to BrillianceBay</p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <LoadCanvasTemplate />
            </label>
            <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

          </div>

          <div>
          <div className="mt-6">
          <input disabled={disabled} className='bg-purple-500 w-full rounded-md py-3 text-white' type="submit" value="Sign Up" />
        </div>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
     
        <button
         
          onClick={handleGoogleSignIn}
          className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-Purple-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Register