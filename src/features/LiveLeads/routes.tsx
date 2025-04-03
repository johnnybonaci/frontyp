import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const LIVE_LEADS_PATHS = {
  LIST: '/live-leads',
}

// dashboard routing
const LiveLeadsList = loadable(
  lazy(async () => await import('src/features/LiveLeads/screen/LiveLeadsList'))
)

const LiveLeadsRoutes = [
  {
    path: LIVE_LEADS_PATHS.LIST,
    element: <LiveLeadsList />,
    permissions: PERMISSIONS.LEADS,
  },
]

export default LiveLeadsRoutes
