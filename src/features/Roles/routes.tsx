import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const ROLE_PATHS = {
  ROLES: 'user/roles',
}

const RoleList = loadable(lazy(async () => await import('src/features/Roles/screen/RoleList')))

const RoleRoutes = [
  {
    path: ROLE_PATHS.ROLES,
    element: <RoleList />,
    permissions: PERMISSIONS.CALLS,
  },
]

export default RoleRoutes
