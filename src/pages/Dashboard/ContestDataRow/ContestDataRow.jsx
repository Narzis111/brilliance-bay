import PropTypes from 'prop-types'
import { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import { FaUsers } from 'react-icons/fa'
import CommentModal from '../CommentModal/CommentModal'

const ContestDataRow = ({ contest, refetch, handleDeleteItem }) => {
  // const { user: loggedInUser } = useAuth()
  const axiosSecure = useAxiosSecure()

  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }


  const handleStatus = id => {
    axiosSecure.patch(`contests/accepted/${id}`)
      // api er moto routes dite hobe
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${contest.contestName} is verified/accepted Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }




  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{contest?.contestName}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='w-14 h-14'><img src={contest.image} alt="" /></div>

      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => handleDeleteItem(contest?._id)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Delete</span>
        </button>

      </td>

      <td>
        {contest.status === 'accepted' ? 'accepted' :
          <button
            onClick={() => handleStatus(contest?._id)}
            className="btn btn-xs bg-blue-200">
            <FaUsers className="text-purple-500 text-xl font-normal"></FaUsers>
          </button>}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Comment</span>
        </button>
        {/* modal */}

        <CommentModal
          isOpen={isOpen}
          closeModal={closeModal}
          refetch={refetch}
          contest={contest}
        />
      </td>
    </tr>
  )
}

ContestDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default ContestDataRow