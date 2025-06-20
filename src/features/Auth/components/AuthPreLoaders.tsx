import { type ReactNode, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useAuth from 'src/features/Auth/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const AuthPreLoaders = ({ children }: any): ReactNode | null => {
  const { isAuthenticated, tryToSetNewLoginRedirect, session, isLoading, bootstrapped } = useAuth()
  const ignore = useRef(false)
  const navigate = useNavigate()



  useEffect(() => {
    if (ignore.current) return
    ignore.current = true

    if (!bootstrapped) return // ⏳ Esperar carga inicial

    if (!isLoading && !isAuthenticated && !session) {
      tryToSetNewLoginRedirect()
      navigate('/auth/login')
    }
  }, [bootstrapped, isAuthenticated, session, isLoading, navigate, tryToSetNewLoginRedirect])

  if (isLoading) {
    return null
  }

  return children
}

AuthPreLoaders.propTypes = {
  children: PropTypes.node,
}

export default AuthPreLoaders
