import { type ReactNode } from 'react'
import { useRoutes } from 'react-router-dom'
import { AuthPublicRoutes, AuthPrivateRoutes } from 'features/Auth/routes'
import AuthPreLoaders from 'features/Auth/components/AuthPreLoaders'
import DashboardRoutes from 'features/Dashboard/routes'
import ErrorRoutes from 'features/Errors/routes'
import PublicLayout from 'components/PublicLayout'
import PrivateLayout from 'components/PrivateLayout'
import Gated from 'components/Gated'
import { type PermissionsProps } from 'components/Gated/types'
import BaseDashboard from 'components/BaseDashboard'
import ErrorPage from './features/Errors'
import CallReportRoutes from 'features/CallReport/routes.tsx'

interface Route {
  path: string
  element: ReactNode
  children?: Route[]
  orValidation?: boolean
  permissions?: PermissionsProps
}

// ==============================|| ROUTING RENDER ||============================== //
const MainRoutes = {
  path: '/administration/',
  element: (
    <AuthPreLoaders>
      <PrivateLayout />
    </AuthPreLoaders>
  ),
  children: [DashboardRoutes, ...AuthPrivateRoutes, ...CallReportRoutes],
}

const BaseRoute = {
  path: '/',
  element: <BaseDashboard />,
}

const PrivateRoutesAuth = {
  path: '/auth',
  element: (
    <AuthPreLoaders>
      <PrivateLayout />
    </AuthPreLoaders>
  ),
  children: [...AuthPrivateRoutes],
}

const PublicRoutes = {
  path: '/auth',
  element: <PublicLayout />,
  children: AuthPublicRoutes,
}
const routesWithPermissions = (routes: Route): Route => {
  return {
    ...routes,
    element: (
      <Gated
        forbiddenElement={<ErrorPage status={'403'} />}
        permissions={routes.permissions}
        orValidation={routes.orValidation}
      >
        {routes.element}
      </Gated>
    ),
    children: routes.children
      ? routes.children.map((childrenRoutes) => routesWithPermissions(childrenRoutes))
      : undefined,
  }
}

export default function Routes(): any {
  return useRoutes([
    routesWithPermissions(MainRoutes),
    PublicRoutes,
    PrivateRoutesAuth,
    BaseRoute,
    ...ErrorRoutes,
  ])
}
