import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const USER_PATHS = {
  LIST: 'users',
  ROLES: 'users/roles',
}

const UserList = loadable(lazy(async () => await import('src/features/Users/screen/UserList')))

const UserRoutes = [
  {
    path: USER_PATHS.LIST,
    element: <UserList />,
    permissions: PERMISSIONS.CALLS,
  },
]

export default UserRoutes
