import { createContext } from 'react'
import { type AuthProviderType } from './AuthProvider.tsx'
import { DASHBOARD } from 'utils/constants.ts'

const AuthContext = createContext<AuthProviderType>({
  isAuthenticated: false,
  isLoading: false,
  checkPermissions: () => false,
  session: null,
  setIsAuthenticated: () => null,
  loginRedirect: DASHBOARD,
  tryToSetNewLoginRedirect: () => null,
  login: async () => await Promise.reject(new Error('not defined')),
  initSession: () => null,
  logout: async () => await Promise.reject(new Error('not defined')),
})

export default AuthContext
