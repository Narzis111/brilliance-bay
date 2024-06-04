import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../../hooks/useAuth/useAuth"
import useAxiosSecure from "../../../../hooks/useAxiosSecure"
import { Helmet } from "react-helmet-async"
import ContentDataRow from "../../../../components/ContentDataRow/ContentDataRow"
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner"
import Swal from "sweetalert2"

const MyCreatedContest = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    //   Fetch  Data
    const {
      data: contests = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['myCreated', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/myCreated/${user?.email}`)
  
        return data
      },
    })
  
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
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
        <Helmet>
          <title>My Created</title>
        </Helmet>
  
        <div className='container mx-auto px-4 sm:px-8'>
          <div className='py-8'>
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white font-bold border-b border-gray-200 text-gray-800  text-left text-sm uppercase'
                      >
                        Image
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                      >
                        Title
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                      >
                        Price
                      </th>
                     
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                      >
                        Delete
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                      >
                        Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Room row data */}
  
                    {contests.map(contest=> (
                      <ContentDataRow
                    key={contest._id}
                        
                        contest={contest}
                        handleDelete={handleDelete}
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

export default MyCreatedContest;