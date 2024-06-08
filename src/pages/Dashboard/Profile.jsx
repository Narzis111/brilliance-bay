import { Helmet } from 'react-helmet-async'
import useAuth from '../../hooks/useAuth/useAuth'
import useRole from '../../hooks/useRole'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import ChartComponent from '../../components/ChartComponent/ChartComponent'


const Profile = () => {
  const {  updateUserProfile, user, setReload, loading } = useAuth() || {}
  const [role, isLoading] = useRole()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();


  useEffect(() => {
      if (user) {
          setValue('displayName', user.displayName || '');
          setValue('photoURL', user.photoURL || '');
      }
  }, [user, setReload, setValue]);


  const onSubmit = (data) => {
      const { displayName, photoURL } = data;


      updateUserProfile(displayName, photoURL)
          .then(() => {
              setReload(true),
                  toast.success('Profile updated successfully!');
          }).catch((error) => {
              console.error('Error updating profile:', error);
              toast.error('An error occurred Please try again.');
          });
  };


  console.log(user)
  if (isLoading || loading) return <LoadingSpinner />
  return (
    <>
      <div className='flex justify-between items-center h-screen'>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className='bg-white shadow-lg rounded-2xl w-full'>
        <img
          alt='profile'
          src='https://i.ibb.co/Zx6Y5PT/how-to-live-stream-contests-and-giveaways.jpg'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col  items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>


          <p className='p-2 uppercase px-4 font-bold text-Purple bg-Purple-500 rounded-full'>
            {role}
          </p>
          <p className='p-2 uppercase px-4 font-bold text-Purple bg-Purple-500 rounded-full'>
            {user?.email}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800 '>
            User Id: {user?.uid}
          </p>
          <div className="flex">
            <form onSubmit={handleSubmit(onSubmit)}
                            className="mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-[500px]">
                            <div className="mb-4">
                                <label className="block text-blue-600 text-sm font-bold mb-2">
                                    Display Name:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    {...register('displayName')}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-blue-600 text-sm font-bold mb-2">
                                    Photo URL:
                                </label>
                                <input
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.photoURL ? 'border-red-500' : ''
                                        }`}
                                    type="text"
                                    {...register('photoURL', {
                                        required: 'Photo URL is required',
                                        pattern: {
                                            value: /^(https?):\/\/.*\.(jpeg|jpg|gif|png|svg)$/i,
                                            message: 'Invalid URL',
                                        },
                                    })}
                                />
                                {errors.photoURL && (
                                    <p className="text-red-500 text-xs italic">{errors.photoURL.message}</p>
                                )}
                            </div>
                            <button type="submit" className='text-white flex w-full justify-center py-3 text-center items-center px-4 rounded-full bg-purple-500'>Update Profile</button>
                        </form>
          </div>
          
        </div>
      </div>
     
    </div>
    <h1 className='text-center text-2xl'>Your Participation Statistics</h1>
     <ChartComponent></ChartComponent>
    </>
  
  )
}


export default Profile

