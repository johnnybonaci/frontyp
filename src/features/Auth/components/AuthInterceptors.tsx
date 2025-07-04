import { type ReactNode, type FC } from 'react'
import axios, { type AxiosError } from 'axios'
import useAuth from '../hooks/useAuth'
import { useCookies } from 'react-cookie'

interface AuthInterceptorsProps {
  children: ReactNode
}

const AuthInterceptors: FC<AuthInterceptorsProps> = ({ children }) => {
  const { logout, tryToSetNewLoginRedirect } = useAuth()
  const [cookies] = useCookies(['XSRF-TOKEN'])

  axios.defaults.withCredentials = true
  axios.defaults.withXSRFToken = true

  axios.interceptors.request.use(
    (config) => {
      // config.headers['X-CSRF-TOKEN'] = cookies['csrf-token']
      config.headers['X-XSRF-TOKEN'] = cookies['XSRF-TOKEN']

      return config
    },
    async (error) => {
      return await Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        tryToSetNewLoginRedirect()
        void logout(false)
      }

      return await Promise.reject(error)
    }
  )

  return <>{children}</>
}

export default AuthInterceptors
