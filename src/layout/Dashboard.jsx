import { Outlet } from 'react-router-dom'
import Sidebar from '../pages/Dashboard/Sidebar/Sidebar'
import useAuth from '../hooks/useAuth/useAuth'

const Dashboard = () => {
  const {user} = useAuth();
  return (
    <div className='relative min-h-screen md:flex'>
     
      <Sidebar />
     
    

      {/* Outlet --> Dynamic content */}
      <div className='flex-1 md:ml-64'>
      <h2 className="text-3xl text-center">
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard