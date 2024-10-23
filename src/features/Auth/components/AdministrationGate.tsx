import { type ReactNode } from 'react'
import PropTypes from 'prop-types'
import useAuth from 'src/features/Auth/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const AdministrationGate = ({ children }: any): ReactNode | null => {
  const { isAuthenticated, session, isLoading } = useAuth()
  const { user } = session ?? {}
  const navigate = useNavigate()

  if (isLoading || !isAuthenticated) {
    return null
  }

  if (!user?.isCMToolUser) {
    navigate('/auth/login')
  }

  return children
}

AdministrationGate.propTypes = {
  children: PropTypes.node,
}

export default AdministrationGate
