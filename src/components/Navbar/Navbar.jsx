import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import { useEffect, useState } from "react";
import HostModal from "../HostModal/HostModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error));
      toast.success('Successfully logged out')
  }

  const [theme, setTheme] = useState('light')
   // for modal
   const [isModalOpen, setIsModalOpen] = useState(false)
   const closeModal = () => {
     setIsModalOpen(false)
   }
   const modalHandler = async () => {
     console.log('I want to be a Creator')
     try {

      const currentUser = {
        email: user?.email,
        role: 'user',
        status: 'Requested',
      }
      const { data } = await axiosSecure.put(`/user`, currentUser)
       console.log(data)
       if (data.modifiedCount > 0) {
         toast.success('Success! Please wait for admin confirmation')
       } else {
         toast.success('Please!, Have to wait till admin approved')
       }
     } catch (err) {
       console.log(err)
       toast.error(err.message)
     } finally {
       closeModal()
     }
   }

  // update state on toggle
  const handleToggle = e => {
    if (e.target.checked) {
      setTheme('synthwave')
    } else {
      setTheme('light')
    }
  }

  // set theme state in localStorage on mount & also update localStorage on state change
  useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme')

    // add custom data-theme attribute
    document.querySelector('html').setAttribute('data-theme', localTheme)
  }, [theme])

  const navOptions = <>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/all-contests">All Contests</Link></li>
    <li><Link to="/register">Register</Link></li>



  </>
  return (
    <>
      <div className="navbar max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {navOptions}
            </ul>
          </div>
          <NavLink to="/">
            <div className="flex items-center gap-1">
              <img className="w-[50px]" src="https://i.ibb.co/yBqJCHT/logo.png" alt="" />
              <h1 className="lg:text-xl text-xs text-blue-950 font-extrabold">
                <span className="text-2xl">B</span>
                <span>rilliance</span>
                <span className="text-2xl text-pretty text-blue-400">B</span>
                <span className="font-semibold text-pretty text-blue-400">ay</span>
              </h1>
            </div>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navOptions}
          </ul>
        </div>
        <div className="navbar-end">
          <label className="swap swap-rotate mr-5">

            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onChange={handleToggle} className="theme-controller" value="synthwave" />

            {/* sun icon */}
            <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

            {/* moon icon */}
            <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

          </label>
          <div className='hidden md:block'>
                  {(!user) &&  (
                  <button
                    disabled={!user}
                    onClick={() => setIsModalOpen(true)}
                    className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full transition'
                  >
                    Post your Contest
                  </button>
                  ) 
                  } 
                </div>
                {/* Modal */}
                <HostModal
                  isOpen={isModalOpen}
                  closeModal={closeModal}
                  modalHandler={modalHandler}
                />
          {user?.email ? (
            <div className='dropdown dropdown-end z-50'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'
              >
                <div title={user?.displayName} className='w-10 rounded-full'>
                  <img
                    className="w-10 rounded-full cursor-pointer"
                    src={user?.photoURL || `https://i.ibb.co/vQSpww7/user.png`}
                    alt="user"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
              >
                <ul>
                  <span>{user?.email}</span>
                  {

                    user && <li><Link to="/dashboard">Dashboard</Link></li>

                  }
                 

                    {/* user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li> */}

                  
                  {/* <Link to="/dashboard/cart">
                    <GiShoppingCart className="text-2xl"></GiShoppingCart>
                    <div className="badge badge-secondary">{cart.length}</div>

                  </Link> */}
                  
                  </ul>


                <button
                  onClick={() => handleLogOut()}
                  className="btn btn-sm text-white hover:text-black bg-red-600 ml-2"
                >
                  Log Out
                </button>
              </ul>


            </div>)
            : (
              <Link to="/login">
                <button className="btn font-normal btn-sm btn-ghost">Login</button>
              </Link>
            )}
        </div>
      </div>
    </>
  );
};

export default Navbar;