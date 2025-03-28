import { type ReactNode, useEffect } from 'react'
import PropTypes from 'prop-types'
import useAuth from 'src/features/Auth/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const AdministrationGate = ({ children }: any): ReactNode | null => {
  const { isAuthenticated, session, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && isAuthenticated && !session?.user?.isCMToolUser) {
      console.log("🔁 Redirigiendo desde AdministrationGate")
      //navigate('/auth/login')
    }
  }, [isLoading, isAuthenticated, session, navigate])

  if (isLoading) {
    return null
  }

  return isAuthenticated && session?.user?.isCMToolUser ? children : null
}

AdministrationGate.propTypes = {
  children: PropTypes.node,
}

export default AdministrationGate
