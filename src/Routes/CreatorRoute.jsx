import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'

const CreatorRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'creator') return children
  return <Navigate to='/dashboard' />
}

export default CreatorRoute;


CreatorRoute.propTypes = {
  children: PropTypes.element,
}

