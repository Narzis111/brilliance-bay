import PropTypes from 'prop-types'
import { Fragment } from 'react'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from '@headlessui/react'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const CommentModal = ({ closeModal, isOpen, contest, refetch }) => {
  const axiosSecure = useAxiosSecure()
  const { handleSubmit, register, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data)
    const commentItem = {
      comment: data.comment,

    }
    //
    const commentData = await axiosSecure.patch(`/contests/update/${contest._id}`, commentItem);
    console.log(commentData.data)
    if (commentData.data.modifiedCount>0) {
      // show success popup
      reset();
      refetch()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `added to the contest.`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  
  }


return (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as='div'
      className='relative z-10'
      onClose={() => closeModal(false)}
    >
      <TransitionChild
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='fixed inset-0 bg-black bg-opacity-25' />
      </TransitionChild>

      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center'>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <DialogPanel className='w-full h-72 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
              <DialogTitle
                as='h3'
                className='text-lg font-medium text-center leading-6 text-gray-900'
              >
                Enter your comment here
              </DialogTitle>
              <div className='w-full'>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                       {/* details */}
                       <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Comment*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Comment"
                            {...register('comment', { required: true })}
                            required
                            className="input input-bordered w-full mb-2" />
                    </div>

                    <button className="btn w-full">
                        Add comment
                    </button>
                  
                </form>
                <button
                 type='button'
                 className='mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                 onClick={() => closeModal(false)}
               >
                 Cancel
               </button>
            </div>
              </div>

             
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </Transition>
)
}

CommentModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default CommentModal
