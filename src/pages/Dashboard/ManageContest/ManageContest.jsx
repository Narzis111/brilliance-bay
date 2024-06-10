import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner'
import ContestDataRow from '../ContestDataRow/ContestDataRow'
import Swal from 'sweetalert2'


const ManageContest = () => {

  const axiosSecure = useAxiosSecure()
  //   Fetch Data
  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['contests'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/contests`)
      return data
    },
  })


  console.log(contests, contests.length)

  const handleDeleteItem = id => {
    Swal.fire({

      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/contests/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })
      }
    });
  }


  if (isLoading) return <LoadingSpinner />



  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <Helmet>
          <title>Manage Contests</title>
        </Helmet>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <h1>Total data:{contests.length} </h1>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Image
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete Action
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status Change
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Comment
                      
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contests.map(contest => (
                    <ContestDataRow
                      key={contest?._id}
                      id= {contest?._id}
                      contest={contest}
                      refetch={refetch}
                      handleDeleteItem={handleDeleteItem}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageContest;