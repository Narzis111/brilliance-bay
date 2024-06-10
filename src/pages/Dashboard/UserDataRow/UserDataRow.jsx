import PropTypes from 'prop-types'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure()
  const { mutateAsync } = useMutation({
    mutationFn: async role => {
      const { data } = await axiosSecure.patch(
        `/users/update/${user?.email}`,
        { role }
      )
      return data
    },
    onSuccess: data => {
      refetch()
      console.log(data)
      toast.success('User role updated successfully!')
    },
    onError: error => {
      console.error(error)
      toast.error(error.response?.data?.message || 'Failed to update user role')
    }
  })

  const handleDropdownSelect = async selected => {
    if (user.status !== 'Requested') {
      toast.error('Role can only be updated if status is "Requested".')
      return
    }

    const userRole = { role: selected,
      status: 'Verifi'
     }

    try {
      await mutateAsync(userRole)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <details className="dropdown">
          <summary className="m-1 btn">Update Role</summary>
          <ul className="p-2 shadow menu dropdown-content z-[10] bg-base-100 rounded-box w-52">
            <li>
              <a onClick={() => handleDropdownSelect('user')}>user</a>
            </li>
            <li>
              <a onClick={() => handleDropdownSelect('creator')}>creator</a>
            </li>
            <li>
              <a onClick={() => handleDropdownSelect('admin')}>admin</a>
            </li>
          </ul>
        </details>
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default UserDataRow
