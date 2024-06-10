import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { BsFillHouseAddFill, BsHouse } from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth/useAuth'
import { toast } from 'react-toastify'
import useRole from '../../../hooks/useRole'
import MenuItem from './Menu/MenuItem'
import CreatorMenu from './Menu/CreatorMenu'
import UserMenu from './Menu/UserMenu'
import AdminMenu from './Menu/AdminMenu'
import { AiOutlineBars } from "react-icons/ai";

const Sidebar = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate();
    const [isActive, setActive] = useState(false)
    const [role, isLoading] = useRole();
    console.log(role, isLoading);
    const handleLogOut = () => {
        logOut()
            .then((result) => {
                toast.success("successfully Logout");
                navigate('/')
                console.log(result.user);
            })
            .catch((err) => toast.error(err));
            
    };
    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }

    // const [toggle, setToggle] = useState(true)


    // const toggleHandler = event => {
    //     setToggle(event.target.checked)
    // }
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
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
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10  bg-rose-100 md:fixed flex flex-col justify-between overflow-x-hidden w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>

                    <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
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


                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>

                        {/* Conditional toggle button here.. */}
                        {/* {role === 'creator' && (
                            <ToggleBtn toggleHandler={toggleHandler} toggle={toggle} />
                        )} */}
                        <div>
                        <MenuItem
                            label='User Home'
                            address='/dashboard'
                            icon={BsFillHouseAddFill}
                        />
                        </div>
                        <div className="divider"></div>
                        <nav>


                            {/* Menu items */}
                            <MenuItem
                                label='Home'
                                address='/'
                                icon={BsHouse}
                            />
                            {role === 'user' && <UserMenu />}
                            {role === 'creator' && <CreatorMenu />}
                            {/* {role === 'creator' ? (
                                toggle ? (
                                    <CreatorMenu />
                                ) : (
                                    <UserMenu />
                                )
                            ) : undefined} */}
                            {role === 'admin' && <AdminMenu />}
                        </nav>


                    </div>
                </div>

                <div>
                
                    <div className="divider"></div>

                    {/* Profile Menu */}
                    <MenuItem
                        label='Profile'
                        address='/dashboard/profile'
                        icon={FcSettings}
                    />
                    <button
                        onClick={() => handleLogOut()}

                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar