import PropTypes from 'prop-types'
import { useState } from 'react'
import DeleteModal from '../Modal/DeleteModal'
import { Link } from 'react-router-dom'

const ContentDataRow = ({ contest, handleDelete }) => {
  // for delete modal
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='image'
                src={contest?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          
        </div>
      </td>
     
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{contest?.contestName}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{contest?.status}</p>
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
          <span className='relative'>Delete</span>
        </button>
        {/* Delete modal */}
       
        {contest?.status === 'pending' && <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleDelete={handleDelete}
          id={contest?._id}
        />}
      </td>
      <td>
      
          {
            contest?.status === 'pending' ?
              <Link to={`/dashboard/updateContest/${contest?._id}`}>
              <button>Update</button>
            </Link> :
            <><button disabled={true}>Update</button></>
          }
          </td>
    </tr>
  )
}

ContentDataRow.propTypes = {
    contests: PropTypes.object,
  refetch: PropTypes.func,
}

export default ContentDataRow