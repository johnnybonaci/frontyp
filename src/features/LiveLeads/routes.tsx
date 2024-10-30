import { lazy } from 'react'
import loadable from 'components/Loadable'

export const LIVE_LEADS_PATHS = {
  LIST: '/administration/live-leads',
}

const relativePath = (path: 'LIST'): string =>
  LIVE_LEADS_PATHS[path].replace('/administration/', '')

// dashboard routing
const LiveLeadsList = loadable(
  lazy(async () => await import('src/features/LiveLeads/screen/LiveLeadsList'))
)

const LiveLeadsRoutes = [
  {
    path: relativePath('LIST'),
    element: <LiveLeadsList />,
    permissions: [],
  },
]

export default LiveLeadsRoutes
