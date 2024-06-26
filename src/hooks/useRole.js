import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import useAuth from './useAuth/useAuth'
const useRole = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: role = '', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`)
      console.log(data.role);
      return data.role

    },
  })

  //   Fetch user info using logged in user email

  return [role, isLoading]
}

export default useRole