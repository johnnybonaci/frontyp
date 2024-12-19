import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const ROLE_PATHS = {
  LIST: 'roles',
}

const RoleList = loadable(lazy(async () => await import('src/features/Roles/screen/RoleList')))

const RoleRoutes = [
  {
    path: ROLE_PATHS.LIST,
    element: <RoleList />,
    permissions: PERMISSIONS.ROLES,
  },
]

export default RoleRoutes
