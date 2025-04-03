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
import CPAReportRoutes from 'features/CPAReport/routes.tsx'
import RPCReportRoutes from 'features/RPCReport/routes.tsx'
import QAReportRoutes from 'features/QAReport/routes.tsx'
import LiveLeadsRoutes from 'features/LiveLeads/routes.tsx'
import ActiveLeadsRoutes from 'features/ActiveLeads/routes.tsx'
import PubLeadsRoutes from 'features/PubLeads/routes.tsx'
import SettingsRoutes from 'features/Settings/routes'
import ComplianceRoutes from 'features/Compliance/routes.tsx'
import ComplianceBotRoutes from 'features/ComplianceBot/routes.tsx'
import BusinessRouteMiddleware from 'components/BusinessRouteMiddleware'
import { type TrackDriveProviderIdType } from 'hooks/useFetchData.tsx'
import CallCampaignRoutes from 'features/CallCampaigns/routes'
import PhoneRoomPerformanceRoutes from 'features/PhoneRoomPerformance/routes.tsx'
import PhoneRoomLeadsRoutes from 'features/PhoneRoomLeads/routes.tsx'
import PhoneRoomReportsRoutes from 'features/PhoneRoomReports/routes.tsx'
import UserRoutes from 'features/Users/routes'
import RoleRoutes from 'features/Roles/routes'
import HistoryLeadsRoutes from 'features/HistoryLeads/routes'
import LeadReportRoutes from 'features/LeadReport/routes'

interface Route {
  path?: string
  element: ReactNode
  children?: Route[]
  orValidation?: boolean
  trackDriveProviderAllowed?: TrackDriveProviderIdType[]
  permissions?: PermissionsProps
}

// ==============================|| ROUTING RENDER ||============================== //
const AdministrationRoutes = {
  path: '/administration/',
  element: (
    <AuthPreLoaders>
      <PrivateLayout />
    </AuthPreLoaders>
  ),
  children: [DashboardRoutes, ...AuthPrivateRoutes],
}

const MainRoutes = {
  path: '/',
  element: (
    <AuthPreLoaders>
      <PrivateLayout />
    </AuthPreLoaders>
  ),
  children: [
    {
      index: true,
      element: <BaseDashboard />,
    },
    ...CallReportRoutes,
    ...CPAReportRoutes,
    ...RPCReportRoutes,
    ...QAReportRoutes,
    ...LiveLeadsRoutes,
    ...HistoryLeadsRoutes,
    ...LeadReportRoutes,
    ...ActiveLeadsRoutes,
    ...PubLeadsRoutes,
    ...SettingsRoutes,
    ...ComplianceRoutes,
    ...ComplianceBotRoutes,
    ...CallCampaignRoutes,
    ...PhoneRoomPerformanceRoutes,
    ...PhoneRoomLeadsRoutes,
    ...PhoneRoomReportsRoutes,
    ...UserRoutes,
    ...RoleRoutes,
  ],
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
      <BusinessRouteMiddleware trackDriveProviderAllowed={routes.trackDriveProviderAllowed}>
        <Gated
          forbiddenElement={<ErrorPage status={'403'} />}
          permissions={routes.permissions}
          orValidation={routes.orValidation}
        >
          {routes.element}
        </Gated>
      </BusinessRouteMiddleware>
    ),
    children: routes.children
      ? routes.children.map((childrenRoutes) => routesWithPermissions(childrenRoutes))
      : undefined,
  }
}

export default function Routes(): any {
  return useRoutes([
    routesWithPermissions(MainRoutes),
    routesWithPermissions(AdministrationRoutes),
    PublicRoutes,
    PrivateRoutesAuth,
    ...ErrorRoutes,
  ])
}
