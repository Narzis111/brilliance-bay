import { useQuery } from '@tanstack/react-query'

import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { Link } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth/useAuth'

const MyParticipated = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      if (!user?.email) return [] // Return an empty array if user email is not available
      const res = await axiosSecure.get(`/bookings/${user?.email}`)
      return res.data
    },
    enabled: !!user?.email, // Enable query only if user email is available
  })

  return (
    <div>
      <h2 className="text-xl">Number of your participated Contest: {payments.length}</h2>
      <h4 className="text-3xl font-semibold">Your Upcoming Contests</h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Deadline</th>
              <th>Action</th>
              <th>Submission Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>
                  <div className="w-14 h-14">
                    <img src={payment.image} alt="" />
                  </div>
                </td>
                <td>{payment.contestName}</td>
                <td>{payment.contestDeadline}</td>
                <td>
                  {new Date(payment.contestDeadline) < new Date() || payment.review_status == 'Winner' || payment.review_status == 'Unsuccessful'
                  || payment.review_status == 'Pending' ? (
                    <button disabled={true} className="cursor-not-allowed bg-gray-200 p-2 rounded">
                      Submit Task
                    </button>
                  ) : (
                    <Link to={`/dashboard/my-submit/${payment._id}`}>
                      <button className="bg-purple-200 p-2 rounded">
                        Submit Task
                      </button>
                    </Link>
                  )}
                </td>
                <td>{payment.review_status ? payment.review_status : 'Yet to Submit'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyParticipated
